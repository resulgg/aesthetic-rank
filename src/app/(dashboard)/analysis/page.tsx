import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAllAnalysisByUserId } from "@/data/analyze";
import { Plus } from "lucide-react";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyH4 } from "@/components/typography/typography-h4";
import { TypographyP } from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AnalysisPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/auth/signin");
  }

  const analyses = await getAllAnalysisByUserId(session.user.id);

  if (!analyses || analyses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] lg:p-8">
        <div className="w-full max-w-[90%] sm:max-w-xl md:max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <TypographyH2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              <span className="grayscale">🎯</span> Discover Your Aesthetic Rank{" "}
              <span className="grayscale">💪</span>
            </TypographyH2>

            <TypographyP className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              From Iron-Tier to Supreme Aesthetics, find out where you stand
              with our comprehensive AI body analysis tool
            </TypographyP>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="flex flex-col items-center p-6 rounded-xl bg-card hover:bg-accent/5 transition-colors">
              <span className="grayscale text-3xl mb-3">🧬</span>
              <h3 className="font-semibold mb-2">Body Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Somatotype & Structure
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-card hover:bg-accent/5 transition-colors">
              <span className="grayscale text-3xl mb-3">📊</span>
              <h3 className="font-semibold mb-2">Measurements</h3>
              <p className="text-sm text-muted-foreground">
                Golden Ratio Analysis
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-card hover:bg-accent/5 transition-colors">
              <span className="grayscale text-3xl mb-3">⚡</span>
              <h3 className="font-semibold mb-2">Genetic Potential</h3>
              <p className="text-sm text-muted-foreground">
                Elite to Developing
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all duration-300"
              asChild
            >
              <Link
                href="/analysis/new"
                className="flex items-center justify-center gap-2 px-8 py-6"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Start Analysis</span>
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 hover:bg-accent/5 shadow-sm transition-all duration-300"
              asChild
            >
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 px-8 py-6"
              >
                <span className="grayscale">🏆</span>
                <span className="font-medium">View Rankings</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analyses.map((analysis) => (
          <Link key={analysis.id} href={`/analysis/${analysis.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-wrap justify-between items-center border rounded-lg p-6 ">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <TypographyH4>Height</TypographyH4>
                    <p className="text-muted-foreground ">{analysis.height}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <TypographyH4>Weight</TypographyH4>
                    <p className="text-muted-foreground ">{analysis.weight}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <TypographyH4>Gender</TypographyH4>
                    <p className="text-muted-foreground capitalize ">
                      {analysis.gender}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.photos && analysis.photos[0] && (
                    <div className="relative w-full h-[400px] md:h-[450px] xl:h-[500px] rounded-lg overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${analysis.photos[0].image}`}
                        alt="Analysis thumbnail"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnalysisPage;
