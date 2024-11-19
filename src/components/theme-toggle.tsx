"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-full h-14"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <div className="flex items-center gap-4 text-lg">
        {theme === "light" ? (
          <>
            <Sun className="h-[1.2rem] w-[1.2rem]" />
            <span>Change to Dark Theme</span>
          </>
        ) : (
          <>
            <Moon className="h-[1.2rem] w-[1.2rem]" />
            <span>Change to Light Theme</span>
          </>
        )}
      </div>
    </Button>
  );
};

export default ThemeToggle;
