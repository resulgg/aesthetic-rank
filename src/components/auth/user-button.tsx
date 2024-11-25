"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/nav-links";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import ThemeToggle from "../theme-toggle";

const UserButton = () => {
  const { data: session } = useSession();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    setDialogOpen(false);
  };

  return (
    <ResponsiveDialog
      trigger={
        <Avatar className="h-12 w-12 cursor-pointer rounded-full">
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback>
            {`${session?.user?.name?.split(" ")[0]?.[0] || "💪"}${
              session?.user?.name?.split(" ")[1]?.[0] || ""
            }`}
          </AvatarFallback>
        </Avatar>
      }
      title={"Menu"}
      open={isDialogOpen}
      onOpenChange={setDialogOpen}
      className="w-full max-w-md"
    >
      <div className="flex flex-col gap-4 pt-4">
        <div className="flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Button
              key={href}
              variant="outline"
              asChild
              onClick={() => setDialogOpen(false)}
              className="w-full"
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </div>
        <ThemeToggle />
        <Button
          onClick={handleLogout}
          className="text-white dark:text-foreground bg-destructive hover:bg-destructive/80 h-14 w-full text-lg"
        >
          Logout
        </Button>
      </div>
    </ResponsiveDialog>
  );
};

export default UserButton;
