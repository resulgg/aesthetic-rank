import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAnalysisInfo } from "@/data/analyze";
import UpdateInfoForm from "@/components/analysis/update-info";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import { Card } from "@/components/ui/card";

export default async function NewAnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const analysisId = (await params).id;

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const analysisInfo = await getAnalysisInfo(analysisId, session.user.id);
  const analysisInfoValues = {
    height: analysisInfo?.height,
    weight: analysisInfo?.weight,
    gender: analysisInfo?.gender,
  };
  if (analysisInfo?.isCompleted) {
    redirect(`/analysis/${analysisId}`);
  }
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-4">
        <TypographyH1 className="text-center">
          Step 1: Basic Info 📋
        </TypographyH1>
        <TypographyP className="text-muted-foreground text-center">
          We need your height, weight and sex to calculate important metrics
          like BMI, body proportions, and frame size
        </TypographyP>
      </div>
      <Card className="p-6 pt-3">
        <UpdateInfoForm
          analysisId={analysisId}
          analysisInfo={analysisInfoValues}
        />
      </Card>
    </div>
  );
}
