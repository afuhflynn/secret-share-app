"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  async function resendVerificationEmail() {
    setIsResending(true);

    try {
      // In a real app, you would call your API to resend the verification email
      // const response = await fetch("/api/auth/resend-verification", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to resend verification email")
      // }

      setResendSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center text-sm font-medium md:left-8 md:top-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Check your email
          </h1>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a verification link and code to{" "}
            {email || "your email"}
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <CheckCircle className="h-12 w-12 text-primary" />
              <div className="space-y-2">
                <p>Click the link in the email to verify your account.</p>
                <p className="text-sm text-muted-foreground">
                  If you don&apos;t see the email, check your spam folder.
                </p>
              </div>
              <Button className="w-full" asChild>
                <Link href="/auth/verify-email">Proceed with code.</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={resendVerificationEmail}
                disabled={isResending || resendSuccess}
              >
                {isResending
                  ? "Sending..."
                  : resendSuccess
                  ? "Email sent!"
                  : "Resend verification email"}
              </Button>
            </div>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground">
          <Link
            href="/auth/log-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
