import Image from "next/image";
import Link from "next/link";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";

const SAMPLE_ANALYSES = [
  {
    id: "a95da8f7-8f49-4cea-b631-7edf311e076f",
    name: "Marcus Williams",
    tier: "Legendary",
    score: 9.3,
    image: "/male/male-pose-3.png",
    stats: {
      height: "184 cm",
      weight: "80 kg",
      age: 25,
    },
  },
  {
    id: "83468156-67ef-4879-8ae1-47facf4aa7a2",
    name: "Sarah Chen",
    tier: "Legendary",
    score: 9.1,
    image: "/female/pose-2.png",
    stats: {
      height: "5'3",
      weight: "119 lbs",
      age: 25,
    },
  },
  {
    id: "79d7a79f-7c78-41eb-8f8c-5bea3526a552",
    name: "Javier Lopez",
    tier: "Elite",
    score: 8.3,
    image: "/male/male-pose-9.png",
    stats: {
      height: "176 cm",
      weight: "72 kg",
      age: 23,
    },
  },
];

export const MarketingSampleAnalysis = () => {
  return (
    <section className="py-8 space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto px-6">
        <TypographyH2>Sample Analyses</TypographyH2>
        <TypographyP className="text-muted-foreground">
          Explore example aesthetic analyses from our community (click or tap to
          view full analysis)
        </TypographyP>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
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
