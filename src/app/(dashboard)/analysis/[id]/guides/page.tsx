import Link from "next/link";
import { notFound } from "next/navigation";
import { InfoIcon } from "lucide-react";
import PhotoGuidePhotos from "@/components/analysis/photo-guide-photos";
import PhotoGuideTips from "@/components/analysis/photo-guide-tips";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface GuidesPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sex?: string }>;
}

export default async function GuidesPage({
  params,
  searchParams,
}: GuidesPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { sex } = resolvedSearchParams;

  if (!sex || !["male", "female"].includes(sex.toLowerCase())) {
    notFound();
  }

  return (
    <div
      className="max-w-4xl mx-auto space-y-8"
      role="main"
      aria-labelledby="page-title"
    >
      <div className="space-y-4">
        <TypographyH1 id="page-title" className="text-center">
          Photo Guidelines 📸
        </TypographyH1>
        <TypographyP className="text-muted-foreground text-center">
          Follow these guidelines to ensure the best analysis results
        </TypographyP>
      </div>
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          If certain body parts are not visible in your photos, our AI will
          evaluate these areas by proportioning them to the visible parts.
        </AlertDescription>
      </Alert>
      <PhotoGuideTips />
      <TypographyH2>Photo Examples</TypographyH2>
      <PhotoGuidePhotos sex={sex} />
      <Button asChild>
        <Link href={`/analysis/${resolvedParams.id}/photos`} className="w-full">
          Continue
        </Link>
      </Button>
    </div>
  );
}
