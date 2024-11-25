"use client";

import { useState } from "react";
import Image from "next/image";
import { deletePhoto } from "@/actions/photos";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface UploadedPhotosProps {
  photos: {
    id: string;
    image: string;
    createdAt: Date;
  }[];
}

export function UploadedPhotos({ photos }: UploadedPhotosProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);

  const handleDeletePhoto = async (photoId: string) => {
    setIsDeleting(true);
    try {
      const result = await deletePhoto(photoId);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Photo deleted successfully");
    } catch (error) {
      console.error("Failed to delete photo:", error);
      toast.error("Failed to delete photo");
    } finally {
      setIsDeleting(false);
      setPhotoToDelete(null);
    }
  };

  if (photos.length === 0) {
    return (
      <div
        className="text-center py-8 text-muted-foreground"
        role="status"
        aria-label="No photos status"
      >
        <p>No photos uploaded yet</p>
        <p>Upload some photos to get started</p>
      </div>
    );
  }

  return (
    <div
      className="space-y-4"
      role="region"
      aria-label="Uploaded photos gallery"
    >
      <div className="relative">
        <div
          className="grid grid-cols-3 md:grid-cols-4 gap-4"
          role="list"
          aria-label="Photo grid"
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative h-[200px] md:h-[300px] w-full"
              role="listitem"
            >
              <Image
                src={`https://${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${photo.image}`}
                alt={`Uploaded photo from ${photo.createdAt.toLocaleDateString()}`}
                fill
                className={"object-cover rounded-lg"}
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-lg"
                onClick={() => setPhotoToDelete(photo.id)}
                disabled={isDeleting}
                aria-label="Delete photo"
              >
                <X className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
              </Button>
            </div>
          ))}
        </div>
        {isDeleting && (
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center"
            role="status"
            aria-label="Deleting photo"
          >
            <Loader2
              className="h-8 w-8 animate-spin text-primary"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      <AlertDialog
        open={!!photoToDelete}
        onOpenChange={() => setPhotoToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Photo</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this photo? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => photoToDelete && handleDeletePhoto(photoToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
