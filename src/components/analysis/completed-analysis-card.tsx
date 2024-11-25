import Image from "next/image";
import Link from "next/link";
import { SelectAnalysisAndPhotos } from "@/types/analysis";
import { FileEdit, Globe, Lock } from "lucide-react";
import { TypographyH4 } from "@/components/typography/typography-h4";
import { Card, CardContent } from "@/components/ui/card";

interface CompletedAnalysisCardProps {
  analysis: SelectAnalysisAndPhotos;
}

export function CompletedAnalysisCard({
  analysis,
}: CompletedAnalysisCardProps) {
  return (
    <Link href={`/analysis/${analysis.id}`}>
      <Card className="w-full relative overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="absolute top-4 right-4 z-20">
          <div
            className={`px-3 py-2 rounded-full backdrop-blur-sm flex items-center gap-2 bg-muted/50 border border-primary/10`}
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
              src={`https://${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${analysis.photos[0].image}`}
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
              <p className="text-sm text-muted-foreground">{analysis.height}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TypographyH4>Weight</TypographyH4>
              <p className="text-sm text-muted-foreground">{analysis.weight}</p>
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
  );
}
