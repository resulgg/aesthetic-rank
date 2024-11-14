import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TypographyH3Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function TypographyH3({
  children,
  className,
  ...props
}: TypographyH3Props) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
