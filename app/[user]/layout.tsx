import Navbar from "@/components/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-hidden bg-muted/40">
        <div className="container py-6 md:py-8">{children}</div>
      </main>
    </div>
  );
}
