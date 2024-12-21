import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyH3 } from "@/components/typography/typography-h3";
import { TypographyP } from "@/components/typography/typography-p";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Privacy Policy - AestheticRank",
  description: "Privacy Policy and data handling practices for AestheticRank",
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div className="space-y-4">
        <TypographyH1>Privacy Policy</TypographyH1>
        <TypographyP className="text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString()}
        </TypographyP>
      </div>

      <Card className="p-6 space-y-8">
        {/* 1. Introduction */}
        <section className="space-y-4">
          <TypographyH2>1. Introduction</TypographyH2>
          <TypographyP>
            At AestheticRank, we take your privacy seriously. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you use our service.
          </TypographyP>
        </section>

        <Separator />

        {/* 2. Information We Collect */}
        <section className="space-y-4">
          <TypographyH2>2. Information We Collect</TypographyH2>
          <TypographyH3>2.1. Information you provide:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email address and authentication information</li>
            <li>Photos uploaded for analysis</li>
            <li>Profile information (if provided)</li>
            <li>Payment information (processed by LemonSqueezy)</li>
          </ul>

          <TypographyH3>2.2. Information automatically collected:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Device information (screen size, device type)</li>
            <li>Browser type</li>
            <li>
              Page views and interactions (via self-hosted Plausible Analytics)
            </li>
            <li>Referring website</li>
            <li>Country (derived from anonymized IP)</li>
          </ul>
          <TypographyP className="mt-4 text-sm text-muted-foreground">
            Note: All analytics data is anonymized and collected using our
            self-hosted Plausible Analytics instance, a privacy-focused platform
            that does not store personal information or use cookies. Analytics
            data never leaves our control and is stored on our own servers.
          </TypographyP>
        </section>

        <Separator />

        {/* 3. How We Use Your Information */}
        <section className="space-y-4">
          <TypographyH2>3. How We Use Your Information</TypographyH2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our Service</li>
            <li>To process your physique analysis</li>
            <li>To process your payments</li>
            <li>To communicate with you about service updates</li>
            <li>To provide customer support</li>
            <li>To detect and prevent fraud</li>
          </ul>
        </section>

        <Separator />

        {/* 4. Photo Usage and Storage */}
        <section className="space-y-4">
          <TypographyH2>4. Photo Usage and Storage</TypographyH2>
          <TypographyH3>4.1. Photo Processing:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Photos are used solely for generating your analysis</li>
            <li>Photos are processed using secure AI systems</li>
            <li>Photos are not used for AI training</li>
            <li>Photos are stored using Cloudflare R2 cloud storage</li>
          </ul>

          <TypographyH3>4.2. Photo Retention:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Photos are retained while your analysis is active</li>
            <li>Photos are deleted when you delete your analysis</li>
            <li>Backup copies may be retained for up to 30 days</li>
          </ul>
        </section>

        <Separator />

        {/* 5. Data Sharing */}
        <section className="space-y-4">
          <TypographyH2>5. Data Sharing</TypographyH2>
          <TypographyP>We share your data with:</TypographyP>
          <ul className="list-disc pl-6 space-y-2">
            <li>LemonSqueezy for payment processing</li>
            <li>Google for authentication (if using Google sign-in)</li>
            <li>Cloudflare for image storage and processing</li>
            <li>OpenAI for physique analysis and AI processing</li>
          </ul>
          <TypographyP>
            We do not sell or rent your personal information to third parties.
          </TypographyP>
          <TypographyH3>5.1. Third-Party Data Processing:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              OpenAI: Your photos are processed by OpenAI&apos;s API to generate
              physique analysis. Photos are not stored by OpenAI and are only
              used for real-time analysis. OpenAI does not use your photos for
              AI model training.
            </li>
            <li>
              LemonSqueezy: Handles payment processing and stores necessary
              transaction records.
            </li>
            <li>
              Google: Provides authentication services if you choose to sign in
              with Google.
            </li>
            <li>
              Cloudflare: Stores your photos and analysis data in secure cloud
              storage.
            </li>
          </ul>
          <TypographyP className="mt-4">
            All third-party services we use are compliant with applicable data
            protection regulations. We have data processing agreements in place
            with these providers to ensure the security and privacy of your
            information.
          </TypographyP>
        </section>

        <Separator />

        {/* 6. Data Security */}
        <section className="space-y-4">
          <TypographyH2>6. Data Security</TypographyH2>
          <TypographyP>
            We implement appropriate security measures to protect your data:
          </TypographyP>
          <ul className="list-disc pl-6 space-y-2">
            <li>Secure HTTPS encryption</li>
            <li>Secure cloud storage</li>
            <li>Regular security audits</li>
            <li>Access controls and authentication</li>
          </ul>
        </section>

        <Separator />

        {/* 7. Your Rights */}
        <section className="space-y-4">
          <TypographyH2>7. Your Rights</TypographyH2>
          <TypographyP>You have the right to:</TypographyP>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Delete your data</li>
            <li>Request data portability</li>
            <li>Opt-out of marketing communications</li>
            <li>Make your analyses private or public</li>
          </ul>
        </section>

        <Separator />

        {/* 8. Cookies and Tracking */}
        <section className="space-y-4">
          <TypographyH2>8. Cookies and Tracking</TypographyH2>
          <TypographyP>
            We use essential cookies and privacy-focused analytics:
          </TypographyP>

          <TypographyH3>8.1. Essential Cookies:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Authentication and session management</li>
            <li>Security and fraud prevention</li>
            <li>User preferences and settings</li>
          </ul>

          <TypographyH3>8.2. Analytics:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              We use self-hosted Plausible Analytics, a privacy-focused
              analytics platform
            </li>
            <li>
              Our Plausible instance is hosted on our own servers, ensuring data
              stays within our control
            </li>
            <li>Plausible does not use cookies</li>
            <li>Plausible does not collect any personal information</li>
            <li>Plausible does not track users across websites</li>
            <li>All data is anonymized</li>
            <li>IP addresses are not stored</li>
          </ul>

          <TypographyP className="mt-4">
            We do not use any third-party tracking cookies or advertising
            cookies. We respect the &quot;Do Not Track&quot; browser setting.
          </TypographyP>
        </section>

        <Separator />

        {/* 9. Children's Privacy */}
        <section className="space-y-4">
          <TypographyH2>9. Children&apos;s Privacy</TypographyH2>
          <TypographyP>
            Our Service is not intended for users under 18 years of age. We do
            not knowingly collect or maintain information from persons under 18.
          </TypographyP>
        </section>

        <Separator />

        {/* 10. Changes to Privacy Policy */}
        <section className="space-y-4">
          <TypographyH2>10. Changes to Privacy Policy</TypographyH2>
          <TypographyP>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the &quot;Last Updated&quot; date.
          </TypographyP>
        </section>

        <Separator />

        <section className="space-y-4">
          <TypographyH2>11. GDPR and KVKK Compliance</TypographyH2>
          <TypographyP>
            We comply with both the European Union&apos;s General Data
            Protection Regulation (GDPR) and Turkey&apos;s Personal Data
            Protection Law (KVKK).
          </TypographyP>
          <ul className="list-disc pl-6 space-y-2">
            <li>Right to access your personal data</li>
            <li>Right to rectify inaccurate personal data</li>
            <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Rights related to automated decision making</li>
          </ul>
          <TypographyP className="mt-4">
            To exercise these rights, please contact us at
            aestheticrank@gmail.com. We will respond to your request within 30
            days.
          </TypographyP>
        </section>

        <Separator />
        <section className="space-y-4">
          <TypographyH2>12. Data Breach Notification</TypographyH2>
          <TypographyP>
            In the event of a data breach that affects your personal
            information, we will:
          </TypographyP>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Notify you via email within 72 hours of becoming aware of the
              breach
            </li>
            <li>Provide information about what data was affected</li>
            <li>Explain the potential consequences of the breach</li>
            <li>
              Inform you about the measures we are taking to address the breach
            </li>
            <li>Provide recommendations about steps you should take</li>
          </ul>
        </section>
        <Separator />
        <section className="space-y-4">
          <TypographyH2>13. AI Processing</TypographyH2>
          <TypographyP>
            Our Service uses artificial intelligence to analyze physique photos.
            Here&apos;s how AI processing works:
          </TypographyP>
          <ul className="list-disc pl-6 space-y-2">
            <li>Photos are processed using OpenAI&apos;s API</li>
            <li>AI processing is automated and occurs in real-time</li>
            <li>No human review of your photos takes place</li>
            <li>Photos are not used to train AI models</li>
            <li>AI analysis results are stored securely with your account</li>
            <li>
              You can request deletion of AI-generated analysis at any time
            </li>
          </ul>
          <TypographyP className="mt-4">
            While we strive for accuracy in our AI analysis, results should be
            considered as estimates and not definitive measurements.
          </TypographyP>
        </section>
        <Separator />
        <section className="space-y-4">
          <TypographyH2>14. Cache Policy</TypographyH2>
          <TypographyP>
            To improve performance and user experience, we implement caching:
          </TypographyP>
          <ul className="list-disc pl-6 space-y-2">
            <li>Public analyses are cached for up to 30 minutes</li>
            <li>
              When changing privacy settings (public/private), changes may take
              up to 30 minutes to reflect
            </li>
            <li>
              Deleted analyses may remain visible in rankings for up to 30
              minutes due to caching
            </li>
            <li>
              Profile information updates may take up to 5 minutes to reflect
            </li>
          </ul>
        </section>

        <Separator />

        <section className="space-y-4">
          <TypographyH2>15. California Privacy Rights</TypographyH2>
          <TypographyP>
            If you are a California resident, you have specific rights under the
            California Consumer Privacy Act (CCPA):
          </TypographyP>

          <TypographyH3>15.1. Your Rights:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Right to know what personal information we collect</li>
            <li>
              Right to know whether your personal information is sold or
              disclosed
            </li>
            <li>
              Right to say &quot;no&quot; to the sale of personal information
            </li>
            <li>Right to access your personal information</li>
            <li>Right to delete your personal information</li>
            <li>
              Right to equal service and price, even if you exercise your
              privacy rights
            </li>
          </ul>

          <TypographyH3>
            15.2. Categories of Information We Collect:
          </TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Identifiers (email address)</li>
            <li>Photos you upload</li>
            <li>Payment information</li>
            <li>Usage data and analytics</li>
            <li>Device information</li>
          </ul>

          <TypographyH3>
            15.3. &quot;Do Not Sell My Personal Information&quot;:
          </TypographyH3>
          <TypographyP>
            We do not sell your personal information. However, we do share data
            with certain third-party service providers to operate our Service:
          </TypographyP>
          <ul className="list-disc pl-6 space-y-2">
            <li>OpenAI (for photo analysis)</li>
            <li>Cloudflare R2 (for photo storage)</li>
            <li>LemonSqueezy (for payment processing)</li>
            <li>
              Google (for authentication, if you choose to use Google sign-in)
            </li>
          </ul>

          <TypographyH3>15.4. Exercising Your Rights:</TypographyH3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You can request your data by emailing aestheticrank@gmail.com
            </li>
            <li>We will respond to verified requests within 45 days</li>
            <li>
              You may need to verify your identity to process your request
            </li>
            <li>You can make requests up to twice in a 12-month period</li>
          </ul>

          <TypographyH3>15.5. Non-Discrimination:</TypographyH3>
          <TypographyP>
            We will not discriminate against you for exercising your CCPA
            rights. We will not:
          </TypographyP>
          <ul className="list-disc pl-6 space-y-2">
            <li>Deny you services</li>
            <li>Charge you different prices</li>
            <li>Provide you with a different level of service</li>
            <li>Suggest you may receive different prices or service</li>
          </ul>

          <TypographyP className="mt-4">
            To exercise your California privacy rights or if you have questions,
            please contact us at{" "}
            <a
              href="mailto:aestheticrank@gmail.com"
              className="text-primary hover:underline"
            >
              aestheticrank@gmail.com
            </a>
          </TypographyP>

          <TypographyP className="mt-4 text-sm text-muted-foreground">
            Note: Only verified California residents can make CCPA privacy
            requests.
          </TypographyP>
        </section>
        {/* Contact Section */}
        <section className="space-y-4">
          <TypographyH2>Contact</TypographyH2>
          <TypographyP>
            For questions about this Privacy Policy, contact us at{" "}
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
