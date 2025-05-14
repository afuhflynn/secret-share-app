"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/user.store";
import { Loader } from "@/components/ui/loading";
import { devLog } from "@/utils/devLog";
import { localStorageKey } from "@/lib/constants";

export const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const { error, setError, setMessage, message, signUp, loading } =
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsSubmitted(false);
    try {
      signUp(formData); // Call backend signup
      setIsSubmitted(true);
    } catch (error) {
      devLog(error);
    }
  }

  // Route user if signup is successful
  useEffect(() => {
    if (message && message !== null && error === null && !isSubmitted) {
      toast({
        title: "Account created",
        description: "Welcome to SecretShare!",
      });
      localStorage.setItem(localStorageKey, JSON.stringify(formData.email));
      router.push("/auth/verify-email");
    } else {
      if (error !== null)
        toast({
          title: "Error creating account",
          description:
            error ||
            "An error occurred creating your account. Please try again later!",
          variant: "destructive",
        });
    }
  }, [message, error, router]);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form onSubmit={onSubmit}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              required
            />
          </div>
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader /> : "Create account"}
        </Button>
      </CardFooter>
    </form>
  );
};
