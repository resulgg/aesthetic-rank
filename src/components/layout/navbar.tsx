import Link from "next/link";
import { ChartNoAxesColumnIncreasingIcon } from "lucide-react";
import UserButton from "@/components/auth/user-button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-background z-50">
      <Link
        href="/"
        className="text-base md:text-2xl font-extrabold p-2 border-b-4 border-b-green-700 rounded-none flex items-center gap-2"
      >
        <ChartNoAxesColumnIncreasingIcon className="h-6 w-6" />
        AR
      </Link>
      <div className="flex items-center">
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
