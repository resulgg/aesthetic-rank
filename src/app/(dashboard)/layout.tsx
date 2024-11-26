import Navbar from "@/components/layout/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-3 space-y-6 mb-2">
      <Navbar />
      <main className="flex-1 px-2 mb-6">{children}</main>
    </div>
  );
}
