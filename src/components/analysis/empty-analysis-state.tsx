import Image from "next/image";
import CreateAnalysisButton from "@/components/analysis/create-analysis-button";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import { Card, CardFooter } from "@/components/ui/card";

interface EmptyAnalysisStateProps {
  userId: string;
}

export function EmptyAnalysisState({ userId }: EmptyAnalysisStateProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center justify-center px-4">
      <div className="space-y-4">
        <TypographyH1 id="page-title" className="text-center px-4">
          Welcome to the Aesthetic Rank
        </TypographyH1>
        <TypographyP className="text-muted-foreground text-center px-4">
          Get a detailed assessment of your physique through our AI-powered
          analysis and discover where you rank among others
        </TypographyP>
      </div>
      <Card className="w-full max-w-xl relative overflow-hidden">
        <div className="relative w-full h-[320px] md:h-[400px]">
          <div className="absolute inset-0 animate-crossfade [animation-delay:4s]">
            <Image
              src="/male/male-pose-2.png"
              alt="Athletic male pose"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 animate-crossfade">
            <Image
              src="/female/pose-14.png"
              alt="Athletic female pose"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background from-0% via-40% via-background/40 to-transparent" />
        </div>

        <CardFooter>
          <div className="w-full">
            <CreateAnalysisButton
              userId={userId}
              className="w-full text-lg md:text-xl"
            >
              Create Your First Analysis
            </CreateAnalysisButton>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
