import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MarketingHero = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 px-4 md:px-20 max-w-3xl mx-auto">
      <div className="flex justify-center items-center bg-muted/50 px-10 py-8 rounded-full border-2 border-border">
        <Image
          src="/ranking-logo.png"
          alt="logo"
          width={90}
          height={90}
          quality={100}
        />
      </div>
      <h1
        className={
          "inline-flex animate-text-gradient bg-[200%_auto] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#999999] via-[#808080] to-[#999999] dark:from-[#E8E8E8] dark:via-[#D3D3D3] dark:to-[#E8E8E8] text-4xl md:text-6xl text-center"
        }
      >
        Discover Your Aesthetic Rank
      </h1>
      <p className="text-muted-foreground text-center text-sm md:text-lg">
        Get a detailed assessment of your physique through our AI-powered
        analysis and discover where you rank among others
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild className="h-14">
          <Link href="/auth/signup">Get Your Analysis</Link>
        </Button>
      </div>
    </section>
  );
};

export default MarketingHero;
