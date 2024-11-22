import Link from "next/link";
import {
  Activity,
  Brain,
  Dumbbell,
  Heart,
  LineChart,
  Ruler,
  Scale,
  Sparkles,
  Trophy,
  User,
} from "lucide-react";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyH3 } from "@/components/typography/typography-h3";
import { TypographyP } from "@/components/typography/typography-p";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">AestheticRank</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-muted-foreground hover:text-primary"
          >
            FAQ
          </Link>
          <Button asChild variant="default">
            <Link href="/auth/login">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AestheticRank</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered physique analysis and ranking platform.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@aestheticrank.com"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  support@aestheticrank.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} AestheticRank. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  const features = [
    {
      icon: Ruler,
      title: "Body Measurements",
      description:
        "Precise measurements of arms, shoulders, chest, waist, hips, thighs, and more",
    },
    {
      icon: Scale,
      title: "Body Ratios",
      description:
        "Analysis of waist-to-hip, shoulder-to-waist, and golden ratio proportions",
    },
    {
      icon: LineChart,
      title: "Body Fat Analysis",
      description:
        "Accurate body fat percentage estimation and distribution analysis",
    },
    {
      icon: Activity,
      title: "Posture Assessment",
      description: "Detailed evaluation of posture type and alignment issues",
    },
    {
      icon: Brain,
      title: "Muscle Balance",
      description: "Detection of muscular imbalances and asymmetries",
    },
    {
      icon: User,
      title: "Skeletal Structure",
      description: "Analysis of frame size and bone structure characteristics",
    },
    {
      icon: Heart,
      title: "Health Indicators",
      description: "Assessment of vascularity, skin health, and BMI",
    },
    {
      icon: Sparkles,
      title: "Genetic Potential",
      description:
        "Evaluation of natural physical capabilities and development potential",
    },
  ];

  const faqs = [
    {
      question: "How accurate is the AI analysis?",
      answer:
        "Our AI system uses advanced computer vision and machine learning models trained on thousands of physique assessments to provide highly accurate measurements and analysis.",
    },
    {
      question: "What do I need to submit for analysis?",
      answer:
        "You'll need to submit clear, well-lit photos from multiple angles. Detailed instructions will be provided during the submission process.",
    },
    {
      question: "How long does the analysis take?",
      answer:
        "The AI analysis is completed within minutes of submission. You'll receive a comprehensive report immediately after processing.",
    },
    {
      question: "Is my data kept private?",
      answer:
        "Yes, all submitted photos and analysis results are kept strictly confidential and encrypted. We never share your data with third parties.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80">
        <div className="max-w-7xl mx-auto text-center">
          <TypographyH1 className="mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            AI-Powered Physique Analysis & Ranking
          </TypographyH1>
          <TypographyP className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a scientific analysis of your physique using advanced AI
            technology. Understand your body composition, proportions, and
            aesthetic ranking.
          </TypographyP>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="font-semibold">
              <Link href="/auth/login">Start Analysis</Link>
            </Button>
            <Button variant="outline" size="lg">
              View Demo Report
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <TypographyH2 className="text-center mb-12">
            Comprehensive Analysis Features
          </TypographyH2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ranking System */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/50">
        <div className="max-w-7xl mx-auto text-center">
          <TypographyH2 className="mb-12">
            Aesthetic Ranking System
          </TypographyH2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <div className="relative h-48 w-48 overflow-hidden rounded-xl border-2 border-primary/20 p-[8px] backdrop-blur-3xl">
              <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFD700_0%,#FFA500_50%,#FFD700_100%)]" />
              <div className="inline-flex h-full w-full flex-col items-center justify-center rounded-xl bg-background/95 px-3 py-1 text-sm backdrop-blur-3xl">
                <Trophy className="h-12 w-12 text-yellow-500 mb-2" />
                <span className="font-bold text-lg">Elite</span>
                <span className="text-muted-foreground">Top 1%</span>
              </div>
            </div>

            <div className="relative h-48 w-48 overflow-hidden rounded-xl border-2 border-primary/20 p-[8px] backdrop-blur-3xl">
              <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#C0C0C0_0%,#808080_50%,#C0C0C0_100%)]" />
              <div className="inline-flex h-full w-full flex-col items-center justify-center rounded-xl bg-background/95 px-3 py-1 text-sm backdrop-blur-3xl">
                <Sparkles className="h-12 w-12 text-gray-400 mb-2" />
                <span className="font-bold text-lg">Advanced</span>
                <span className="text-muted-foreground">Top 10%</span>
              </div>
            </div>

            <div className="relative h-48 w-48 overflow-hidden rounded-xl border-2 border-primary/20 p-[8px] backdrop-blur-3xl">
              <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#CD7F32_0%,#8B4513_50%,#CD7F32_100%)]" />
              <div className="inline-flex h-full w-full flex-col items-center justify-center rounded-xl bg-background/95 px-3 py-1 text-sm backdrop-blur-3xl">
                <Dumbbell className="h-12 w-12 text-orange-700 mb-2" />
                <span className="font-bold text-lg">Intermediate</span>
                <span className="text-muted-foreground">Top 25%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-center">
                Complete Analysis Package
              </CardTitle>
              <TypographyH3 className="text-center text-primary">
                $15
              </TypographyH3>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature.title}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" size="lg">
                Get Your Analysis Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/50">
        <div className="max-w-3xl mx-auto">
          <TypographyH2 className="text-center mb-12">
            Frequently Asked Questions
          </TypographyH2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <TypographyH2 className="mb-6">
            Start Your Body Analysis Today
          </TypographyH2>
          <TypographyP className="mb-8 text-muted-foreground">
            Get your comprehensive analysis report for just $15. Understand your
            body like never before.
          </TypographyP>
          <Button asChild size="lg" className="font-semibold">
            <Link href="/auth/login">Get Started Now</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
