import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  url: string;
  host: string;
}

export default function LoginEmail({ url, host }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Sign in to {host}</Preview>
      <Tailwind>
        <Body className="bg-zinc-100 font-sans">
          <Container className="mx-auto py-8 px-4">
            <Section className="bg-zinc-100 border border-zinc-300 rounded-lg p-8 shadow-sm">
              <Heading className="text-2xl font-bold text-zinc-700 mb-4">
                Welcome to {host}
              </Heading>

              <Text className="text-zinc-600 mb-6">
                Click the button below to sign in to your account. This link
                will expire in 24 hours.
              </Text>

              <Button
                className="bg-zinc-700 text-white px-6 py-3 rounded-md font-medium"
                href={url}
              >
                Sign in to {host}
              </Button>

              <Text className="text-sm text-zinc-600 mt-4">
                Or copy and paste this URL into your browser:{" "}
                <Link href={url} className="text-zinc-700">
                  {url}
                </Link>
              </Text>
              <Text className="text-sm text-zinc-600 mt-6">
                If you didn&apos;t request this email, you can safely ignore it.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
