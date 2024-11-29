import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyH3 } from "@/components/typography/typography-h3";
import { TypographyP } from "@/components/typography/typography-p";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Terms of Service - AestheticRank",
  description: "Terms of Service and legal agreement for using AestheticRank",
};

export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div className="space-y-4">
        <TypographyH1>Terms of Service</TypographyH1>
        <TypographyP className="text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString()}
        </TypographyP>
      </div>

      <Card className="p-6 space-y-8">
        {/* 1. Agreement */}
        <section className="space-y-4">
          <TypographyH2>1. Agreement to Terms</TypographyH2>
          <TypographyP>
            By accessing or using AestheticRank (the &quot;Service&quot;), you
            agree to be bound by these Terms of Service. If you disagree with
            any part of these terms, you do not have permission to access the
            Service.
          </TypographyP>
          <TypographyP>
            We reserve the right to remove or ban any analyses that violate
            these terms without prior notice. No refunds will be provided for
            removed analyses or banned accounts due to terms violations.
          </TypographyP>
        </section>

        <Separator />

        {/* 2. Service Description */}
        <section className="space-y-4">
          <TypographyH2>2. Service Description</TypographyH2>
          <TypographyP>
            AestheticRank provides AI-powered physique analysis services,
            including:
          </TypographyP>
          <ul className="list-disc pl-6 space-y-2">
            <li>Aesthetic ranking and tier classification</li>
            <li>Muscle group assessments</li>
            <li>Body composition analysis</li>
            <li>Genetic potential evaluation</li>
            <li>Body ratio measurements</li>
            <li>Comprehensive physique analysis</li>
            <li>Sport suitability recommendations</li>
          </ul>
        </section>

        <Separator />

        {/* 3. Account Registration */}
        <section className="space-y-4">
          <TypographyH2>3. Account Registration and Security</TypographyH2>
          <div className="space-y-4">
            <TypographyP>
              3.1. You must create an account to use our Service.
            </TypographyP>
            <TypographyP>
              3.2. You are responsible for maintaining the security of your
              account credentials.
            </TypographyP>
            <TypographyP>
              3.3. You must provide accurate and complete information during
              registration.
            </TypographyP>
            <TypographyP>
              3.4. You may sign up using email or Google authentication.
            </TypographyP>
            <TypographyP>
              3.5. You are responsible for all activities that occur under your
              account.
            </TypographyP>
            <TypographyP>
              3.6. You must be at least 18 years old to use this Service.
            </TypographyP>
          </div>
        </section>

        <Separator />

        {/* 4. Payments and Refunds */}
        <section className="space-y-4">
          <TypographyH2>4. Payments and Refunds</TypographyH2>
          <TypographyP>
            4.1. The Service charges a fee per analysis. Current pricing can be
            found on our home page. We reserve the right to change our pricing
            at any time.
          </TypographyP>
          <TypographyP>
            4.2. All payments are processed securely through LemonSqueezy.
          </TypographyP>
          <TypographyP>
            4.3. Payment records are retained even if analyses are deleted for
            legal and accounting purposes.
          </TypographyP>
          <TypographyH3>4.4. Refund Policy:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Full refunds are provided for technical issues (e.g., loading
              screen failures)
            </li>
            <li>
              No refunds are available after successful analysis generation
            </li>
            <li>
              No refunds will be provided for analyses removed due to using
              photos that do not belong to you
            </li>
            <li>
              No refunds will be provided for account bans or restrictions due
              to terms violations
            </li>
            <li>
              Refund requests must be submitted to aestheticrank@gmail.com
            </li>
          </ul>
        </section>

        <Separator />

        {/* 5. Privacy and Data Usage */}
        <section className="space-y-4">
          <TypographyH2>5. Privacy and Data Usage</TypographyH2>
          <TypographyH3>5.1. Photo Usage:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your photos are used solely for generating your analysis</li>
            <li>Photos are not used for AI training</li>
            <li>Photos are processed securely</li>
            <li>You maintain ownership of your photos</li>
            <li>You must only submit photos that belong to you</li>
          </ul>
          <TypographyH3>5.2. Data Control:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You can delete your analysis, photos, or entire account at any
              time
            </li>
            <li>Deleted data cannot be recovered</li>
            <li>Public analyses appear in rankings until deleted</li>
            <li>
              Due to caching, deleted analyses may remain visible in rankings
              for up to 30 minutes
            </li>
            <li>
              When changing an analysis from private to public, it will be
              cached for 30 minutes. If you change it back to private during
              this period, it will still remain visible in public rankings until
              the cache is refreshed (up to 30 minutes)
            </li>
            <li>
              Payment records are retained for legal and accounting purposes
              even after analysis deletion
            </li>
          </ul>
        </section>

        <Separator />

        {/* 6. Content Guidelines */}
        <section className="space-y-4">
          <TypographyH2>6. Content Guidelines</TypographyH2>
          <TypographyH3>6.1. Prohibited Content:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Explicit or inappropriate content</li>
            <li>Heavily edited or manipulated photos</li>
            <li>Blurry or unclear images</li>
            <li>Content that violates others&apos; privacy</li>
            <li>Photos must be recent (taken within last 30 days)</li>
            <li>Photos that do not belong to you</li>
          </ul>
          <TypographyP>
            6.2. We reserve the right to remove content that violates these
            guidelines without providing refunds.
          </TypographyP>
        </section>

        <Separator />

        {/* 7. Public Analysis and Rankings */}
        <section className="space-y-4">
          <TypographyH2>7. Public Analysis and Rankings</TypographyH2>
          <TypographyP>
            7.1. You can choose to make your analysis public or private
          </TypographyP>
          <TypographyH3>7.2. Public analyses:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Appear in public rankings</li>
            <li>Are visible to all users</li>
            <li>Can be shared via public URLs</li>
            <li>
              May remain visible for up to 30 minutes after deletion or privacy
              changes due to caching
            </li>
          </ul>
          <TypographyP>
            7.3. Private analyses are only visible to you
          </TypographyP>
          <TypographyH3>7.4. Ranking System:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Rankings are updated in real-time</li>
            <li>Tier classifications range from Iron to Supreme</li>
            <li>Rankings are based on overall aesthetic scores</li>
            <li>Users can filter rankings by various criteria</li>
            <li>Ranking position may fluctuate as new analyses are added</li>
          </ul>
        </section>

        <Separator />

        {/* 8. Service Limitations */}
        <section className="space-y-4">
          <TypographyH2>8. Service Limitations</TypographyH2>
          <TypographyH3>8.1. Analysis Accuracy:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Results are based on AI evaluation</li>
            <li>No guarantee of 100% accuracy</li>
            <li>Results are for informational purposes only</li>
            <li>Not a substitute for professional medical advice</li>
            <li>
              Analysis quality depends on photo quality and adherence to photo
              guidelines
            </li>
            <li>
              Results may vary based on lighting conditions and photo angles
            </li>
          </ul>
          <TypographyH3>8.2. Service Availability:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              We strive for 24/7 availability but don&apos;t guarantee
              uninterrupted service
            </li>
            <li>We may modify or discontinue features without notice</li>
          </ul>
        </section>

        <Separator />

        {/* 9. Account Termination */}
        <section className="space-y-4">
          <TypographyH2>9. Account Termination</TypographyH2>
          <TypographyP>
            9.1. You may delete your account at any time
          </TypographyP>
          <TypographyP>
            9.2. All analyses must be deleted before account deletion
          </TypographyP>
          <TypographyH3>9.3. We may terminate accounts that:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violate these terms</li>
            <li>Engage in fraudulent activity</li>
            <li>Abuse the service</li>
            <li>Submit photos that do not belong to them</li>
          </ul>
          <TypographyP>
            9.4. No refunds will be provided for terminated accounts
          </TypographyP>
        </section>

        <Separator />

        {/* 10. Support and Communication */}
        <section className="space-y-4">
          <TypographyH2>10. Support and Communication</TypographyH2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Support requests must be sent to aestheticrank@gmail.com</li>
            <li>Response time is typically within 24 hours on business days</li>
            <li>
              Support communication must be from your registered email address
            </li>
          </ul>
        </section>

        <Separator />

        {/* 11. Changes to Terms */}
        <section className="space-y-4">
          <TypographyH2>11. Changes to Terms</TypographyH2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We reserve the right to modify these terms at any time</li>
            <li>
              Continued use of the Service constitutes acceptance of modified
              terms
            </li>
            <li>Major changes will be communicated via email</li>
          </ul>
        </section>

        <Separator />

        {/* 12. Limitation of Liability */}
        <section className="space-y-4">
          <TypographyH2>12. Limitation of Liability</TypographyH2>
          <TypographyP>
            12.1. The Service is provided &quot;as is&quot; without warranties
          </TypographyP>
          <TypographyH3>12.2. We are not liable for:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accuracy of analysis results</li>
            <li>Data loss or security breaches</li>
            <li>Service interruptions</li>
            <li>Indirect or consequential damages</li>
          </ul>
          <TypographyH3>12.3. Additional Disclaimers:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              We are not responsible for any decisions made based on analysis
              results
            </li>
            <li>
              The Service is not intended to diagnose, treat, cure, or prevent
              any health condition
            </li>
            <li>
              Results should not be used as a substitute for professional
              athletic or medical advice
            </li>
            <li>
              We do not guarantee specific outcomes or improvements in physical
              appearance
            </li>
          </ul>
        </section>

        <Separator />

        {/* 13. Governing Law */}
        <section className="space-y-4">
          <TypographyH2>13. Governing Law</TypographyH2>
          <TypographyP>
            These terms are governed by Turkish law. Any disputes shall be
            resolved in the courts of Turkey. By using this service, you consent
            to the jurisdiction and venue of such courts.
          </TypographyP>
        </section>

        <Separator />

        <section className="space-y-4">
          <TypographyH2>14. Third-Party Services</TypographyH2>
          <TypographyP>
            The Service may integrate with or contain links to third-party
            services or websites. We are not responsible for any third-party
            services, and your use of such services is at your own risk.
          </TypographyP>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment processing is handled by LemonSqueezy</li>
            <li>Authentication services may be provided by Google</li>
            <li>
              Image storage and processing utilizes Cloudflare R2 cloud storage
              services
            </li>
          </ul>
        </section>

        <Separator />

        {/* Contact Section */}
        <section className="space-y-4">
          <TypographyH2>Contact</TypographyH2>
          <TypographyP>
            For questions about these Terms, contact us at{" "}
            <a
              href="mailto:aestheticrank@gmail.com"
              className="text-primary hover:underline"
            >
              aestheticrank@gmail.com
            </a>
          </TypographyP>
        </section>
      </Card>
    </div>
  );
}
