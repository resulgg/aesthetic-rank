import Image from "next/image";
import Link from "next/link";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";

const SAMPLE_ANALYSES = [
  {
    id: "sample-1",
    name: "Alex Thompson",
    tier: "Elite",
    score: 9.2,
    image: "/male/male-pose-1.png",
    stats: {
      height: "6'1\"",
      weight: "185 lbs",
      age: 27,
    },
  },
  {
    id: "sample-2",
    name: "Sarah Chen",
    tier: "Supreme",
    score: 8.8,
    image: "/female/pose-2.png",
    stats: {
      height: "5'7\"",
      weight: "135 lbs",
      age: 24,
    },
  },
  {
    id: "sample-3",
    name: "Marcus Williams",
    tier: "Gold",
    score: 8.2,
    image: "/male/male-pose-3.png",
    stats: {
      height: "5'11\"",
      weight: "175 lbs",
      age: 29,
    },
  },
];

export const MarketingSampleAnalysis = () => {
  return (
    <section className="py-8 px-4 space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <TypographyH2>Sample Analyses</TypographyH2>
        <TypographyP className="text-muted-foreground">
          Explore example aesthetic analyses from our community (click or tap to
          view full analysis)
        </TypographyP>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {SAMPLE_ANALYSES.map((analysis) => (
          <Link
            key={analysis.id}
            href={`/analysis/public/${analysis.id}`}
            className="group"
          >
            <div className="relative overflow-hidden rounded-lg border-2 border-border/30 hover:border-primary/30 transition-colors">
              <div className="relative h-[400px]">
                <Image
                  src={analysis.image}
                  alt={`${analysis.name}'s physique analysis`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background from-10% to-transparent" />
              </div>

              <div className="absolute bottom-0 w-full p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{analysis.name}</h3>
                  <span className="text-primary font-bold">
                    {analysis.score}/10
                  </span>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{analysis.tier}</span>
                  <span>
                    {analysis.stats.height} • {analysis.stats.weight}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MarketingSampleAnalysis;
