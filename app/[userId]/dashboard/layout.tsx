"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  DemoAuthProvider,
  useDemoAuth,
} from "@/components/providers/demo-auth-provider";
import Navbar from "@/components/navbar";

// Function to check if we're in development mode
const isDevelopment = (): boolean => {
  if (typeof window !== "undefined") {
    // Client-side check
    return process.env.NODE_ENV === "development";
  }
  return false;
};

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useDemoAuth();
  const router = useRouter();
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    // Set development mode state
    setDevMode(isDevelopment());

    // In development mode, we don't need to redirect
    if (isDevelopment()) {
      return;
    }

    // Only redirect if not in development mode and not authenticated
    if (!isLoading && !user) {
      router.push("/auth/log=in");
    }
  }, [user, isLoading, router]);

  // In development mode, create a demo user if none exists
  useEffect(() => {
    if (isDevelopment() && !user) {
      // Create a demo user for development
      const demoUser = {
        name: "Dev User",
        email: "dev@example.com",
        image: null,
      };
      localStorage.setItem("demoUser", JSON.stringify(demoUser));
    }
  }, [user]);

  if (isLoading && !isDevelopment()) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // In development mode, we'll show the dashboard even without authentication
  const displayUser =
    user ||
    (devMode
      ? { name: "Dev User", email: "dev@example.com", image: null }
      : null);

  if (!displayUser && !devMode) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {devMode && (
        <div className="bg-yellow-500 text-black px-4 py-1 text-center text-sm">
          Development Mode: Authentication bypassed
        </div>
      )}
      <Navbar />
      <main className="flex-1 bg-muted/40">
        <div className="container py-6 md:py-8">{children}</div>
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoAuthProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DemoAuthProvider>
  );
}
