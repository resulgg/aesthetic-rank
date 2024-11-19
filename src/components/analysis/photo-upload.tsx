"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getPresignedUrl } from "@/actions/file-upload";
import { savePhotos } from "@/actions/photos";
import { MAX_FILE_SIZE, MAX_PHOTOS } from "@/constants/photo";
import { Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  analysisId: string;
  currentPhotoCount: number;
  remainingPhotos: number;
}

export default function PhotoUpload({
  analysisId,
  currentPhotoCount,
  remainingPhotos,
}: PhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const router = useRouter();
  const uploadFile = async (file: File) => {
    try {
      if (!file) {
        throw new Error("No file provided");
      }

      // Get presigned URL
      const response = await getPresignedUrl({
        type: file.type,
        size: file.size,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.signedUrl || !response.key) {
        throw new Error("Unable to prepare upload: Missing signed URL or key");
      }

      const uploadResponse = await fetch(response.signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
      }

      // Save photo record
      const result = await savePhotos({
        image: response.key,
        analysisId: analysisId,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("Photo uploaded successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
      console.error("Upload error:", error);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (!acceptedFiles?.length) {
      return;
    }

    if (acceptedFiles.length > remainingPhotos) {
      toast.error(
        remainingPhotos === 0
          ? `Maximum number of photos (${MAX_PHOTOS}) already uploaded`
          : `Only ${remainingPhotos} more photo${
              remainingPhotos === 1 ? "" : "s"
            } allowed`
      );
      return;
    }

    setIsUploading(true);
    try {
      for (const file of acceptedFiles) {
        await uploadFile(file);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to process files";
      toast.error(errorMessage);
      console.error("Drop error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: MAX_FILE_SIZE,
    disabled: isUploading || isRouting,
    multiple: true,
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "File upload error";
      toast.error(errorMessage);
      console.error("Dropzone error:", error);
    },
  });

  const handleContinue = () => {
    setIsRouting(true);
    router.push(`/analysis/${analysisId}/review`);
  };

  // Calculate progress based on current photo count
  const progressValue = Math.min((currentPhotoCount / MAX_PHOTOS) * 100, 100);

  return (
    <div
      className="w-full mx-auto space-y-8"
      role="region"
      aria-label="Photo upload section"
    >
      <div className="space-y-2">
        <div
          className="flex flex-row justify-between gap-2 sm:gap-0 text-xs md:text-sm text-center sm:text-left"
          aria-live="polite"
        >
          <span>
            Photos uploaded: {currentPhotoCount}/{MAX_PHOTOS}
          </span>
          <span>
            {remainingPhotos === 0
              ? "Maximum photos reached"
              : `${remainingPhotos} photo${remainingPhotos === 1 ? "" : "s"} remaining`}
          </span>
        </div>
        <Progress
          value={progressValue}
          className="h-2"
          aria-label={`Upload progress: ${progressValue}%`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressValue}
        />
      </div>

      {remainingPhotos > 0 ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed border-foreground/20 rounded-lg p-8 text-center transition-colors",
            (isUploading || isRouting) && "opacity-50 cursor-not-allowed",
            !isUploading &&
              !isRouting &&
              isDragActive &&
              "border-primary bg-secondary",
            !isUploading &&
              !isRouting &&
              !isDragActive &&
              "hover:border-primary cursor-pointer"
          )}
          role="button"
          tabIndex={0}
          aria-label={`Upload photos. ${remainingPhotos} slots remaining. Maximum file size ${MAX_FILE_SIZE / (1024 * 1024)}MB`}
          aria-disabled={isUploading || isRouting}
        >
          <input {...getInputProps()} aria-label="File input" />
          <div className="flex flex-col items-center" aria-live="polite">
            {isUploading ? (
              <>
                <Loader2
                  className="h-6 w-6 animate-spin text-primary"
                  aria-hidden="true"
                />
                <p className="text-foreground" role="status">
                  Uploading...
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-foreground md:hidden">
                  Tap to select photos
                </p>
                <p className="text-foreground hidden md:block">
                  Drag &apos;n&apos; drop photos here, or click to select
                </p>
              </div>
            )}
            <p className="text-sm text-foreground mt-2">
              {currentPhotoCount === 0
                ? `Maximum ${MAX_PHOTOS} photos allowed`
                : `${currentPhotoCount} photo${
                    currentPhotoCount === 1 ? "" : "s"
                  } uploaded, ${remainingPhotos} photo${
                    remainingPhotos === 1 ? "" : "s"
                  } remaining`}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-muted p-8 rounded-lg text-center" role="alert">
          <p className="text-foreground">
            Maximum number of photos ({MAX_PHOTOS}) already uploaded
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Delete existing photos to upload new ones
          </p>
        </div>
      )}

      <Button
        className="w-full"
        onClick={handleContinue}
        disabled={isRouting || currentPhotoCount === 0}
      >
        {isRouting ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
          </div>
        ) : (
          "Continue"
        )}
      </Button>
    </div>
  );
}
