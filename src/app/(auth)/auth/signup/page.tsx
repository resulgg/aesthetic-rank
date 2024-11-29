import { Metadata } from "next";
import SignUpPage from "@/components/auth/sign-up";

export const metadata: Metadata = {
  title: "Sign Up | Aesthetic Rank",
  description:
    "Create your Aesthetic Rank account to access personalized AI-powered physique analysis and join our community.",
  openGraph: {
    title: "Sign Up | Aesthetic Rank",
    description:
      "Create your Aesthetic Rank account to access personalized AI-powered physique analysis and join our community.",
    type: "website",
  },
};

const Page = () => {
  return <SignUpPage />;
};

export default Page;
