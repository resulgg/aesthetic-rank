import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAnalysisReviewById } from "@/data/analyze";
import AnalysisReview from "@/components/analysis/analysis-review";
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

  // Get uploaded photos
  const analysis = await getAnalysisReviewById(analysisId, session.user.id);
  const hasPhotos = analysis && analysis.photos.length > 0;
  if (!hasPhotos) {
    redirect(`/analysis/${analysisId}/photos`);
  }

  return (
    <div className=" max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <TypographyH1 className="text-center">
          Step 3: Final Review 🔍
        </TypographyH1>
        <TypographyP className="text-muted-foreground text-center">
          Confirm your details and photos to take your place in the aesthetic
          ranking.
        </TypographyP>
      </div>
      <Card className="p-4 space-y-4">
        <AnalysisReview analysis={analysis} />
        <div className="flex flex-col gap-4">
          {analysis && (
            <>
              <Button variant="default" className="w-full" asChild>
                <Link href={`/analysis/${analysisId}/payment`}>Confirm</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/analysis/${analysisId}/info`}>
                  Edit Information
                </Link>
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
