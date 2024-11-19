import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TypographyH3Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const TypographyH3: FC<TypographyH3Props> = ({
  children,
  className,
  ...props
}) => (
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
