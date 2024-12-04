import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAllAnalysisDataById, isAnalysisOwner } from "@/data/analyze";
import { EyeOff, Globe2, Lock, Trash2 } from "lucide-react";
import AnalysisResult from "@/components/analysis/analysis-result";
import { AnalysisSettings } from "@/components/analysis/analysis-settings";
import DeleteAnalysisButton from "@/components/analysis/delete-analysis";
import { TypographyP } from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";

interface AnalysisPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Analysis Details | Aesthetic Rank",
  description:
    "View your detailed physique analysis results, manage visibility settings, and see how you compare to others in the Aesthetic Rank community.",
};

export const dynamic = "force-dynamic";
export default async function AnalysisPage({ params }: AnalysisPageProps) {
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

  const analysis = await getAllAnalysisDataById(analysisId, session.user.id);

  if (!analysis?.isCompleted) {
    redirect(`/analysis/${analysisId}/status`);
  }

  if (!analysis || !analysis.analysisData) {
    notFound();
  }

  return (
    <div className="max-w-6xl relative mx-auto space-y-8">
      <AnalysisResult
        analysis={analysis}
        isPublic={analysis.isPublic || false}
      />
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Analysis Settings</h3>
          <TypographyP className="text-sm text-muted-foreground">
            Manage your analysis visibility and preferences
          </TypographyP>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <div className="font-medium">Visibility Status</div>
              <TypographyP className="text-sm text-muted-foreground">
                {analysis.isPublic
                  ? "Your analysis is public and visible to everyone. It will appear in public rankings. Click or tap the gear icon to make it private"
                  : "Your analysis is private and only visible to you. Click or tap the gear icon to make it public and appear in public rankings"}
              </TypographyP>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm flex items-center gap-2 px-3 py-1.5 rounded-md ${
                  analysis.isPublic
                    ? "text-green-700 dark:text-green-300 bg-green-500/10 dark:bg-green-500/20"
                    : "text-amber-700 dark:text-amber-300 bg-amber-500/10 dark:bg-amber-500/20"
                }`}
              >
                {analysis.isPublic ? (
                  <>
                    <Globe2 className="h-4 w-4" />
                    <span>Public</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Private</span>
                  </>
                )}
              </span>
              <AnalysisSettings
                analysisId={analysis.id}
                defaultValues={{
                  name: analysis.name || "",
                  instagram: analysis.instagram || "",
                  isPublic: analysis.isPublic || false,
                }}
              />
            </div>
          </div>

          <div className="border-t pt-6 w-full space-y-2">
            <div className="font-medium text-destructive">Danger Zone</div>
            <div className="flex flex-col items-start md:items-center md:flex-row gap-2 w-full justify-between">
              <TypographyP className="text-sm text-muted-foreground">
                Once deleted, your analysis cannot be recovered
              </TypographyP>
              <DeleteAnalysisButton
                className="text-md h-14 w-full md:w-auto"
                analysisId={analysis.id}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Analysis
              </DeleteAnalysisButton>
            </div>
          </div>
        </div>
      </div>
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
