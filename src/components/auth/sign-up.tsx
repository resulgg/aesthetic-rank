import Link from "next/link";
import SignupWithEmail from "@/components/auth/signup-with-email";
import SignupWithGoogle from "@/components/auth/signup-with-google";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SignUpPage = () => {
  return (
    <Card className="w-full max-w-lg shadow-lg bg-muted/50">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold">Create an account</CardTitle>
        <CardDescription className="md:px-12">
          Sign up to discover your ranking and receive comprehensive AI body
          analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SignupWithEmail />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-muted rounded-lg px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>

        <SignupWithGoogle />

        <p className="text-xs text-center text-muted-foreground px-8 md:px-0">
          By continuing, you agree to our{" "}
          <Link href="/terms-of-service" className="text-primary underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="text-primary underline">
            Privacy Policy
          </Link>
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
