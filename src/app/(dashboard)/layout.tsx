import Navbar from "@/components/layout/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-3 space-y-6 mb-10">
      <Navbar />
      <main className="flex-1 pt-4 px-2">{children}</main>
    </div>
  );
}
