import { redirect } from "next/navigation";
import { auth } from "@/auth";
import CreateAnalysisForm from "@/components/analysis/create-analysis";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import { Card } from "@/components/ui/card";

export default async function NewAnalysisPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-4">
        <TypographyH1 className="text-center">
          Step 1: Basic Info 📋
        </TypographyH1>
        <TypographyP className="text-muted-foreground text-center">
          We need your height, weight and sex to calculate important metrics
          like BMI, body proportions, and frame size.
        </TypographyP>
      </div>
      <Card className="p-6 pt-3">
        <CreateAnalysisForm />
      </Card>
    </div>
  );
}
