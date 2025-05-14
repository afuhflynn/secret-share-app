"use server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SignInForm } from "@/components/sign-in-form";
import { AuthSocials } from "@/components/auth-socials";
import Logo from "@/components/logo";

export default async function LoginPage() {
  return (
    <div className="container flex flex-col items-center justify-center w-full h-full py-8 overflow-x-hidden">
      <Link
        href="/"
        className="absolute flex items-center text-sm font-medium left-4 top-4 md:left-8 md:top-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Logo hideText />
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
