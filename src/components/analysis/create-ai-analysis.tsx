"use client";

import { useTransition } from "react";
import { createAiAnalysis } from "@/actions/ai-analysis";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface CreateAiAnalysisProps {
  analysisId: string;
}

const CreateAiAnalysis = ({ analysisId }: CreateAiAnalysisProps) => {
  const [isPending, startTransition] = useTransition();
  //   const router = useRouter();

  const handleCreateAnalysis = () => {
    try {
      startTransition(async () => {
        const result = await createAiAnalysis(analysisId);

        if (result.error) {
          toast.error(result.error);
          return;
        }

        toast.success("AI Analysis created successfully");
        console.log(result);
        // Assuming you want to redirect to a results page
        // router.push(`/analysis/${analysisId}/results`);
      });
    } catch (error) {
      console.error("Failed to create AI analysis:", error);
      toast.error("An error occurred while creating the AI analysis");
    }
  };

  return (
    <Button
      onClick={handleCreateAnalysis}
      disabled={isPending}
      className="w-full"
      aria-label="Create AI Analysis"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        "Create Analysis"
      )}
    </Button>
  );
};

export default CreateAiAnalysis;
