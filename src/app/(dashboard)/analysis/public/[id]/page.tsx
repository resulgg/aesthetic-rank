import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getPublicAnalysisById } from "@/data/analyze";
import { AlertTriangle, EyeOff } from "lucide-react";
import AnalysisResult from "@/components/analysis/analysis-result";

interface AnalysisPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Public Analysis | Aesthetic Rank",
  description:
    "View detailed public physique analysis results and see how members of the Aesthetic Rank community compare against each other.",
  openGraph: {
    title: "Public Analysis | Aesthetic Rank",
    description:
      "View detailed public physique analysis results and see how members of the Aesthetic Rank community compare against each other.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function AnalysisPage({ params }: AnalysisPageProps) {
  const analysisId = (await params).id;

  if (!analysisId) {
    notFound();
  }

  const analysis = await getPublicAnalysisById(analysisId);

  if (!analysis?.isCompleted) {
    redirect(`/analysis/${analysisId}/status`);
  }

  if (analysis?.isBanned) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[30vh] max-w-4xl mx-auto space-y-4 text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold">Content Removed</h1>
        <p className="text-muted-foreground">
          This analysis has been removed for violating our terms of service.
        </p>
      </div>
    );
  }

  if (!analysis?.isPublic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[30vh] max-w-4xl mx-auto space-y-4 text-center">
        <div className="flex justify-center mb-6">
          <EyeOff className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Analysis Not Available</h1>
        <p className="text-muted-foreground">
          This analysis is private and cannot be viewed publicly. The owner
          needs to make it public before it can be accessed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl relative mx-auto space-y-8">
      <AnalysisResult analysis={analysis} isPublic={analysis.isPublic} />
      <Link
        href="/rankings"
        className="flex justify-center items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        Want to see the
        <span className="text-primary underline">Top 100</span>
        Aesthetics?
      </Link>
    </div>
  );
}
