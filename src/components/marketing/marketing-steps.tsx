import Image from "next/image";
import { ArrowUpCircle, Camera, Ruler } from "lucide-react";
import { TypographyH3 } from "@/components/typography/typography-h3";
import { TypographyP } from "@/components/typography/typography-p";
import { Card } from "@/components/ui/card";

const STEPS = [
  {
    title: "Basic Information",
    description:
      "Enter your height, weight and sex to get started with your analysis",
    icon: <Ruler className="h-8 w-8" />,
    step: 1,
    image: "/male/male-pose-4.png",
  },
  {
    title: "Upload Photos",
    description: "Upload your body photos for analysis",
    icon: <Camera className="h-8 w-8" />,
    step: 2,
    image: "/female/pose-8.png",
  },
  {
    title: "Get Results",
    description:
      "Get a detailed physique analysis and aesthetic ranking in under a minute.",
    icon: <ArrowUpCircle className="h-8 w-8" />,
    step: 3,
    image: "/male/male-pose-6.png",
  },
];

const MarketingSteps = () => {
  return (
    <section className="mt-8">
      <div className="grid gap-6 md:grid-cols-3 px-2">
        {STEPS.map((step) => (
          <Card key={step.step} className="relative overflow-hidden h-[400px]">
            <div className="absolute inset-0 z-0">
              <div className="relative w-full h-full">
                <Image
                  src={step.image}
                  alt={`Step ${step.step} illustration`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background from-10% via-40% via-background/40 to-transparent" />
              </div>
            </div>

            <div className="relative z-20 flex flex-col items-center text-center space-y-4 p-6 h-full justify-end">
              <div className="p-3 rounded-full bg-secondary/50 backdrop-blur-sm border border-primary/10">
                {step.icon}
              </div>
              <div className="space-y-2">
                <TypographyH3>Step {step.step}</TypographyH3>
                <TypographyH3>{step.title}</TypographyH3>
                <TypographyP className="text-muted-foreground">
                  {step.description}
                </TypographyP>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MarketingSteps;
