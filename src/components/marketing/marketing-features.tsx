"use client";

import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";

const FEATURES = [
  {
    icon: "🏆",
    title: "Aesthetic Ranking",
    description:
      "Get ranked from Iron to Supreme tier based on your overall aesthetics score, and find out where you stand in the aesthetic rankings",
  },
  {
    icon: "✨",
    title: "Personalized Insights",
    description:
      "Genetic potential assessment, sport recommendations, and strength/weakness evaluation",
  },
  {
    icon: "🎯",
    title: "Muscle Group Assessment",
    description:
      "Detailed scoring and evaluation of arms, shoulders, chest, abs, back, legs and other key muscle groups",
  },
  {
    icon: "⚖️",
    title: "Body Ratios",
    description:
      "Analysis of key proportions like waist-to-hip, shoulder-to-waist, and other critical aesthetic ratios",
  },
  {
    icon: "💪",
    title: "Comprehensive Physique Analysis",
    description:
      "Detailed evaluation of posture, muscle imbalances, skeletal structure, and body symmetry",
  },
  {
    icon: "📊",
    title: "Body Composition Analysis",
    description:
      "BMI analysis, body fat percentage, vascularity assessment, and somatotype classification",
  },
  {
    icon: "⚔️",
    title: "Warrior Archetype",
    description:
      "Discover your historical warrior match from Spartan to Samurai based on your physique",
  },
  {
    icon: "🧬",
    title: "Natural Status Assessment",
    description:
      "Professional analysis of whether the physique is naturally obtained based on multiple indicators",
  },
  {
    icon: "⚡️",
    title: "Instant AI Analysis",
    description:
      "Get your comprehensive report in under 60 seconds using our advanced AI vision technology",
  },
];

export const MarketingFeatures = () => {
  return (
    <section className="space-y-8 relative overflow-hidden bg-gradient-to-b from-background via-background/80 to-background">
      <div className="text-center space-y-4 max-w-3xl mx-auto relative z-10">
        <TypographyH2 className="inline-flex animate-text-gradient bg-[200%_auto] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#999999] via-[#808080] to-[#999999] dark:from-[#E8E8E8] dark:via-[#D3D3D3] dark:to-[#E8E8E8]">
          Your Comprehensive AI Body Analysis Report
        </TypographyH2>
        <TypographyP className="text-muted-foreground">
          Our AI-powered platform provides comprehensive physique analysis
          across multiple aspects
        </TypographyP>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  mx-auto relative z-10">
        {FEATURES.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3 py-3 px-4 rounded-lg border-2 border-border/30 hover:border-primary/30 backdrop-blur-sm transition-colors"
          >
            <span className="text-xl shrink-0 mt-1" aria-hidden="true">
              {feature.icon}
            </span>
            <div className="flex flex-col">
              <span className="font-medium">{feature.title}</span>
              <span className="text-sm text-muted-foreground">
                {feature.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketingFeatures;
