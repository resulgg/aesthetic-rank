import { NextRequest } from "next/server";
import { AI_PROMPT, UserPrompt } from "@/constants/ai-prompt";
import db from "@/db";
import { analysis } from "@/db/schema";
import { analysisDataSchema } from "@/schemas/openai-vision";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { and, eq } from "drizzle-orm";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Schema for validating incoming request body
const requestSchema = z.object({
  analysisId: z.string().uuid("Invalid analysis ID format"),
  userId: z.string().uuid("Invalid user ID format"),
});

/**
 * POST endpoint to generate AI analysis for user photos
 * @param request - The incoming request object
 * @returns Response with analysis ID or error message
 */
export const POST = verifySignatureAppRouter(async (request: NextRequest) => {
  try {
    // Validate request body
    const body = await request.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { analysisId, userId } = result.data;

    // Fetch analysis data with photos
    const analysisData = await db.query.analysis.findFirst({
      where: and(eq(analysis.id, analysisId), eq(analysis.userId, userId)),
      with: {
        photos: true,
      },
    });

    // Verify analysis exists and belongs to user
    if (!analysisData) {
      return Response.json({ error: "Analysis not found" }, { status: 404 });
    }

    // Validate analysis state
    if (analysisData.isCompleted) {
      return Response.json(
        { error: "Analysis has already been completed." },
        { status: 400 }
      );
    }

    if (!analysisData.isPaid) {
      return Response.json(
        { error: "Payment required to generate AI analysis." },
        { status: 402 }
      );
    }

    // Validate required user data
    if (!analysisData.height || !analysisData.weight || !analysisData.gender) {
      return Response.json(
        {
          error:
            "Missing required data. Please provide height, weight and gender.",
        },
        { status: 400 }
      );
    }

    const photos = analysisData.photos;

    // Validate photos
    if (!photos || photos.length < 1) {
      return Response.json(
        { error: "Please upload at least 1 photo for analysis." },
        { status: 400 }
      );
    }

    // Prepare photo URLs for OpenAI
    const photoUrls = photos.map((photo) => ({
      type: "image_url" as const,
      image_url: {
        url: `https://${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${photo.image}`,
      },
    }));

    // Generate AI analysis
    const response = await openai.beta.chat.completions.parse({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [{ type: "text", text: AI_PROMPT }],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: UserPrompt(
                analysisData.height,
                analysisData.weight,
                analysisData.gender
              ),
            },
            ...photoUrls,
          ],
        },
      ],
      response_format: zodResponseFormat(analysisDataSchema, "analysisData"),
    });

    const data = response.choices[0].message.parsed;

    // Update analysis with results
    if (data) {
      await db
        .update(analysis)
        .set({
          isNsfw: data.isNsfw.isNsfw,
          isCompleted: true,
          analysisData: data,
        })
        .where(and(eq(analysis.id, analysisId), eq(analysis.userId, userId)));
      return Response.json({ id: analysisId }, { status: 200 });
    }

    return Response.json(
      { error: "Failed to generate analysis" },
      { status: 500 }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      {
        error:
          "The system is currently experiencing high load. Please try again in a few minutes.",
      },
      { status: 500 }
    );
  }
});
