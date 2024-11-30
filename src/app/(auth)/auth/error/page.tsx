import { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Authentication Error | Aesthetic Rank",
  description:
    "An error occurred during the authentication process. Email sign-in is temporarily disabled, please use Google Sign-in instead.",
  openGraph: {
    title: "Authentication Error | Aesthetic Rank",
    description:
      "An error occurred during the authentication process. Email sign-in is temporarily disabled, please use Google Sign-in instead.",
    type: "website",
  },
};

export default function ErrorPage() {
  return (
    <Card className="w-full max-w-md p-4 bg-muted/50 text-center">
      <CardHeader className="text-center">
        <div className="mb-4 flex justify-center">
          <AlertCircle
            className="h-12 w-12 text-destructive"
            aria-hidden="true"
          />
        </div>
        <p className="text-2xl font-semibold">Authentication Error</p>
        <CardDescription className="mt-2">
          We encountered an error during the authentication process.
        </CardDescription>
      </CardHeader>
      <Alert className="bg-muted/40">
        <AlertTitle>Email Sign-in Temporarily Disabled</AlertTitle>
        <AlertDescription>
          Email authentication is currently unavailable. Please use Google
          Sign-in instead.
        </AlertDescription>
      </Alert>
    </Card>
  );
}
