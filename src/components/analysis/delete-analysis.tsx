"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteAnalysis } from "@/actions/analysis";
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

const DeleteAnalysis = ({ analysisId }: { analysisId: string }) => {
  const [isPending, startTransition] = useTransition();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const router = useRouter();

  const handleDeleteAnalysis = async () => {
    try {
      startTransition(async () => {
        const result = await deleteAnalysis(analysisId);

        if (result.error) {
          toast.error(result.error);
          return;
        }

        toast.success("Analysis deleted successfully");
        router.push("/analysis/new");
      });
    } catch (error) {
      console.error("Failed to delete analysis:", error);
      toast.error("An error occurred while deleting the analysis");
    }
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={() => setShowConfirmDialog(true)}
        className="w-full"
        variant="destructiveGhost"
        aria-label="Delete analysis"
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              analysis and all associated photos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAnalysis}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteAnalysis;
