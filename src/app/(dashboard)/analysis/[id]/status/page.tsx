import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { checkAnalysisStatus, getAnalysisReviewById } from "@/data/analyze";
import CheckStatus from "@/components/analysis/check-status";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import { Card } from "@/components/ui/card";

interface StatusPageProps {
  params: Promise<{ id: string }>;
}

export default async function StatusPage({ params }: StatusPageProps) {
  const session = await auth();
  const analysisId = (await params).id;

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  if (!analysisId) {
    notFound();
  }

  const analysis = await getAnalysisReviewById(analysisId, session.user.id);

  if (analysis?.isCompleted) {
    redirect(`/analysis/${analysisId}`);
  }

  if (!analysis) {
    notFound();
  }
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <TypographyH1 className="text-center">
          Analyzing Your Physique 🔍
        </TypographyH1>
        <TypographyP className="text-muted-foreground text-center">
          Our AI is carefully evaluating your photos to generate a comprehensive
          analysis. This usually takes 30-60 seconds. We&apos;ll redirect you
          automatically when it&apos;s ready.
        </TypographyP>
      </div>
      <CheckStatus analysis={analysis} />
      <TypographyP className="text-center text-muted-foreground">
        You don&apos;t need to keep this page open. We&apos;ve queued your
        analysis and you can check the results later at{" "}
        <Link href="/analysis" className="text-primary underline">
          your analysis dashboard
        </Link>
        .
      </TypographyP>
    </div>
  );
}
