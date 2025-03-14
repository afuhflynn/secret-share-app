"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Lock, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function VerifyEmailTokenPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    async function verifyToken() {
      try {
        // In a real app, you would call your API to verify the token
        // const response = await fetch(`/api/auth/verify-email?token=${token}`, {
        //   method: "GET",
        // })

        // if (!response.ok) {
        //   throw new Error("Invalid or expired token")
        // }

        // For demo purposes, we'll simulate a successful verification
        setTimeout(() => {
          setVerificationStatus("success");
        }, 1500);
      } catch (error) {
        console.error(error);
        setVerificationStatus("error");
      }
    }

    if (token) {
      verifyToken();
    } else {
      setVerificationStatus("error");
    }
  }, [token]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Email Verification
          </h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              {verificationStatus === "loading" && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p>Verifying your email...</p>
                </div>
              )}

              {verificationStatus === "success" && (
                <div className="flex flex-col items-center space-y-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                  <div className="space-y-2">
                    <p className="text-xl font-semibold">
                      Email verified successfully!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Your email has been verified. You can now log in to your
                      account.
                    </p>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => router.push("/auth/log-in")}
                  >
                    Go to Login
                  </Button>
                </div>
              )}

              {verificationStatus === "error" && (
                <div className="flex flex-col items-center space-y-4">
                  <XCircle className="h-12 w-12 text-destructive" />
                  <div className="space-y-2">
                    <p className="text-xl font-semibold">Verification failed</p>
                    <p className="text-sm text-muted-foreground">
                      The verification link is invalid or has expired.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/auth/log-in")}
                  >
                    Back to Login
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
