import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TypographyH4Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const TypographyH4 = ({
  children,
  className,
  ...props
}: TypographyH4Props) => (
  <h4
    className={cn(
      "scroll-m-20 text-xl font-semibold tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h4>
);
