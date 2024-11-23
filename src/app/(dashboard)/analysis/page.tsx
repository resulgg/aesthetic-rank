import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAllAnalysisByUserId } from "@/data/analyze";
import { FileEdit, Globe, Lock, Trash2 } from "lucide-react";
import CreateAnalysisButton from "@/components/analysis/create-analysis-button";
import DeleteAnalysis from "@/components/analysis/delete-analysis";
import { EmptyAnalysisState } from "@/components/analysis/empty-analysis-state";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyH4 } from "@/components/typography/typography-h4";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
            <Link key={analysis.id} href={`/analysis/${analysis.id}`}>
              <Card className="w-full relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-4 right-4 z-20">
                  <div
                    className={`px-3 py-2 rounded-full backdrop-blur-sm flex items-center gap-2 ${
                      analysis.isPublic ? "bg-primary/80" : "bg-secondary/80"
                    }`}
                  >
                    {analysis.isPublic ? (
                      <>
                        <Globe className="w-4 h-4" />
                        <span className="text-xs font-medium">Public</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span className="text-xs font-medium">Private</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="relative h-[400px]">
                  {analysis.photos && analysis.photos[0] ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${analysis.photos[0].image}`}
                      alt="Analysis thumbnail"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-secondary/20 flex items-center justify-center">
                      <FileEdit className="w-20 h-20 text-muted-foreground/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background from-10% via-40% via-background/40 to-transparent" />
                </div>

                <CardContent className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4 backdrop-blur-sm bg-secondary/5 rounded-lg p-4 border border-primary/10">
                    <div className="flex flex-col items-center gap-1">
                      <TypographyH4>Height</TypographyH4>
                      <p className="text-sm text-muted-foreground">
                        {analysis.height}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <TypographyH4>Weight</TypographyH4>
                      <p className="text-sm text-muted-foreground">
                        {analysis.weight}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <TypographyH4>Gender</TypographyH4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {analysis.gender}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {draftAnalyses.length > 0 && (
        <div className="space-y-8">
          <TypographyH2>Drafts</TypographyH2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {draftAnalyses.map((draft) => (
              <Card key={draft.id} className="group border-dashed relative">
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
                      {!draft.height || !draft.weight || !draft.gender
                        ? "Basic information needs to be filled"
                        : !draft.photos?.length
                          ? "Photos need to be uploaded"
                          : !draft.isPaid
                            ? "Payment required"
                            : "Your analysis is being generated"}
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
                          <Link
                            href={
                              !draft.height || !draft.weight || !draft.gender
                                ? `/analysis/${draft.id}/info`
                                : !draft.photos?.length
                                  ? `/analysis/${draft.id}/photos`
                                  : !draft.isPaid
                                    ? `/analysis/${draft.id}/payment`
                                    : `/analysis/${draft.id}/result`
                            }
                          >
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
