import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAnalysisInfo, isAnalysisOwner } from "@/data/analyze";
import { EyeOff } from "lucide-react";
import UpdateInfoForm from "@/components/analysis/update-info";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
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
