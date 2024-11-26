import { CheckCircle2 } from "lucide-react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export default function VerifyRequestPage() {
  return (
    <Card className="w-full max-w-md p-4 bg-muted/50">
      <CardHeader className="text-center">
        <div className="mb-4 flex justify-center">
          <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden="true" />
        </div>
        <p className="text-2xl font-semibold">Check your email</p>
        <CardDescription className="mt-2">
          A sign in link has been sent to your email address. Please check your
          inbox and spam folder.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
