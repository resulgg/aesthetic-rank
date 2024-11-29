import { Metadata } from "next";
import LoginPage from "@/components/auth/login";

export const metadata: Metadata = {
  title: "Sign In | Aesthetic Rank",
  description:
    "Sign in to your Aesthetic Rank account to access your personalized and analytics.",
  openGraph: {
    title: "Sign In | Aesthetic Rank",
    description:
      "Sign in to your Aesthetic Rank account to access your personalized and analytics.",
    type: "website",
  },
};

const Page = () => {
  return <LoginPage />;
};

export default Page;
