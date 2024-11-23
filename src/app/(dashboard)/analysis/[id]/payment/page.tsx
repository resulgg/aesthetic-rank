import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { checkAnalysisStatus } from "@/data/analyze";
import ProCard from "@/components/checkout/pro-card";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";

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
        <TypographyH1 id="payment-title">
          Your Complete Body Analysis Report
        </TypographyH1>
        <TypographyP className="text-muted-foreground max-w-2xl mx-auto">
          Get an in-depth analysis of your physique with personalized insights
          powered by advanced AI technology
        </TypographyP>
      </div>
      <div className="flex justify-center items-center">
        <ProCard />
      </div>
    </div>
  );
}
