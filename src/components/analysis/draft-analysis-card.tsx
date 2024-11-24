import Link from "next/link";
import { SelectAnalysisAndPhotos } from "@/types/analysis";
import { FileEdit, Trash2 } from "lucide-react";
import DeleteAnalysis from "@/components/analysis/delete-analysis";
import { TypographyH4 } from "@/components/typography/typography-h4";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DraftAnalysisCardProps {
  draft: SelectAnalysisAndPhotos;
}

export function DraftAnalysisCard({ draft }: DraftAnalysisCardProps) {
  const getNextStep = () => {
    if (!draft.height || !draft.weight || !draft.gender) {
      return `/analysis/${draft.id}/info`;
    }
    if (!draft.photos?.length) {
      return `/analysis/${draft.id}/photos`;
    }
    if (!draft.isPaid) {
      return `/analysis/${draft.id}/payment`;
    }
    return `/analysis/${draft.id}/result`;
  };

  const getStatusMessage = () => {
    if (!draft.height || !draft.weight || !draft.gender) {
      return "Basic information needs to be filled";
    }
    if (!draft.photos?.length) {
      return "Photos need to be uploaded";
    }
    if (!draft.isPaid) {
      return "Payment required";
    }
    return "Your analysis is being generated";
  };

  return (
    <Card className="group border-dashed relative">
      {!draft.isPaid && !draft.isCompleted && (
        <div className="absolute top-4 right-4 z-10">
          <DeleteAnalysis
            analysisId={draft.id}
            className="rounded-full px-5 py-1"
          >
            <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
          </DeleteAnalysis>
        </div>
      )}
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-4 mt-4">
          <div className="h-32 w-32 bg-secondary/20 rounded-full flex items-center justify-center">
            <FileEdit className="w-16 h-16 text-muted-foreground/40" />
          </div>
          <TypographyH4>Incomplete Analysis</TypographyH4>
          <p className="text-sm text-muted-foreground text-center">
            {getStatusMessage()}
          </p>
          <div className="flex flex-col w-full gap-2">
            {draft.isPaid && !draft.isCompleted ? (
              <Link href={`/analysis/${draft.id}/status`}>
                <Button variant="default" className="w-full">
                  View Status
                </Button>
              </Link>
            ) : (
              <>
                <Link href={getNextStep()}>
                  <Button variant="default" className="w-full">
                    Continue Setup
                  </Button>
                </Link>
                <Link href={`/analysis/${draft.id}/info`}>
                  <Button variant="outline" className="w-full">
                    Start Over
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
