"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/logo";
import { Loading } from "@/components/ui/loading";
import { useUserStore } from "@/store/user.store";
import { toast } from "@/hooks/use-toast";
import { localStorageKey } from "@/lib/constants";
import { ResendVerificationEmail } from "@/components/resend-verification-email";
import { devLog } from "@/utils/devLog";

export default function VerifyEmailTokenPage() {
  const router = useRouter();
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const { error, setError, setMessage, message, verifyEmailToken, loading } =
    useUserStore();
  // Helps to display the pop ups when they are needed
  const [isSubmitted, setIsSubmitted] = useState(false);

  // clear the error and message and redirect the user to verify email page
  useEffect(() => {
    setMessage(null);
    setError(null);
  }, [setMessage, setError]);

  useEffect(() => {
    function verifyToken() {
      setIsSubmitted(false);
      try {
        devLog(token);
        verifyEmailToken(token as string);
        setIsSubmitted(true);
      } catch (error) {
        devLog(error);
      }
    }
    verifyToken();
  }, [token]);

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
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Logo hideText />
          <h1 className="text-2xl font-semibold tracking-tight">
            Email Verification
          </h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              {verificationStatus === "loading" && loading && (
                <div className="flex flex-col items-center space-y-4">
                  <Loading />
                  <p>Verifying your email...</p>
                </div>
              )}

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
                  >
                    Go to Login
                  </Button>
                </div>
              )}

              {verificationStatus === "error" && (
                <div className="flex flex-col items-center space-y-4">
                  <XCircle className="w-12 h-12 text-destructive" />
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
        {verificationStatus !== "success" && <ResendVerificationEmail />}
      </div>
    </div>
  );
}
