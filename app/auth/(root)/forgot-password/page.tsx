"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackButton } from "@/components/back-button";
import Logo from "@/components/logo";
import { useUserStore } from "@/store/user.store";
import { devLog } from "@/utils/devLog";
import { toast } from "@/hooks/use-toast";
import { Loader } from "@/components/ui/loading";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [requestStatus, setRequestStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [email, setEmail] = useState("");
  const { error, setError, setMessage, message, forgotPassword, loading } =
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
    setRequestStatus("loading");
    setIsSubmitted(false);
    try {
      forgotPassword(email); // Call backend signup
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
      setRequestStatus("success");
    } else {
      if (error !== null)
        toast({
          title: "Error verifying your email",
          description:
            error ||
            "An error occurred verifying your email. Please try again later!",
          variant: "destructive",
        });
      setRequestStatus("error");
    }
  }, [message, error]);

  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen">
      <BackButton />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Logo hideText />
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot your password!
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below and a reset link with instructions to reset
            your password will be sent to your inbox.
          </p>
        </div>
        <Card>
          <form onSubmit={onSubmit}>
            <CardContent className="pt-6">
              {message && message !== null && error === null && (
                <div className="flex flex-col items-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                  <div className="space-y-2">
                    <p className="text-xl font-semibold">
                      Password reset link sent successfully!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      A password reset link has been sent to your email {email}.
                      Check your inbox or spam folder to continue.
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
              {requestStatus !== "success" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="me@exmaple.com"
                      required
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>
              )}
            </CardContent>
            <CardFooter>
              {requestStatus !== "success" && (
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader /> : "Submit"}
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
