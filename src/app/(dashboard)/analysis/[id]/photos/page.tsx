import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { MAX_PHOTOS } from "@/constants/photo";
import {
  checkAnalysisStatus,
  getAnalysisPhotos,
  isAnalysisOwner,
} from "@/data/analyze";
import { EyeOff, InfoIcon } from "lucide-react";
import PhotoUpload from "@/components/analysis/photo-upload";
import { UploadedPhotos } from "@/components/analysis/uploaded-photos";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

  const analysisStatus = await checkAnalysisStatus(analysisId, session.user.id);

  if (analysisStatus) {
    redirect(`/analysis/${analysisId}`);
  }
  const photos = await getAnalysisPhotos(analysisId, session.user.id);
  const currentPhotoCount = photos.length;
  const remainingPhotos = Math.max(0, MAX_PHOTOS - currentPhotoCount);

  return (
    <div
      className="max-w-4xl mx-auto space-y-8"
      role="main"
      aria-labelledby="page-title"
    >
      <div className="space-y-4">
        <TypographyH1 id="page-title" className="text-center">
          Step 2: Upload Photos 📸
        </TypographyH1>
        <TypographyP className="text-muted-foreground text-center">
          Upload up to {MAX_PHOTOS} photos for your analysis. We recommend
          including front, side and back views for the most accurate assessment
        </TypographyP>
      </div>
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          While multiple angles provide better results, a single clear photo is
          also sufficient for analysis
        </AlertDescription>
      </Alert>
      <Card className="p-6 pt-6 space-y-4">
        <UploadedPhotos photos={photos} />
        <PhotoUpload
          analysisId={analysisId}
          currentPhotoCount={currentPhotoCount}
          remainingPhotos={remainingPhotos}
        />
      </Card>
    </div>
  );
}
