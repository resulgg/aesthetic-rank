import Image from "next/image";
import Link from "next/link";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";

const MarketingPricing = () => {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <TypographyH2>Pricing</TypographyH2>
        <TypographyP className="text-muted-foreground">
          Discover where you rank with our AI physique analysis
        </TypographyP>
      </div>

      <div className="max-w-md mx-auto">
        <div className="relative overflow-hidden rounded-lg border-2 border-border/30 hover:border-primary/30 transition-colors">
          <div className="absolute -rotate-45 top-6 -left-8 bg-primary/90 text-white px-8 py-1 text-sm font-medium shadow-lg">
            Limited Time
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/male/male-pose-8.png"
              alt="Sample physique analysis"
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background from-10% to-transparent" />
          </div>

          <div className="absolute bottom-0 w-full p-6 space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-2xl">AI Physique Analysis</h3>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-muted-foreground line-through">
                  $19.99
                </span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                  50% OFF
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                One-time payment • Limited Time Offer
              </p>
            </div>

            <Button
              asChild
              className="w-full"
              size="lg"
              data-umami-event="Get Ranked Now"
            >
              <Link href="/analysis">Get Ranked</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingPricing;
