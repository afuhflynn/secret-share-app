"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BackButton } from "@/components/back-button";
import Logo from "@/components/logo";
import { useUserStore } from "@/store/user.store";
import { signOutAction } from "@/actions/log-out";

export default function LogoutPage() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sign out
      signOutAction();

      // Redirect to home page
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen">
      <BackButton />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary/10">
            <Logo hideText />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Log Out</h1>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to log out of your account?
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <Button
                onClick={handleLogout}
                disabled={isLoading}
                variant={"destructive"}
              >
                {isLoading ? "Logging out..." : "Yes, Log Me Out"}
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/${user?.name}`}>Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
