"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { MAX_PHOTOS } from "@/constants/photo";
import db from "@/db";
import { analysis, photos } from "@/db/schema";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import s3Client from "@/lib/s3-client";

const photoSchema = z.object({
  image: z.string().min(1),
  analysisId: z.string().uuid(),
});

const deletePhotoSchema = z.object({
  photoId: z.string().uuid(),
});

type CreatePhotoInput = z.infer<typeof photoSchema>;

/**
 * Creates a new photo record for an authenticated user
 * @param input Object containing image key and analysis ID
 * @returns Object containing success status or error message
 */
export const savePhotos = async (input: CreatePhotoInput) => {
  try {
    // Authenticate user
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Authentication required." };
    }

    // Validate input
    const validationResult = photoSchema.safeParse(input);

    if (!validationResult.success) {
      return {
        error: "Invalid image key or analysis ID.",
      };
    }

    const userId = session.user.id;

    // Verify analysis belongs to user
    const analysisRecord = await db.query.analysis.findFirst({
      where: and(
        eq(analysis.id, input.analysisId),
        eq(analysis.userId, userId)
      ),
    });

    if (!analysisRecord) {
      return { error: "Analysis not found or unauthorized." };
    }

    // Check current photo count
    const photoCount = await db.query.photos.findMany({
      where: eq(photos.analysisId, input.analysisId),
    });

    if (photoCount.length >= MAX_PHOTOS) {
      return { error: "Maximum number of photos (5) already uploaded." };
    }

    // Check for duplicate image upload
    const existingPhoto = await db.query.photos.findFirst({
      where: and(
        eq(photos.image, input.image),
        eq(photos.analysisId, input.analysisId)
      ),
    });

    if (existingPhoto) {
      return { error: "Photo already exists." };
    }

    // Insert photo with validated data
    const data = {
      userId,
      image: input.image,
      analysisId: input.analysisId,
    };

    await db.insert(photos).values(data);
    revalidatePath(`/analysis/${input.analysisId}/photos`);
    return { success: true };
  } catch (error) {
    console.error("Failed to create photo:", error);
    return { error: "Failed to create photo." };
  }
};

/**
 * Deletes a photo from storage and database
 */
export async function deletePhoto(photoId: string) {
  try {
    // Validate input
    const validationResult = deletePhotoSchema.safeParse({ photoId });
    if (!validationResult.success) {
      return { error: "Invalid photo ID" };
    }

    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Authentication required." };
    }

    // Fetch photo to get the image key
    const photo = await db.query.photos.findFirst({
      where: and(eq(photos.id, photoId), eq(photos.userId, session.user.id)),
    });

    if (!photo) {
      return { error: "Photo not found." };
    }

    // Delete from R2 storage

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: photo.image,
      })
    );

    // Delete from database
    await db
      .delete(photos)
      .where(and(eq(photos.id, photoId), eq(photos.userId, session.user.id)));

    revalidatePath(`/analysis/${photo.analysisId}/photos`);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete photo:", error);
    return { error: "Failed to delete photo." };
  }
}
