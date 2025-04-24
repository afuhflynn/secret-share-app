"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDemoAuth } from "@/components/providers/demo-auth-provider";
import { SignInForm } from "@/components/sign-in-form";
import { AuthSocials } from "@/components/auth-socials";

export default function LoginPage() {
  const router = useRouter();
  const [isDevelopment, setIsDevelopment] = useState(false);
  const { user } = useDemoAuth();

  useEffect(() => {
    // Check if we're in development mode
    setIsDevelopment(process.env.NODE_ENV === "development");
  }, []);

  function handleDevModeAccess() {
    router.push(`/${user?.name}/dashboard`);
  }

  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen py-4 overflow-x-hidden">
      <Link
        href="/"
        className="absolute flex items-center text-sm font-medium left-4 top-4 md:left-8 md:top-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {isDevelopment && (
          <div className="relative px-4 py-3 text-yellow-800 bg-yellow-100 border border-yellow-400 rounded">
            <strong className="font-bold">Development Mode</strong>
            <p className="mt-1 text-sm">
              You can access all pages without authentication in development
              mode.
            </p>
            <Button
              className="w-full mt-2 text-black bg-yellow-500 hover:bg-yellow-600"
              onClick={handleDevModeAccess}
            >
              Skip Login (Dev Mode)
            </Button>
          </div>
        )}

        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary/10">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        <Card>
          <SignInForm />
        </Card>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-background text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <AuthSocials />

        <p className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
