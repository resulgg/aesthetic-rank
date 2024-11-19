"use server";

import crypto from "crypto";
import { auth } from "@/auth";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
  MIN_FILE_SIZE,
} from "@/constants/photo";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";

// Enhanced file validation schema
const fileSchema = z.object({
  type: z
    .string()
    .trim()
    .toLowerCase()
    .refine((type) => ALLOWED_FILE_TYPES.includes(type), {
      message: "Only JPEG, JPG, PNG and WebP images are allowed.",
    }),
  size: z
    .number()
    .int()
    .positive()
    .min(MIN_FILE_SIZE, {
      message: `File size must be at least ${MIN_FILE_SIZE / 1024}KB`,
    })
    .max(MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    }),
});

type FileType = z.infer<typeof fileSchema>;

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
 * Generates a presigned URL for file upload to R2 storage
 * @param data File metadata including type and size
 * @returns Presigned URL and file key or error message
 */
export const getPresignedUrl = async (data: FileType) => {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Authentication required." };
    }

    // Validate file data
    const fileValidation = fileSchema.safeParse(data);

    if (!fileValidation.success) {
      return {
        error: `Invalid file type or size. Accepted file types: ${ALLOWED_FILE_TYPES.map((type) => type.split("/")[1].toUpperCase()).join(", ")}. Size limits: ${MIN_FILE_SIZE / 1024}KB - ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
      };
    }

    const { type, size } = fileValidation.data;
    const fileExtension = type.split("/")[1];

    if (!fileExtension) {
      return { error: "Invalid file type format." };
    }
    const key = `${crypto.randomUUID()}.${fileExtension}`;
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      ContentType: type,
      ContentLength: size,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 180 });
    if (!signedUrl) {
      return { error: "Failed to generate presigned URL" };
    }

    return { signedUrl, key };
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return { error: "Failed to get presigned url." };
  }
};
