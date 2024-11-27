import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "200", "300"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Aesthetic Rank",
  description:
    "Get a detailed assessment of your physique through our AI-powered analysis and discover where you rank among others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolage.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
