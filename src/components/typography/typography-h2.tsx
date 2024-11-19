import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TypographyH2Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const TypographyH2 = ({
  children,
  className,
  ...props
}: TypographyH2Props) => (
  <h2
    className={cn(
      "scroll-m-20 text-3xl font-semibold tracking-tight ",
      className
    )}
    {...props}
  >
    {children}
  </h2>
);
