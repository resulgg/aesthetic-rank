"use client";

import { AestheticRank } from "@/schemas/openai-vision";
import Autoplay from "embla-carousel-autoplay";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const MarketingRanks = () => {
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

  const rankDescriptions = {
    [AestheticRank.Supreme]: {
      description:
        "Reserved for truly exceptional physiques with perfect proportions and aesthetic appeal. A perfect 10 is extremely rare, given only to absolutely flawless aesthetic physiques.",
      score: "≥ 9.5",
      characteristics:
        "Perfect symmetry, exceptional proportions, and flawless development",
    },
    [AestheticRank.Legendary]: {
      description:
        "Outstanding physiques with minimal flaws. High scores achieved through either muscular development or naturally aesthetic proportions.",
      score: "≥ 8.5",
      characteristics:
        "Near-perfect symmetry, impressive muscle definition, and aesthetic excellence",
    },
    [AestheticRank.Elite]: {
      description:
        "Excellent physiques showing advanced aesthetic development with strong visual appeal and balanced proportions.",
      score: "≥ 7.5",
      characteristics:
        "Advanced development, great symmetry, and strong overall aesthetics",
    },
    [AestheticRank.Intermediate]: {
      description:
        "Good physiques with solid aesthetic foundation. Shows positive natural or developed aesthetics while having clear areas for improvement in overall proportions and development.",
      score: "≥ 6.5",
      characteristics:
        "Solid foundation, good proportions, clear potential for advancement",
    },
    [AestheticRank.Developing]: {
      description:
        "Average physiques with room for aesthetic improvement. Shows foundational development with potential for enhancement through focused training and balanced nutrition.",
      score: "≥ 5.5",
      characteristics:
        "Developing structure, improving symmetry, progressing development",
    },
    [AestheticRank.Beginner]: {
      description:
        "Early stage physiques beginning their aesthetic journey. With dedicated training and proper guidance, significant improvements are achievable.",
      score: "≥ 4.5",
      characteristics:
        "Building foundation, establishing form, addressing imbalances",
    },
    [AestheticRank.Starting]: {
      description:
        "Taking the first steps in aesthetic development. With consistent effort and proper guidance, there's great potential for transformation.",
      score: "≥ 1.0",
      characteristics:
        "Early development stage, establishing baseline, identifying focus areas",
    },
  };

  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <TypographyH2>Aesthetic Ranking System</TypographyH2>
        <TypographyP className="text-muted-foreground max-w-2xl mx-auto px-2 md:px-0 text-balance">
          Our sophisticated ranking system evaluates physiques based on multiple
          factors including proportions, symmetry, muscle development, and
          overall aesthetic harmony.
        </TypographyP>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
          duration: 10,
        }}
        plugins={[
          Autoplay({ delay: 6000, stopOnMouseEnter: true, playOnInit: true }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {Object.entries(rankDescriptions).map(([rank, info]) => (
            <CarouselItem key={rank} className="md:basis-1/2 lg:basis-1/3">
              <div className="rounded-lg bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm overflow-hidden h-full flex flex-col border border-border/40 hover:border-primary/30 transition-all duration-300 group">
                <div className="p-6 border-b border-border/50 bg-background/10">
                  <div className="flex items-center justify-between">
                    <TypographyH2
                      className={cn(
                        "inline-flex animate-text-gradient bg-[200%_auto] bg-clip-text font-extrabold text-transparent text-2xl tracking-tight",
                        getBgGradient(rank as AestheticRank)
                      )}
                    >
                      {rank}
                    </TypographyH2>
                    <span className="px-4 py-1.5 rounded-full bg-background/80 text-foreground text-sm font-medium border border-border/40 backdrop-blur-sm group-hover:bg-primary/5 transition-colors">
                      {info.score}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow bg-gradient-to-b from-transparent to-background/5">
                  <TypographyP className="text-sm leading-relaxed text-muted-foreground">
                    {info.description}
                  </TypographyP>
                </div>

                <div className="p-6 bg-background/5 border-t border-border/50">
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Characteristics
                    </div>
                    <div className="text-sm leading-relaxed text-foreground/80">
                      {info.characteristics}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Swipe to explore all ranks
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default MarketingRanks;
