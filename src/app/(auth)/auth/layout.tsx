import { ReactNode } from "react";
import Image from "next/image";
import { TypographyH1 } from "@/components/typography/typography-h1";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 space-y-6 py-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex justify-center items-center bg-muted/50 px-10 py-8 rounded-full border-2 border-border">
          <Image
            src="/ranking-logo.png"
            alt="logo"
            width={90}
            height={90}
            quality={100}
          />
        </div>
        <TypographyH1
          className={
            "inline-flex animate-text-gradient bg-[200%_auto] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#999999] via-[#808080] to-[#999999] dark:from-[#E8E8E8] dark:via-[#D3D3D3] dark:to-[#E8E8E8]"
          }
        >
          Aesthetic Rank
        </TypographyH1>
      </div>
      <main className="w-full mx-auto flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
