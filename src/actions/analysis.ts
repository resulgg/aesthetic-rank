"use server";

import { auth } from "@/auth";
import db from "@/db";
import { analysis, photos } from "@/db/schema";
import { analysisFormSchema } from "@/schemas/analysis";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

type CreateAnalysisInput = z.infer<typeof analysisFormSchema> & {
  analysisId: string;
};

// Initialize S3 client with R2 configuration
const s3Client = new S3Client({
  region: process.env.R2_REGION!,
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});
/**
 * Creates a new analysis record for an authenticated user
 * @param input Analysis data including height, weight and gender
 * @returns Object containing either the created analysis ID or an error
 */
export const updateInfo = async (input: CreateAnalysisInput) => {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Authentication required." };
    }

    // Validate input using the schema
    const validationResult = analysisFormSchema.safeParse(input);

    if (!validationResult.success) {
      return {
        error: "Invalid height, weight or gender.",
      };
    }
    console.log("server action updateInfo", input);
    // Create analysis record with validated data
    await db
      .update(analysis)
      .set({
        height: validationResult.data.height,
        weight: validationResult.data.weight,
        gender: validationResult.data.gender,
      })
      .where(
        and(
          eq(analysis.id, input.analysisId),
          eq(analysis.userId, session.user.id)
        )
      );

    return { message: "Analysis info updated successfully." };
  } catch (error) {
    console.error("Failed to update analysis info:", error);
    // Don't expose internal error details to client
    return { error: "Failed to update analysis info." };
  }
};

/**
 * Deletes an analysis and all associated photos
 * @param analysisId The ID of the analysis to delete
 * @returns Object indicating success or containing an error message
 */
export const deleteAnalysis = async (analysisId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Authentication required." };
    }

    // Check if analysis exists and belongs to user
    const existingAnalysis = await db.query.analysis.findFirst({
      where: and(
        eq(analysis.id, analysisId),
        eq(analysis.userId, session.user.id)
      ),
    });

    if (!existingAnalysis) {
      return { error: "Analysis not found." };
    }

    // Get all photos for this analysis
    const analysisPhotos = await db
      .select()
      .from(photos)
      .where(
        and(
          eq(photos.analysisId, analysisId),
          eq(photos.userId, session.user.id)
        )
      );
    if (analysisPhotos.length > 0) {
      for (const photo of analysisPhotos) {
        try {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.R2_BUCKET_NAME,
              Key: photo.image,
            })
          );
        } catch (error) {
          console.error(
            `Failed to delete photo ${photo.image} from R2:`,
            error
          );
        }
      }
    }
    if (analysisPhotos.length > 0) {
      // Delete photos from database
      await db
        .delete(photos)
        .where(
          and(
            eq(photos.analysisId, analysisId),
            eq(photos.userId, session.user.id)
          )
        );
    }
    // Delete analysis
    await db
      .delete(analysis)
      .where(
        and(eq(analysis.id, analysisId), eq(analysis.userId, session.user.id))
      );
    return { success: true };
  } catch (error) {
    console.error("Failed to delete analysis:", error);
    return { error: "Failed to delete analysis." };
  }
};
