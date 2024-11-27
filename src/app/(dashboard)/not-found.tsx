import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md p-4 bg-muted/50">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <AlertTriangle
              className="h-12 w-12 text-destructive"
              aria-hidden="true"
            />
          </div>
          <TypographyH2>Page Not Found</TypographyH2>
        </CardHeader>
        <CardContent className="text-center">
          <TypographyP className="mb-4">
            The page you are looking for does not exist or has been moved.
          </TypographyP>
          <Button variant={"link"} className="underline" asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
