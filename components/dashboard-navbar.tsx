import { Lock } from "lucide-react";
import Link from "next/link";
import { UserAccountNav } from "./user-account-nav";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useDemoAuth } from "@/components/providers/demo-auth-provider";
import Logo from "./logo";
import { ThemeToggle } from "./theme-toggle";

// Function to check if we're in development mode
const isDevelopment = () => {
  if (typeof window !== "undefined") {
    // Client-side check
    return process.env.NODE_ENV === "development";
  }
  return false;
};

const Navbar: React.FC = () => {
  const { user, isLoading } = useDemoAuth();
  const router = useRouter();
  const [devMode, setDevMode] = useState(false);
  // In development mode, we'll show the dashboard even without authentication
  const displayUser =
    user ||
    (devMode
      ? { name: "Dev User", email: "dev@example.com", image: null }
      : null);

  if (!displayUser && !devMode) {
    return null;
  }

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
      window.location.reload();
    }
  }, [user]);

  useEffect(() => {
    // Set development mode state
    setDevMode(isDevelopment());

    // In development mode, we don't need to redirect
    if (isDevelopment()) {
      return;
    }

    // Only redirect if not in development mode and not authenticated
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container flex items-center justify-between h-16">
        <Logo />
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link
            href={`/${displayUser?.name}/dashboard`}
            className="text-sm font-medium"
          >
            Dashboard
          </Link>
          <Link
            href={`/${displayUser?.name}/dashboard/create`}
            className="text-sm font-medium"
          >
            Create Secret
          </Link>
          <Link
            href={`/${displayUser?.name}/dashboard/settings`}
            className="text-sm font-medium"
          >
            Settings
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserAccountNav user={displayUser} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
