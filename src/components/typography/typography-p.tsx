import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TypographyPProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const TypographyP = ({
  children,
  className,
  ...props
}: TypographyPProps) => {
  return (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6 text-sm md:text-base",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};
