import Image from "next/image";
import { TypographyP } from "@/components/typography/typography-p";
import { TypographyH3 } from "../typography/typography-h3";
import { TypographyH4 } from "../typography/typography-h4";
import { Card } from "../ui/card";

type AnalysisReviewProps = {
  analysis: {
    height: string | null;
    weight: string | null;
    gender: "male" | "female" | null;
    id: string;
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

const AnalysisReview = ({ analysis }: AnalysisReviewProps) => {
  if (!analysis) {
    return (
      <div className="flex items-center justify-center p-8" role="alert">
        <TypographyP className="text-muted-foreground">
          No analysis data available
        </TypographyP>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <TypographyH3>Details</TypographyH3>
          <TypographyP className="text-muted-foreground">
            Review your physical information before proceeding
          </TypographyP>
        </div>

        <div className="flex gap-4 flex-wrap justify-between items-center border rounded-lg p-6">
          <div className="flex flex-col justify-center items-center gap-2">
            <TypographyH4>Height</TypographyH4>
            <p className="text-muted-foreground text-lg">{analysis.height}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <TypographyH4>Weight</TypographyH4>
            <p className="text-muted-foreground text-lg">{analysis.weight}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <TypographyH4>Sex</TypographyH4>
            <p className="text-muted-foreground capitalize text-lg">
              {analysis.gender}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <TypographyH3>Uploaded Photos</TypographyH3>
          <TypographyP className="text-muted-foreground">
            Your submitted photos for the aesthetic analysis
          </TypographyP>
        </div>

        {analysis.photos.length === 0 ? (
          <TypographyP className="text-muted-foreground">
            No photos uploaded yet
          </TypographyP>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {analysis.photos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-[16/9] h-[250px] md:h-[420px] w-full rounded-lg overflow-hidden border"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${photo.image}`}
                  alt="Analysis photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority={false}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisReview;
