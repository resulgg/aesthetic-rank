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

const LoginPage = () => {
  return (
    <Card className="w-full max-w-lg shadow-lg bg-muted/50">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
        <CardDescription>Log in to your Aesthetic Rank account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SignupWithEmail />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-muted rounded-lg px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <SignupWithGoogle />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
