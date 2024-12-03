import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { checkAnalysisStatus, isAnalysisOwner } from "@/data/analyze";
import { EyeOff } from "lucide-react";
import ProCard from "@/components/checkout/pro-card";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";

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
  const isOwner = await isAnalysisOwner(analysisId, session.user.id);
  if (!isOwner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[30vh] max-w-4xl mx-auto space-y-4 text-center">
        <div className="flex justify-center mb-6">
          <EyeOff className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Analysis Not Available</h1>
        <p className="text-muted-foreground">
          This analysis is private and cannot be viewed publicly. The owner
          needs to make it public before it can be accessed. You can check by
          clicking the button below.
        </p>
        <Button variant="default" asChild>
          <Link href={`/analysis/public/${analysisId}`}>View public page</Link>
        </Button>
      </div>
    );
  }
  const analysisStatus = await checkAnalysisStatus(analysisId, session.user.id);

  if (analysisStatus) {
    redirect(`/analysis/${analysisId}`);
  }
  return (
    <div
      className="max-w-4xl mx-auto space-y-8"
      role="main"
      aria-labelledby="payment-title"
    >
      <div className="space-y-4 text-center">
        <TypographyH1 id="payment-title" className="px-8 md:px-32">
          Your Comprehensive Body Analysis Report
        </TypographyH1>
        <TypographyP className="text-muted-foreground max-w-2xl mx-auto">
          Get an in-depth analysis of your physique with personalized insights
          powered by advanced AI technology
        </TypographyP>
      </div>
      <div className="flex justify-center items-center">
        <ProCard analysisId={analysisId} />
      </div>
    </div>
  );
}
