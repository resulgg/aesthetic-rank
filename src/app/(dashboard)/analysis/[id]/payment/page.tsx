import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  Activity,
  Award,
  Brain,
  Dumbbell,
  Heart,
  Ruler,
  Scale,
  Target,
} from "lucide-react";
import CheckoutButton from "@/components/checkout/checkout-button";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PaymentPageProps {
  params: Promise<{ id: string }>;
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const session = await auth();
  const analysisId = (await params).id;

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  if (!analysisId) {
    notFound();
  }

  const features = [
    {
      icon: Ruler,
      title: "Comprehensive Body Measurements",
      description:
        "Detailed analysis of arms, shoulders, chest, waist, hips, thighs, calves, and more with precise scoring",
    },
    {
      icon: Scale,
      title: "Body Ratios & Proportions",
      description:
        "Assessment of waist-to-hip, shoulder-to-waist, chest-to-waist ratios, and golden ratio conformity",
    },
    {
      icon: Brain,
      title: "Somatotype Classification",
      description:
        "Identification of your body type (Ectomorph, Mesomorph, Endomorph, or combinations) with detailed explanation",
    },
    {
      icon: Activity,
      title: "Posture & Symmetry Analysis",
      description:
        "Evaluation of body alignment, muscular imbalances, and structural symmetry with improvement recommendations",
    },
    {
      icon: Heart,
      title: "Health Indicators",
      description:
        "Assessment of BMI, vascularity, skin health, and overall physical condition",
    },
    {
      icon: Award,
      title: "Genetic Potential Evaluation",
      description:
        "Analysis of your natural physical capabilities and potential for development",
    },
    {
      icon: Target,
      title: "Aesthetic Ranking",
      description:
        "Comprehensive scoring from Iron to Supreme tier with detailed explanations",
    },
    {
      icon: Dumbbell,
      title: "Personalized Insights",
      description:
        "Detailed strengths and weaknesses analysis with actionable improvement strategies",
    },
  ];

  return (
    <div
      className="max-w-4xl mx-auto space-y-8 py-8 px-4"
      role="main"
      aria-labelledby="payment-title"
    >
      <div className="space-y-4 text-center">
        <TypographyH1 id="payment-title">
          Your Complete Body Analysis Report
        </TypographyH1>
        <TypographyP className="text-muted-foreground max-w-2xl mx-auto">
          Get an in-depth scientific analysis of your physique with actionable
          insights powered by advanced AI technology
        </TypographyP>
      </div>

      <Card className="border-2">
        <CardHeader className="space-y-2">
          <h2 className="text-2xl font-bold text-center">
            Professional Body Analysis Package
          </h2>
          <p className="text-4xl font-bold text-center text-primary">$15</p>
          <p className="text-center text-muted-foreground">
            One-time payment for full analysis
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <feature.icon className="h-6 w-6 text-primary flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-4">
            <CheckoutButton analysisId={analysisId} className="w-full">
              Get Your Analysis Report
            </CheckoutButton>

            <p className="text-center text-sm text-muted-foreground">
              🔒 Secure payment processing by LemonSqueezy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
