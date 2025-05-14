// ResetPasswordPage;

"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackButton } from "@/components/back-button";
import Logo from "@/components/logo";
import { useUserStore } from "@/store/user.store";
import { Loader } from "@/components/ui/loading";
import { toast } from "@/hooks/use-toast";
import { devLog } from "@/utils/devLog";
import { useParams, useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { token } = useParams();

  const { error, setError, setMessage, message, resetPassword, loading } =
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
    setIsSubmitted(false);

    try {
      resetPassword(formData.password, token as string); // Call backend signup
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
          title: "Password reset",
          description: "Password reset successfully!",
        });

      // Route user to login page
      router.push("/auth/log-in");
    } else {
      if (error !== null)
        toast({
          title: "Password reset fail",
          description:
            error ||
            "An error occurred resetting your password. Please try again later!",
          variant: "destructive",
        });
    }
  }, [message, error]);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen">
      <BackButton />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Logo hideText />
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset your password!
          </h1>
          <p className="text-sm text-muted-foreground">
            Fill in the fields below to create a new unique password.
          </p>
        </div>
        <Card>
          <form onSubmit={onSubmit}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange(e.target.id, e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange(e.target.id, e.target.value)
                    }
                    required
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader /> : "Reset password"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
