import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAnalysisReviewById, isAnalysisOwner } from "@/data/analyze";
import { EyeOff } from "lucide-react";
import AnalysisReview from "@/components/analysis/analysis-review";
import DeleteAnalysisButton from "@/components/analysis/delete-analysis";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PhotosPageProps {
  params: Promise<{ id: string }>;
}

export default async function PhotosPage({ params }: PhotosPageProps) {
  const session = await auth();
  const analysisId = (await params).id;

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  if (!analysisId) {
    notFound();
  }
  const isOwner = await isAnalysisOwner(analysisId, session.user.id);
  if (!isOwner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[30vh] max-w-4xl mx-auto space-y-4 text-center">
        <div className="flex justify-center mb-6">
          <EyeOff className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Analysis Not Available</h1>
        <p className="text-muted-foreground">
          This analysis is private and cannot be viewed publicly. The owner
          needs to make it public before it can be accessed. You can check by
          clicking the button below.
        </p>
        <Button variant="default" asChild>
          <Link href={`/analysis/public/${analysisId}`}>View public page</Link>
        </Button>
      </div>
    );
  }
  // Get uploaded photos
  const analysis = await getAnalysisReviewById(analysisId, session.user.id);
  const hasPhotos = analysis && analysis.photos.length > 0;
  if (!hasPhotos) {
    redirect(`/analysis/${analysisId}/photos`);
  }
  if (analysis.isCompleted) {
    redirect(`/analysis/${analysisId}`);
  }

  return (
    <div className=" max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <TypographyH1 className="text-center">
          Step 3: Final Review 🔍
        </TypographyH1>
        <TypographyP className="text-muted-foreground text-center">
          Confirm your details and photos to take your place in the aesthetic
          ranking
        </TypographyP>
      </div>
      <Card className="p-5 space-y-4">
        <AnalysisReview analysis={analysis} />
        <div className="flex flex-col gap-4">
          {analysis && (
            <>
              <Button variant="default" className="w-full" asChild>
                <Link href={`/analysis/${analysisId}/payment`}>Confirm</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/analysis/${analysisId}/info`}>Edit</Link>
              </Button>
              <DeleteAnalysisButton analysisId={analysisId}>
                Delete
              </DeleteAnalysisButton>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
