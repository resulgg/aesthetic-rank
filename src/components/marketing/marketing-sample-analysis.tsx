import Image from "next/image";
import Link from "next/link";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";

const SAMPLE_ANALYSES = [
  {
    id: "ceb1c517-6582-4b25-acb3-bb279778d21c",
    name: "Natalia Reed",
    tier: "Legendary",
    score: 9.2,
    image: "61897e65-42ef-46ef-9ec7-519cd8f69768.jpeg",
    stats: {
      height: "5'3",
      weight: "114 lbs",
    },
  },
  {
    id: "7d0ecb32-ae17-4794-8568-8d985be83c78",
    name: "Daniel Hernandez",
    tier: "Legendary",
    score: 9.2,
    image: "573cbff7-b9e7-45f8-9787-0e6d096d61a8.jpeg",
    stats: {
      height: "5'9",
      weight: "198 lbs",
    },
  },
  {
    id: "112cf89f-c089-4a78-8cd1-43ec64d6738b",
    name: "Karen Edwards",
    tier: "Legendary",
    score: 9,
    image: "0aa503a4-0673-4e42-a5ce-2008fcf3d8b2.jpeg",
    stats: {
      height: "5'3",
      weight: "121 lbs",
    },
  },
];

export const MarketingSampleAnalysis = () => {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <TypographyH2>Sample AI Body Analyses</TypographyH2>
        <TypographyP className="text-muted-foreground">
          Explore example aesthetic analyses from our community (click or tap to
          view full analysis)
        </TypographyP>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_ANALYSES.map((analysis) => (
          <Link
            key={analysis.id}
            href={`/analysis/public/${analysis.id}`}
            className="group"
          >
            <div className="relative overflow-hidden rounded-lg border-2 border-border/30 hover:border-primary/30 transition-colors">
              <div className="relative h-[400px]">
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${analysis.image}`}
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
