import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TypographyH2Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function TypographyH2({
  children,
  className,
  ...props
}: TypographyH2Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
