"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AestheticRank } from "@/schemas/openai-vision";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type AestheticRankCardProps = {
  analysisPhotos: {
    id: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    analysisId: string | null;
  }[];
  aestheticInfo: {
    score: number;
    evaluation: string;
    rank: AestheticRank;
  };
  isNsfw: {
    isNsfw: boolean;
    reason: string;
  };
};

const AestheticRankCard = ({
  analysisPhotos,
  aestheticInfo,
  isNsfw,
}: AestheticRankCardProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  // Initialize showNsfwContent to false when isNsfw is true
  const [showNsfwContent, setShowNsfwContent] = useState(false);

  useEffect(() => {
    const photoInterval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % analysisPhotos.length);
    }, 3000);

    return () => {
      clearInterval(photoInterval);
    };
  }, [analysisPhotos.length]);

  const getConicGradient = (rank: AestheticRank) => {
    switch (rank) {
      case AestheticRank.Supreme:
        return "bg-[conic-gradient(from_90deg_at_50%_50%,#ffd700_0%,#ff8000_50%,#ffd700_100%)]"; // Gold gradient with higher contrast for supreme rank
      case AestheticRank.Legendary:
        return "bg-[conic-gradient(from_90deg_at_50%_50%,#E6E6FA_0%,#D8BFD8_50%,#E6E6FA_100%)]"; // Lavender for legendary
      case AestheticRank.Elite:
        return "bg-[conic-gradient(from_90deg_at_50%_50%,#E3F2FD_0%,#BBDEFB_50%,#E3F2FD_100%)]"; // Soft navy blue for elite (unisex and popular soft color)
      case AestheticRank.Intermediate:
        return "bg-[conic-gradient(from_90deg_at_50%_50%,#F0E68C_0%,#EEE8AA_50%,#F0E68C_100%)]"; // Khaki for intermediate
      case AestheticRank.Developing:
        return "bg-[conic-gradient(from_90deg_at_50%_50%,#B8B8B8_0%,#D3D3D3_50%,#B8B8B8_100%)]"; // Light gray for developing
      case AestheticRank.Beginner:
        return "bg-[conic-gradient(from_90deg_at_50%_50%,#D2B48C_0%,#DEB887_50%,#D2B48C_100%)]"; // Light tan for beginner
      case AestheticRank.Starting:
        return "bg-[conic-gradient(from_90deg_at_50%_50%,#C0C0C0_0%,#DCDCDC_50%,#C0C0C0_100%)]"; // Silver/gainsboro for starting
      default:
        return "bg-[conic-gradient(from_90deg_at_50%_50%,#C0C0C0_0%,#DCDCDC_50%,#C0C0C0_100%)]"; // Default to silver/gainsboro
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] p-[8px] backdrop-blur-3xl max-w-md mx-auto">
      <span
        className={cn(
          "absolute inset-[-1000%] animate-[spin_10s_linear_infinite]",
          getConicGradient(aestheticInfo.rank)
        )}
      />
      <Card className="w-full relative overflow-hidden border-none shadow-none rounded-lg h-[470px] md:h-[600px]">
        {isNsfw.isNsfw && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNsfwContent(!showNsfwContent)}
            className="absolute top-4 left-4 z-30 bg-background/50 backdrop-blur-sm hover:bg-background/70"
            aria-label={
              showNsfwContent ? "Hide NSFW content" : "Show NSFW content"
            }
          >
            {showNsfwContent ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        )}

        <div className="absolute top-4 right-4 z-20">
          <span className="relative inline-block overflow-hidden rounded-full p-[3px]">
            <span
              className={cn(
                "absolute inset-[-1000%] animate-[spin_2s_linear_infinite]",
                getConicGradient(aestheticInfo.rank)
              )}
            />
            <div className="inline-flex cursor-default h-full w-full items-center justify-center rounded-full px-3 py-1 text-md md:text-lg font-medium backdrop-blur-3xl text-foreground bg-muted/30">
              {aestheticInfo.score.toFixed(1)} / 10
            </div>
          </span>
        </div>

        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {isNsfw.isNsfw && !showNsfwContent && (
              <div className="absolute inset-0 z-10 bg-background/80 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground px-6">
                    This content has been marked as NSFW
                  </p>
                  <div className="flex flex-col items-center my-4 border-y border-foreground/10 py-4">
                    <span className="text-muted-foreground">Reason:</span>
                    <p className="text-muted-foreground px-6">
                      {isNsfw.reason}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Click or tap the eye icon to view
                  </p>
                </div>
              </div>
            )}
            {analysisPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentPhotoIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${photo.image}`}
                  alt="Analysis photo"
                  fill
                  className={cn("object-cover", {
                    "filter blur-xl": isNsfw.isNsfw && !showNsfwContent,
                  })}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AestheticRankCard;
