"use client";

import Navbar from "@/components/dashboard-navbar";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { getUserProfile, isAuthenticated, user } = useUserStore();

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-hidden bg-muted/40">
        <div className="container py-6 md:py-8">{children}</div>
      </main>
    </div>
  );
}
