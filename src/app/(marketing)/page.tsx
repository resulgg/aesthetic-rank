import Navbar from "@/components/layout/navbar";
import MarketingFaq from "@/components/marketing/marketing-faq";
import MarketingFeatures from "@/components/marketing/marketing-features";
import MarketingFooter from "@/components/marketing/marketing-footer";
import MarketingHero from "@/components/marketing/marketing-hero";
import MarketingPricing from "@/components/marketing/marketing-pricing";
import MarketingRanks from "@/components/marketing/marketing-ranks";
import MarketingSampleAnalysis from "@/components/marketing/marketing-sample-analysis";
import MarketingSteps from "@/components/marketing/marketing-steps";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen container mx-auto p-3 gap-10 md:gap-20">
      <header>
        <Navbar />
      </header>
      <MarketingHero />
      <MarketingSampleAnalysis />
      <MarketingRanks />
      <MarketingFeatures />
      <MarketingSteps />
      <MarketingPricing />
      <MarketingFaq />
      <MarketingFooter />
    </div>
  );
}
