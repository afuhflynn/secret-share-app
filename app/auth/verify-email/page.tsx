"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Lock, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function VerifyEmailTokenPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [verificationCode, setVerificationCode] = useState("");

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (verificationCode) {
      verifyToken();
    } else {
      setVerificationStatus("error");
    }
  };

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
          <p className="text-sm text-muted-foreground">
            Enter the 6 digit verification code sent to your inbox below.
          </p>
        </div>
        <Card>
          <form
            className="flex flex-col items-center justify-center space-y-2 text-center"
            onSubmit={handleSubmit}
          >
            <CardContent className="pt-6 w-full">
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
                    type="button"
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
                    type="button"
                  >
                    Back to Login
                  </Button>
                </div>
              )}
              {verificationStatus !== "success" && (
                <div className="space-y-4 w-full">
                  <div className="space-y-2 text-left w-full">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      type="number"
                      placeholder="000000"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
            </CardContent>
            {verificationStatus !== "success" && (
              <CardFooter className="w-full">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying email..." : "Verify email"}
                </Button>
              </CardFooter>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
