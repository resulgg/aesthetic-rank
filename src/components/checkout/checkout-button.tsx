"use client";

import { useEffect, useState, useTransition } from "react";
import { checkoutUrl } from "@/actions/checkout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CheckoutButtonProps {
  analysisId: string;
  className?: string;
  children: React.ReactNode;
}

const CheckoutButton = ({
  children,
  analysisId,
  className,
}: CheckoutButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  const onClick = () => {
    startTransition(async () => {
      const result = await checkoutUrl(analysisId);
      if (result.url) {
        setRedirectUrl(result.url);
      }
    });
  };
  return (
    <Button
      onClick={onClick}
      disabled={isPending || redirectUrl !== null}
      className={cn(className, "plausible-event-name=Checkout")}
    >
      {isPending || redirectUrl !== null ? "Loading..." : children}
    </Button>
  );
};

export default CheckoutButton;
