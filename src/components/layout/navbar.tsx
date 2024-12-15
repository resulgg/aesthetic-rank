import Link from "next/link";
import { auth } from "@/auth";
import UserButton from "@/components/auth/user-button";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex items-center justify-between z-50 border border-border bg-muted/50 rounded-lg p-4">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center">
        {session ? (
          <UserButton />
        ) : (
          <Button
            variant="default"
            className="h-12 font-semibold"
            asChild
            data-umami-event="Get Started"
          >
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
