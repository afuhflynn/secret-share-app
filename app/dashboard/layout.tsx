import Navbar from "@/components/dashboard-navbar";
import authConfig from "@/lib/auth.config";
import { Metadata } from "next";
import NextAuth from "next-auth";

export const generateMetadata = async (): Promise<Metadata> => {
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  return {
    title: `${session?.user.name} | SecretShare`,
    description: `${session?.user.name}'s dashboard at SecretShare. Create, modify and share secrets.`,
  };
};

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
