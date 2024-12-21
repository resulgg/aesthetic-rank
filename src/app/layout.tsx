import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";
import PlausibleProvider from "next-plausible";
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
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleProvider
          domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN!}
          customDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL!}
          trackOutboundLinks={true}
          taggedEvents={true}
          selfHosted={true}
        />
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="48x48"
          type="image/x-icon"
        />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
          type="image/x-icon"
          sizes="48x48"
        />
      </head>
      <body className={`${bricolage.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
