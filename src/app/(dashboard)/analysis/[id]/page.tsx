import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAllAnalysisDataById } from "@/data/analyze";
import { AlertTriangle, CheckCircle } from "lucide-react";
import AestheticRankCard from "@/components/analysis/aesthetic-rank-card";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import { Card } from "@/components/ui/card";

interface AnalysisPageProps {
  params: Promise<{ id: string }>;
}

export default async function AnalysisPage({ params }: AnalysisPageProps) {
  const session = await auth();
  const analysisId = (await params).id;

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  if (!analysisId) {
    notFound();
  }

  const analysis = await getAllAnalysisDataById(analysisId, session.user.id);

  if (!analysis || !analysis.analysisData) {
    notFound();
  }

  const {
    body,
    ratios,
    bodyFat,
    gender,
    height,
    isNsfw,
    weight,
    posture,
    muscleImbalance,
    skeletal,
    vascularity,
    skinHealth,
    bmi,
    somatotype,
    bodySymmetry,
    geneticPotential,
    aesthetic,
    strengths,
    weaknesses,
    sportSuitability,
    bodyAge,
    warriorType,
    isNatural,
  } = analysis.analysisData;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Global Ranking Card */}
      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">Rank #9</div>
          <div className="text-sm text-muted-foreground">
            out of 1000 physiques analyzed
          </div>
        </div>
      </div>

      {/* Aesthetic Analysis Section */}
      <AestheticRankCard
        analysisPhotos={analysis.photos}
        aestheticInfo={aesthetic}
      />
      <div className="space-y-4 text-center max-w-xl mx-auto">
        <TypographyP className="text-muted-foreground">
          {aesthetic.evaluation}
        </TypographyP>
      </div>

      {/* Core Metrics */}
      <div className="grid grid-cols-3 gap-4 rounded-lg p-6 border border-border bg-muted/50">
        {[
          { label: "Height", value: height },
          { label: "Weight", value: weight },
          { label: "Sex", value: gender.toLowerCase() },
        ].map((metric, idx) => (
          <Card key={idx} className="p-4 bg-muted/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">
                {metric.label}
              </div>
              <div className="text-md font-bold capitalize">{metric.value}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-lg border bg-muted/50">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center"
              aria-hidden="true"
            >
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <TypographyH2 id="strengths-heading">Strengths</TypographyH2>
          </div>
          <ul
            className="space-y-2 text-muted-foreground"
            aria-labelledby="strengths-heading"
          >
            {strengths.points.map((point, index) => (
              <li key={index} className="flex items-center gap-2">
                <p>- {point}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-lg bg-destructive/20 flex items-center justify-center"
              aria-hidden="true"
            >
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <TypographyH2 id="improvements-heading">
              Areas for Improvement
            </TypographyH2>
          </div>
          <ul
            className="space-y-2 text-muted-foreground"
            aria-labelledby="improvements-heading"
          >
            {weaknesses.points.map((point, index) => (
              <li key={index} className="flex items-center gap-2">
                <p>- {point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-muted/50 p-6 border border-border rounded-lg ">
        <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Genetic Potential</h3>
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              {geneticPotential.score.toFixed(1)}/10
            </span>
          </div>
          <div className="space-y-4">
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              {geneticPotential.potential}
            </span>
            <TypographyP>{geneticPotential.evaluation}</TypographyP>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
          <h3 className="font-medium">Sport Suitability</h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {sportSuitability.recommendedSport.map((sport, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-secondary rounded-full text-sm"
                >
                  {sport}
                </span>
              ))}
            </div>
            <TypographyP>{sportSuitability.evaluation}</TypographyP>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
          <h3 className="font-medium">Warrior Type</h3>
          <div className="space-y-4">
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              {warriorType.type}
            </span>
            <TypographyP>{warriorType.evaluation}</TypographyP>
          </div>
        </Card>
        {/* Age & Skin Health */}

        <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Estimated Physiological Age</h3>
            <span className="px-2 py-1 bg-secondary rounded-full text-xs md:text-sm">
              {bodyAge.age} years
            </span>
          </div>
          <div className="space-y-2">
            <TypographyP className="text-sm">{bodyAge.evaluation}</TypographyP>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Skin Health</h3>
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              {skinHealth.score.toFixed(1)}/10
            </span>
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              {skinHealth.type}
            </span>
            <TypographyP className="text-sm">
              {skinHealth.evaluation}
            </TypographyP>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Natural Status</h3>
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              {isNatural.isNatural ? "👍" : "👎"}
            </span>
            <TypographyP className="text-sm">{isNatural.reason}</TypographyP>
          </div>
        </Card>
      </div>

      {/* Body Composition Analysis */}
      <div className="border border-border rounded-lg p-6 space-y-6 bg-muted/50">
        <TypographyH2>Body Composition Analysis</TypographyH2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Body Fat</h3>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {bodyFat.percentage}
              </span>
            </div>
            <div className="space-y-2">
              <TypographyP className="text-sm">
                {bodyFat.evaluation}
              </TypographyP>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">BMI</h3>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                Index: {bmi.index}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                  Type: {bmi.type}
                </span>
              </div>
              <TypographyP className="text-sm">{bmi.evaluation}</TypographyP>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Somatotype</h3>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {somatotype.classification}
              </span>
            </div>
            <div className="space-y-2">
              <TypographyP className="text-sm">
                {somatotype.evaluation}
              </TypographyP>
            </div>
          </Card>
        </div>
      </div>

      {/* Structural Analysis */}
      <div className="border border-border rounded-lg p-6 space-y-6 bg-muted/50">
        <TypographyH2>Structural Analysis</TypographyH2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Posture</h3>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {posture.score.toFixed(1)}/10
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                  Type: {posture.type}
                </span>
              </div>
              <TypographyP className="text-sm">
                {posture.evaluation}
              </TypographyP>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Skeletal Structure</h3>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {skeletal.score.toFixed(1)}/10
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skeletal.structure.map((type, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
              <TypographyP>{skeletal.evaluation}</TypographyP>
            </div>
          </Card>
        </div>
      </div>

      {/* Muscle Analysis */}
      <div className="border border-border rounded-lg p-6 space-y-6 bg-muted/50">
        <TypographyH2>Muscle Analysis</TypographyH2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Muscle Imbalances</h3>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {muscleImbalance.score.toFixed(1)}/10
              </span>
            </div>
            <div className="space-y-4">
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {muscleImbalance.imbalance}
              </span>
              <TypographyP>{muscleImbalance.evaluation}</TypographyP>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Body Symmetry</h3>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {bodySymmetry.score.toFixed(1)}/10
              </span>
            </div>
            <div className="space-y-4">
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {bodySymmetry.symmetry}
              </span>
              <TypographyP>{bodySymmetry.description}</TypographyP>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Vascularity</h3>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {vascularity.score.toFixed(1)}/10
              </span>
            </div>
            <div className="space-y-4">
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {vascularity.type}
              </span>
              <TypographyP>{vascularity.evaluation}</TypographyP>
            </div>
          </Card>
        </div>
      </div>

      {/* Muscle Groups */}
      <div className="border border-border rounded-lg p-6 space-y-6 bg-muted/50">
        <TypographyH2>Muscle Groups</TypographyH2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(body).map(([muscle, data]) => (
            <Card key={muscle} className="p-4 bg-card/50 backdrop-blur-sm">
              <h3 className="font-medium capitalize mb-2">{muscle}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="w-full bg-secondary rounded-full h-2 mr-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${data.score * 10}%` }}
                    />
                  </div>
                  <span className="text-sm">{data.score.toFixed(1)}</span>
                </div>
                <TypographyP className="text-sm">{data.evaluation}</TypographyP>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Body Proportions */}
      <div className="border border-border rounded-lg p-6 space-y-6 bg-muted/50">
        <TypographyH2>Body Proportions</TypographyH2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(ratios).map(([ratio, data]) => (
            <Card
              key={ratio}
              className="p-4 bg-card/50 backdrop-blur-sm space-y-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium capitalize mb-2">
                  {ratio.replace(/([A-Z])/g, " $1")}
                </h3>
                <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                  Ratio: {data.ratio.toFixed(2)}
                </span>
              </div>
              <div className="space-y-2">
                <TypographyP className="text-sm">{data.evaluation}</TypographyP>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {isNsfw.isNsfw && (
        <Card className="p-4 border-destructive">
          <TypographyP className="text-destructive text-center">
            Note: {isNsfw.reason}
          </TypographyP>
        </Card>
      )}
    </div>
  );
}
