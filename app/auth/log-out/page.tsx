"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

import { useDemoAuth } from "@/components/providers/demo-auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LogoutPage() {
  const router = useRouter();
  const { signOut, user } = useDemoAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sign out
      signOut();

      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary/10">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Log Out</h1>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to log out of your account?
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <Button onClick={handleLogout} disabled={isLoading}>
                {isLoading ? "Logging out..." : "Yes, Log Me Out"}
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/${user?.name}/dashboard`}>Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
