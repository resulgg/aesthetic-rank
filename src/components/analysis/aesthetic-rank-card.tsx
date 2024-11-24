"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AestheticRank } from "@/schemas/openai-vision";
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
};

const AestheticRankCard = ({
  analysisPhotos,
  aestheticInfo,
}: AestheticRankCardProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
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
        return "bg-[conic-gradient(from_90deg_at_50%_50%,#ecfdf5_0%,#a7f3d0_50%,#ecfdf5_100%)]"; // Using #ecfdf5 for supreme with less contrast
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
    <div className="relative overflow-hidden rounded-xl p-[8px] backdrop-blur-3xl max-w-md mx-auto">
      <span
        className={cn(
          "absolute inset-[-1000%] animate-[spin_10s_linear_infinite]",
          getConicGradient(aestheticInfo.rank)
        )}
      />
      <Card className="w-full relative overflow-hidden border-none rounded-xl">
        <div className="absolute top-4 right-4 z-20 bg-muted/90 backdrop-blur-sm rounded-lg px-4 py-2">
          <span className="text-lg md:text-xl">
            {aestheticInfo.score.toFixed(1)} / 10
          </span>
        </div>

        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {analysisPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentPhotoIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${photo.image}`}
                  alt="Analysis photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10  space-y-8 mt-[400px] md:mt-[500px]">
          <div
            className={cn(
              "flex flex-col items-center space-y-6 backdrop-blur-sm bg-muted/90 rounded-xl p-4 "
            )}
          >
            <div className="text-2xl">{aestheticInfo.rank}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AestheticRankCard;
