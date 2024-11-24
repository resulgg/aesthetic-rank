"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import CheckoutButton from "./checkout-button";

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
      "Genetic potential assessment, sport suitability, and detailed strength/weakness analysis",
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
  {
    icon: "🔒",
    title: "Limited Time Offer",
    description:
      "Get lifetime access to your personalized report at our special 50% discount price - Only $9.99!",
  },
];

const ProCard = () => {
  return (
    <Card className="w-full max-w-xl relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-[500px]">
          <div className="absolute inset-0 animate-crossfade [animation-delay:4s]">
            <Image
              src="/male/male-pose-8.png"
              alt="Athletic male pose"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 animate-crossfade">
            <Image
              src="/female/pose-8.png"
              alt="Athletic female pose"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background from-10% via-40% via-background/40 to-transparent" />
        </div>
      </div>
      <CardHeader className="relative z-10 p-2">
        <div className="flex justify-end">
          <div className="flex items-center gap-3 bg-secondary/50 px-4 py-3 rounded-lg backdrop-blur-sm border border-primary/10">
            <div className="text-3xl font-bold text-primary">$9.99</div>
            <div className="h-7 w-[1px] bg-foreground/10"></div>
            <div className="flex flex-col">
              <span className="text-sm text-foreground line-through">
                $19.99
              </span>
              <span className="text-xs text-primary font-medium">50% OFF</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 relative z-40 px-4 md:px-6 pt-6 pb-5 mt-60">
        <div className="grid grid-cols-1 gap-4 w-full">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 py-3 px-2 rounded-lg border-2 border-border/30 hover:border-primary/30 backdrop-blur-sm transition-colors"
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
      </CardContent>

      <CardFooter className="flex flex-col gap-4 relative z-10 px-6">
        <CheckoutButton
          analysisId="placeholder"
          className="w-full bg-primary hover:opacity-90 transition-opacity"
        >
          Get Your Analysis Now
        </CheckoutButton>
        <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
          <p>Secure Payment by Lemon Squeezy</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProCard;
