import Navbar from "@/components/layout/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Navbar />
      <main className="flex-1 pt-4">{children}</main>
    </div>
  );
}
