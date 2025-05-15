"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user.store";
import { devLog } from "@/utils/devLog";
import { Loader } from "./ui/loading";
import { toast } from "@/hooks/use-toast";

export const SignInForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const { error, setError, setMessage, message, signIn, loading } =
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
      signIn(formData); // Call backend signup
      setIsSubmitted(true);
    } catch (error) {
      devLog(error);
      setIsSubmitted(false);
    }
  }

  // Route user if signup is successful
  useEffect(() => {
    if (message && message !== null && error === null && isSubmitted) {
      if (message !== null)
        toast({
          title: "Login Successful",
          description: "Welcome back to SecretShare!",
        });
      router.push("/");
    } else {
      if (error !== null && !error?.includes("Login to continue"))
        toast({
          title: "Error login into your account",
          description:
            error ||
            "An error occurred login in into your account. Please try again later!",
          variant: "destructive",
        });
    }
  }, [message, error]);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form onSubmit={onSubmit}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader /> : "Sign in"}
        </Button>
      </CardFooter>
    </form>
  );
};
