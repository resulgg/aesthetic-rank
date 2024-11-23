import "server-only";
import db from "@/db";
import { analysis, photos } from "@/db/schema";
import { and, eq } from "drizzle-orm";

/**
 * Retrieves all analysis records for a given user ID
 * @param userId - The unique identifier of the user
 * @returns Promise containing an array of analysis records
 */
export const getAllAnalysisByUserId = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required.");
  }
  try {
    const userAnalysis = await db.query.analysis.findMany({
      where: eq(analysis.userId, userId),
      orderBy: (analysis, { desc }) => [desc(analysis.createdAt)],
      with: {
        photos: true,
      },
    });

    return userAnalysis;
  } catch (error) {
    console.error("Error fetching analysis:", error);
    throw new Error("Failed to fetch analysis records.");
  }
};

/**
 * Retrieves a single analysis record by its ID and validates user ownership
 * @param id - The unique identifier of the analysis record
 * @param userId - The ID of the user requesting the analysis
 * @returns Promise containing the analysis record if found and owned by user
 * @throws Error if analysis is not found, not owned by user, or on database error
 */
export const getAnalysisReviewById = async (id: string, userId: string) => {
  if (!id || !userId) {
    throw new Error("Analysis ID and User ID are required.");
  }

  try {
    const analysisRecord = await db.query.analysis.findFirst({
      where: and(eq(analysis.id, id), eq(analysis.userId, userId)),
      columns: {
        height: true,
        weight: true,
        gender: true,
        id: true,
        isCompleted: true,
      },
      with: {
        photos: true,
      },
    });

    return analysisRecord;
  } catch (error) {
    console.error("Error fetching analysis:", error);
    throw new Error("Failed to fetch analysis record.");
  }
};
/**
 * Fetches photos associated with a specific analysis
 * @param analysisId - The unique identifier of the analysis
 * @param userId - The ID of the user requesting the photos
 * @returns Promise containing the photos array
 * @throws Error if validation fails, analysis not found, or database error occurs
 */
export async function getAnalysisPhotos(analysisId: string, userId: string) {
  // Input validation
  if (!analysisId || !userId) {
    throw new Error("Analysis ID and User ID are required.");
  }

  try {
    // Verify analysis belongs to user first using a type-safe query
    await db.query.analysis.findFirst({
      where: and(eq(analysis.id, analysisId), eq(analysis.userId, userId)),
    });

    // Fetch photos with proper ordering
    const photosList = await db.query.photos.findMany({
      where: and(eq(photos.analysisId, analysisId), eq(photos.userId, userId)),
      orderBy: (photos, { desc }) => [desc(photos.createdAt)],
    });

    return photosList;
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    throw new Error("Uploaded analysis photos failed to load.");
  }
}

export const checkAnalysisStatus = async (
  analysisId: string,
  userId: string
) => {
  try {
    const analysisStatus = await db.query.analysis.findFirst({
      where: and(eq(analysis.id, analysisId), eq(analysis.userId, userId)),
      columns: {
        isCompleted: true,
      },
    });

    return analysisStatus?.isCompleted;
  } catch (error) {
    console.error("Error checking analysis status:", error);
    throw new Error("Failed to check analysis status.");
  }
};

export const getAnalysisInfo = async (analysisId: string, userId: string) => {
  try {
    const analysisInfo = await db.query.analysis.findFirst({
      where: and(eq(analysis.id, analysisId), eq(analysis.userId, userId)),
      columns: {
        height: true,
        weight: true,
        gender: true,
        isCompleted: true,
      },
    });

    return analysisInfo;
  } catch (error) {
    console.error("Error fetching analysis info:", error);
    throw new Error("Failed to fetch analysis info.");
  }
};
