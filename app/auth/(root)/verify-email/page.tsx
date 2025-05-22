"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/back-button";
import Logo from "@/components/logo";
import { useUserStore } from "@/store/user.store";
import { Loader } from "@/components/ui/loading";
import { toast } from "@/hooks/use-toast";
import { devLog } from "@/utils/devLog";
import { ResendVerificationEmail } from "@/components/resend-verification-email";
import { localStorageKey } from "@/lib/constants";

export default function VerifyEmailTokenPage() {
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [verificationCode, setVerificationCode] = useState("");

  const { error, setError, setMessage, message, verifyEmail, loading } =
    useUserStore();
  // Helps to display the pop ups when they are needed
  const [isSubmitted, setIsSubmitted] = useState(false);

  // clear the error and message and redirect the user to verify email page
  useEffect(() => {
    setMessage(null);
    setError(null);
  }, [setMessage, setError]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setVerificationStatus("loading");
    setIsSubmitted(false);

    try {
      verifyEmail(verificationCode); // Call backend signup
      setIsSubmitted(true);
    } catch (error) {
      devLog(error);
    }
  }

  // Display success or failure toast
  useEffect(() => {
    if (message && message !== null && error === null && isSubmitted) {
      if (message !== null)
        toast({
          title: "Email verified",
          description: " Email verified successfully!",
        });
      localStorage.removeItem(localStorageKey);
      setVerificationStatus("success");
    } else {
      if (error !== null && isSubmitted)
        toast({
          title: "Error verifying your email",
          description:
            error ||
            "An error occurred verifying your email. Please try again later!",
          variant: "destructive",
        });
      setVerificationStatus("error");
    }
  }, [message, error]);

  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen">
      <BackButton />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Logo hideText />
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
            onSubmit={onSubmit}
          >
            <CardContent className="w-full pt-6">
              {verificationStatus === "success" && (
                <div className="flex flex-col items-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
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

              {verificationStatus === "error" && error && (
                <div className="flex flex-col items-center mb-6 space-y-4">
                  <XCircle className="w-12 h-12 text-destructive" />
                  <div className="space-y-2">
                    <p className="text-xl font-semibold">Verification failed</p>
                    <p className="text-sm text-muted-foreground">
                      The verification code is invalid or has expired.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/auth/sign-up")}
                    type="button"
                  >
                    Back to Signup
                  </Button>
                </div>
              )}
              {verificationStatus !== "success" && (
                <div className="w-full space-y-4">
                  <div className="w-full space-y-2 text-left">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      type="number"
                      placeholder="000000"
                      inputMode="numeric"
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader /> : "Verify email"}
                </Button>
              </CardFooter>
            )}
          </form>
        </Card>
        {verificationStatus !== "success" && <ResendVerificationEmail />}
      </div>
    </div>
  );
}
