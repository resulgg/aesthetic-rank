import Navbar from "@/components/layout/navbar";
import MarketingFaq from "@/components/marketing/marketing-faq";
import MarketingFeatures from "@/components/marketing/marketing-features";
import MarketingFooter from "@/components/marketing/marketing-footer";
import MarketingHero from "@/components/marketing/marketing-hero";
import MarketingPricing from "@/components/marketing/marketing-pricing";
import MarketingSampleAnalysis from "@/components/marketing/marketing-sample-analysis";
import MarketingSteps from "@/components/marketing/marketing-steps";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen max-w-screen-xl mx-auto p-3 gap-10 md:gap-20">
      <header>
        <Navbar />
      </header>
      <MarketingHero />
      <MarketingSteps />
      <MarketingSampleAnalysis />
      <MarketingFeatures />
      <MarketingPricing />
      <MarketingFaq />
      <MarketingFooter />
    </div>
  );
}
