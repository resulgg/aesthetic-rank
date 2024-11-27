"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-md p-4 bg-muted/50">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <AlertTriangle
              className="h-12 w-12 text-destructive"
              aria-hidden="true"
            />
          </div>
          <TypographyH2>Something went wrong</TypographyH2>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <TypographyP>
            The application encountered an unexpected error. Please try again
            later.
          </TypographyP>
          {error.message && (
            <TypographyP className="text-destructive">
              ({error.message})
            </TypographyP>
          )}
          <div className="flex justify-center space-x-4 items-center">
            <Button onClick={reset} className="h-12">
              Try again
            </Button>
            <Button variant={"link"} asChild>
              <Link href="/">Go back home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
