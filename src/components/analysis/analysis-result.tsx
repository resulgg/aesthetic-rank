import { getAestheticRankByAnalysisId } from "@/data/rank";
import { AestheticRank } from "@/schemas/openai-vision";
import { AnalysisDataType, SelectAnalysisAndPhotos } from "@/types/analysis";
import { AlertTriangle, CheckCircle } from "lucide-react";
import AestheticRankCard from "@/components/analysis/aesthetic-rank-card";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const AnalysisResult = async ({
  analysis,
}: {
  analysis: SelectAnalysisAndPhotos;
}) => {
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
    skinCondition,
    bmi,
    somatotype,
    bodySymmetry,
    geneticPotential,
    aesthetic,
    strengths,
    weaknesses,
    sportRecommendation,
    bodyAge,
    warriorType,
    isNatural,
  } = analysis.analysisData as AnalysisDataType;

  const { rank, totalMembers } = await getAestheticRankByAnalysisId(
    analysis.id
  );

  const getBgGradient = (rank: AestheticRank) => {
    switch (rank) {
      case AestheticRank.Supreme:
        return "bg-gradient-to-r from-[#ffd700] via-[#ffb700] to-[#ffd700] dark:from-[#ffd700] dark:via-[#ffb700] dark:to-[#ffd700]";
      case AestheticRank.Legendary:
        return "bg-gradient-to-r from-[#e9d5ff] via-[#c084fc] to-[#e9d5ff] dark:from-[#E6E6FA] dark:via-[#D8BFD8] dark:to-[#E6E6FA]";
      case AestheticRank.Elite:
        return "bg-gradient-to-r from-[#bfdbfe] via-[#60a5fa] to-[#bfdbfe] dark:from-[#E3F2FD] dark:via-[#BBDEFB] dark:to-[#E3F2FD]";
      case AestheticRank.Intermediate:
        return "bg-gradient-to-r from-[#fef08a] via-[#facc15] to-[#fef08a] dark:from-[#F0E68C] dark:via-[#EEE8AA] dark:to-[#F0E68C]";
      case AestheticRank.Developing:
        return "bg-gradient-to-r from-[#e2e8f0] via-[#94a3b8] to-[#e2e8f0] dark:from-[#B8B8B8] dark:via-[#D3D3D3] dark:to-[#B8B8B8]";
      case AestheticRank.Beginner:
        return "bg-gradient-to-r from-[#fed7aa] via-[#fb923c] to-[#fed7aa] dark:from-[#D2B48C] dark:via-[#DEB887] dark:to-[#D2B48C]";
      case AestheticRank.Starting:
        return "bg-gradient-to-r from-[#f4f4f5] via-[#d4d4d8] to-[#f4f4f5] dark:from-[#C0C0C0] dark:via-[#DCDCDC] dark:to-[#C0C0C0]";
      default:
        return "bg-gradient-to-r from-[#f4f4f5] via-[#d4d4d8] to-[#f4f4f5] dark:from-[#C0C0C0] dark:via-[#DCDCDC] dark:to-[#C0C0C0]";
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <TypographyH2
          className={cn(
            "inline-flex animate-text-gradient bg-[200%_auto] font-extrabold bg-clip-text text-transparent",
            getBgGradient(aesthetic.rank)
          )}
        >
          {aesthetic.rank}
        </TypographyH2>
        {rank && totalMembers ? (
          <div className="text-center ">
            <div className="text-2xl font-bold">Rank #{rank}</div>
            <div className="text-sm text-muted-foreground">
              out of {totalMembers} physiques analyzed
            </div>
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            Ranking system is temporarily disabled due to high system load
          </div>
        )}
      </div>
      <div className="space-y-2">
        {/* Aesthetic Analysis Section */}
        <AestheticRankCard
          isNsfw={isNsfw}
          analysisPhotos={analysis.photos}
          aestheticInfo={aesthetic}
        />
        {/* User Info */}
        {analysis.name && (
          <div
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg",
              analysis.name.length > 15 ||
                (analysis.instagram && analysis.instagram.length > 15)
                ? "flex-col gap-0"
                : "flex-row"
            )}
          >
            <span className="text-center text-sm cursor-default">
              {analysis.name}
            </span>
            {analysis.instagram && (
              <a
                href={`https://instagram.com/${analysis.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors underline"
                aria-label={`Visit ${analysis.name}'s Instagram profile`}
              >
                <span>@{analysis.instagram}</span>
              </a>
            )}
          </div>
        )}
      </div>

      <div className="text-center max-w-xl mx-auto">
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
            {weaknesses.points.length === 0 ? (
              <li className="flex items-center gap-2">
                <p>
                  💀 Exceptional physique - no major areas for improvement
                  identified!
                </p>
              </li>
            ) : (
              weaknesses.points.map((point, index) => (
                <li key={index} className="flex items-center gap-2">
                  <p>- {point}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-muted/50 p-4 border border-border rounded-lg ">
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
          <h3 className="font-medium">Sport Recommendation</h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {sportRecommendation.recommendedSport.map((sport, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-secondary rounded-full text-sm"
                >
                  {sport}
                </span>
              ))}
            </div>
            <TypographyP>{sportRecommendation.evaluation}</TypographyP>
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
            <h3 className="font-medium">Estimated Body Age</h3>
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
            <h3 className="font-medium">Skin Condition</h3>
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              {skinCondition.score.toFixed(1)}/10
            </span>
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              {skinCondition.type}
            </span>
            <TypographyP className="text-sm">
              {skinCondition.evaluation}
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
      <div className="border border-border rounded-lg p-4 space-y-6 bg-muted/50">
        <TypographyH2 className="p-2">Body Composition Analysis</TypographyH2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Body Fat</h3>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {bodyFat.percentage.replace(/%/g, "")}%
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
      <div className="border border-border rounded-lg p-4 space-y-6 bg-muted/50">
        <TypographyH2 className="p-2">Structural Analysis</TypographyH2>
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
      <div className="border border-border rounded-lg p-4 space-y-6 bg-muted/50">
        <TypographyH2 className="p-2">Muscle Analysis</TypographyH2>
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
      <div className="border border-border rounded-lg p-4 space-y-6 bg-muted/50">
        <TypographyH2 className="p-2">Muscle Groups</TypographyH2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
      <div className="border border-border rounded-lg p-4 space-y-6 bg-muted/50">
        <TypographyH2 className="p-2">Body Proportions</TypographyH2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      <div className="flex justify-center">
        <TypographyP className="text-sm text-muted-foreground">
          Created on{" "}
          {new Date(analysis.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </TypographyP>
      </div>
    </>
  );
};

export default AnalysisResult;
