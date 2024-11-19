import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-muted/10">
      <nav className="flex items-center justify-between px-6 py-4 bg-background border-b">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">Aesthetic AI</span>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
