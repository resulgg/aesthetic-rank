import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAllAnalysisByUserId } from "@/data/analyze";
import { CompletedAnalysisCard } from "@/components/analysis/completed-analysis-card";
import CreateAnalysisButton from "@/components/analysis/create-analysis-button";
import { DraftAnalysisCard } from "@/components/analysis/draft-analysis-card";
import { EmptyAnalysisState } from "@/components/analysis/empty-analysis-state";
import { TypographyH2 } from "@/components/typography/typography-h2";

export const metadata: Metadata = {
  title: "Your Analyses | Aesthetic Rank",
  description:
    "View and manage your physique analyses. Track your progress and see detailed assessments of your physique through our AI-powered analysis.",
};

const AnalysisPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/auth/signin");
  }

  const analyses = await getAllAnalysisByUserId(session.user.id);

  if (!analyses || analyses.length === 0) {
    return <EmptyAnalysisState userId={session.user.id} />;
  }

  const completedAnalyses = analyses.filter((analysis) => analysis.isCompleted);
  const draftAnalyses = analyses.filter((analysis) => !analysis.isCompleted);

  return (
    <div className="container mx-auto space-y-12 mb-6">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <TypographyH2>Your Analyses</TypographyH2>
          <CreateAnalysisButton userId={session.user.id}>
            New Analysis
          </CreateAnalysisButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedAnalyses.map((analysis) => (
            <CompletedAnalysisCard key={analysis.id} analysis={analysis} />
          ))}
        </div>
      </div>

      {draftAnalyses.length > 0 && (
        <div className="space-y-8">
          <TypographyH2>Drafts</TypographyH2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {draftAnalyses.map((draft) => (
              <DraftAnalysisCard key={draft.id} draft={draft} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
