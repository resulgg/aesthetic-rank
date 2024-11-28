import "server-only";
import db from "@/db";
import { analysis, PhotoType } from "@/db/schema";
import { eq } from "drizzle-orm";
import redis from "@/lib/redis-client";

export const getAestheticRankByAnalysisId = async (analysisId: string) => {
  try {
    // Get total member count and rank
    const [totalMembers, analysisRank] = await Promise.all([
      redis.zcard("aesthetic_rank"),
      redis.zrevrank("aesthetic_rank", `analysis:${analysisId}`),
    ]);

    return {
      rank: analysisRank !== null ? analysisRank + 1 : null, // Add 1 since rank is 0-based
      totalMembers,
    };
  } catch (error) {
    console.error(error);
    return {
      rank: null,
      totalMembers: null,
    };
  }
};

type AnalysisWithScore = {
  id: string;
  name: string | null;
  score: number;
  gender: "male" | "female" | null;
  height: string | null;
  weight: string | null;
  isPublic: boolean | null;
  isNsfw: boolean | null;
  photos: PhotoType[];
};
// Redis ZRANGE with withScores returns an array of alternating member and score values
type RedisZRangeResponse = Array<string | number>;

const CACHE_KEY = "top_100_aesthetic_cache";
const CACHE_TTL = 1200; // 20 minutes in seconds

export const getTop100Aesthetic = async (): Promise<{
  data: AnalysisWithScore[];
  cacheExpiresAt: number | null;
  totalMembers: number;
}> => {
  try {
    // Try to get cached data first
    const [cachedData, ttl, totalMembers] = await Promise.all([
      redis.get(CACHE_KEY) as Promise<AnalysisWithScore[] | null>,
      redis.ttl(CACHE_KEY),
      redis.zcard("aesthetic_rank"),
    ]);

    if (cachedData) {
      return {
        data: cachedData,
        cacheExpiresAt: ttl > 0 ? Date.now() + ttl * 1000 : null,
        totalMembers,
      };
    }

    // If no cache, fetch fresh data
    const topAnalysesWithScores = (await redis.zrange("aesthetic_rank", 0, 99, {
      withScores: true,
      rev: true,
    })) as RedisZRangeResponse;

    // Transform Redis response into more usable format
    const formattedScores: { id: string; score: number }[] = [];
    for (let i = 0; i < topAnalysesWithScores.length; i += 2) {
      const member = topAnalysesWithScores[i] as string;
      const score = topAnalysesWithScores[i + 1] as number;
      const id = member.replace("analysis:", "");
      formattedScores.push({ id, score });
    }

    // Fetch analysis records from database
    const analysisRecords = await Promise.all(
      formattedScores.map(({ id }) =>
        db.query.analysis.findFirst({
          where: eq(analysis.id, id),
          columns: {
            id: true,
            name: true,
            gender: true,
            height: true,
            isNsfw: true,
            isPublic: true,
            weight: true,
          },
          with: {
            photos: true,
          },
        })
      )
    );

    // Combine database records with scores and filter out nulls
    const results = analysisRecords
      .map((record, index) => {
        if (!record) return null;
        return {
          id: record.id,
          name: record.name,
          gender: record.gender,
          height: record.height,
          weight: record.weight,
          isPublic: record.isPublic,
          isNsfw: record.isNsfw,
          score: formattedScores[index].score,
          photos: record.photos,
        };
      })
      .filter((record): record is AnalysisWithScore => record !== null);

    // Cache the results
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(results));

    return {
      data: results,
      cacheExpiresAt: Date.now() + CACHE_TTL * 1000,
      totalMembers,
    };
  } catch (error) {
    console.error("Error fetching top 100 aesthetic ranks:", error);
    throw new Error("Failed to fetch top aesthetic ranks");
  }
};
