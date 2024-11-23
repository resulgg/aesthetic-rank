"use client";

import { useTransition } from "react";
import { createAnalysis } from "@/actions/analysis";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const CreateAnalysisButton = ({
  children,
  userId,
  className,
}: {
  children: React.ReactNode;
  userId: string;
  className?: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleCreateAnalysis = async () => {
    try {
      startTransition(async () => {
        const result = await createAnalysis(userId);

        if (result?.error) {
          toast.error(result.error);
          return;
        }
      });
    } catch (error) {
      console.error("Failed to create analysis:", error);
      toast.error("An error occurred while creating the analysis");
    }
  };

  return (
    <form action={handleCreateAnalysis}>
      <Button
        variant="default"
        className={cn(
          "flex items-center gap-2 text-sm h-10 md:h-12 md:text-base",
          className
        )}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Plus className="w-5 h-5" />
        )}
        {isPending ? "Creating..." : children}
      </Button>
    </form>
  );
};

export default CreateAnalysisButton;
