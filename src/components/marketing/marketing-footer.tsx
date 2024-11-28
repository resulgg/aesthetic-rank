import Link from "next/link";
import { TypographyP } from "@/components/typography/typography-p";

export const MarketingFooter = () => {
  return (
    <footer className="mt-auto border-t py-8">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <TypographyP className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} AestheticRank. All rights reserved.
          </TypographyP>
        </div>
        <nav className="flex gap-4" aria-label="Footer navigation">
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="mailto:support@aestheticrank.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default MarketingFooter;
