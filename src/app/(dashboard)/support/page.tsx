import { Metadata } from "next";
import { Clock, Mail, ShieldCheck } from "lucide-react";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Support | Aesthetic Rank",
  description:
    "Get help and support for your Aesthetic Rank account. We offer technical assistance, refunds, and quick response times to ensure the best experience.",
  openGraph: {
    title: "Support | Aesthetic Rank",
    description:
      "Get help and support for your Aesthetic Rank account. We offer technical assistance, refunds, and quick response times to ensure the best experience.",
    type: "website",
  },
};

export default function SupportPage() {
  return (
    <div className="container mx-auto max-w-3xl space-y-8 border border-border rounded-lg p-4 md:p-8">
      <div className="space-y-4">
        <TypographyH1 className="text-center">Support Center</TypographyH1>
        <TypographyP className="text-muted-foreground text-center">
          We understand it can be frustrating when a service you&apos;ve paid
          for doesn&apos;t work as expected. Please stay calm - we&apos;re here
          to help and will provide all possible assistance, including refunds
          when appropriate.
        </TypographyP>
      </div>
      <section>
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-primary/10 ring-2 ring-primary/5">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <TypographyH2>Our Guarantee</TypographyH2>
                <TypographyP className="text-muted-foreground">
                  We stand behind our service
                </TypographyP>
              </div>
            </div>
            <div className="mt-4 pl-16">
              <TypographyP className="text-muted-foreground">
                We offer a 100% refund or free re-analysis if any technical
                issues occur during your analysis (such as getting stuck on the
                loading screen or results not displaying)
              </TypographyP>
            </div>
          </CardContent>
        </Card>
      </section>
      <section>
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-primary/10 ring-2 ring-primary/5">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <TypographyH2>Contact Us</TypographyH2>
                <TypographyP className="text-muted-foreground">
                  Need help? Reach out to our support team
                </TypographyP>
              </div>
            </div>
            <div className="mt-4 pl-16">
              <TypographyP className="text-muted-foreground">
                Send your support request to{" "}
                <a
                  href="mailto:aestheticrank@gmail.com"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  aestheticrank@gmail.com
                </a>{" "}
                using your registered email address
              </TypographyP>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-primary/10 ring-2 ring-primary/5">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <TypographyH2>Response Time</TypographyH2>
                <TypographyP className="text-muted-foreground">
                  We aim to respond quickly to all inquiries
                </TypographyP>
              </div>
            </div>
            <div className="mt-4 pl-16">
              <TypographyP className="text-muted-foreground">
                Our team typically responds within 24 hours on business days,
                but please don&apos;t hesitate to reach out if you need urgent
                assistance. During low volume periods, we often respond within
                1-2 hours.
              </TypographyP>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
