"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import { Card } from "@/components/ui/card";

type CheckStatusProps = {
  analysis: {
    id: string;
    height: string | null;
    weight: string | null;
    gender: "male" | "female" | null;
    isCompleted: boolean | null;
    photos: {
      id: string;
      image: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      analysisId: string | null;
    }[];
  };
};

const messages = [
  {
    text: "🧠 Analyzing Aesthetic Potential",
    subtext:
      "Evaluating your physique against our Supreme to Iron tier rankings",
  },
  {
    text: "📊 Processing Body Metrics",
    subtext: "Calculating your somatotype and genetic potential indicators",
  },
  {
    text: "🎯 Determining Warrior Type",
    subtext: "Matching your physique to historical warrior archetypes",
  },
  {
    text: "💪 Analyzing Muscle Development",
    subtext: "Evaluating 12 key muscle groups and body symmetry",
  },
  {
    text: "🦴 Assessing Skeletal Structure",
    subtext: "Analyzing bone structure, joint types and frame proportions",
  },
  {
    text: "🔬 Evaluating Body Composition",
    subtext: "Calculating BMI, body fat percentage and muscle distribution",
  },
  {
    text: "⚖️ Checking Body Symmetry",
    subtext: "Analyzing left-right and upper-lower body balance",
  },
  {
    text: "🧬 Analyzing Genetic Potential",
    subtext: "Evaluating genetic advantages and limitations",
  },
  {
    text: "🎨 Assessing Skin Health",
    subtext: "Evaluating skin quality, texture and overall condition",
  },
  {
    text: "⚡ Calculating Sport Suitability",
    subtext: "Determining optimal sports based on your physique",
  },
  {
    text: "📏 Measuring Key Ratios",
    subtext: "Analyzing waist-to-hip, shoulder-to-waist and other proportions",
  },
  {
    text: "🔄 Processing Natural Status",
    subtext: "Evaluating indicators of natural development",
  },
  {
    text: "⏳ Estimating Body Age",
    subtext: "Analyzing physiological age markers and indicators",
  },
];

const CheckStatus = ({ analysis }: CheckStatusProps) => {
  const router = useRouter();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const checkStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/ai-analysis/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysisId: analysis.id }),
      });

      const data = await response.json();

      if (data.isCompleted) {
        router.push(`/analysis/${analysis.id}`);
      }
    } catch (error) {
      console.error("Error checking status:", error);
      router.push(`/analysis/${analysis.id}`);
    }
  }, [analysis.id, router]);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setFadeIn(true);
      }, 300);
    }, 3000);

    const photoInterval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % analysis.photos.length);
    }, 3000);

    const statusInterval = setInterval(checkStatus, 20000);
    checkStatus();

    return () => {
      clearInterval(messageInterval);
      clearInterval(photoInterval);
      clearInterval(statusInterval);
    };
  }, [checkStatus, analysis.photos.length]);

  return (
    <Card className="w-full max-w-xl mx-auto relative overflow-hidden">
      <div className="absolute top-4 right-4 z-20">
        <div className="backdrop-blur-sm bg-background/30 rounded-full p-2 border-2 border-primary/10">
          <Loader2
            className="w-6 h-6 animate-spin text-primary"
            aria-label="Loading analysis"
          />
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-[500px] md:h-[600px]">
          {analysis.photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentPhotoIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={`https://${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${photo.image}`}
                alt="Analysis in progress"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          ))}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background from-10% via-40% via-background/40 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 p-8 space-y-8 mt-60">
        <div className="flex flex-col items-center space-y-6 backdrop-blur-sm bg-background/30 rounded-xl p-6 border-2 border-primary/10">
          <div
            className={`transition-opacity duration-300 text-center space-y-2 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            <TypographyH2 className="text-2xl">
              {messages[currentMessageIndex].text}
            </TypographyH2>
            <TypographyP className="text-muted-foreground">
              {messages[currentMessageIndex].subtext}
            </TypographyP>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CheckStatus;
