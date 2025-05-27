"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ErrorComponent = () => {
  const searchparams = useSearchParams();
  const error = searchparams.get("error");
  let message = "An unknown authentication error occurred.";
  if (error) {
    switch (error) {
      case "OAuthAccountNotLinked":
        message =
          "This account is already linked with a different provider. Please use the correct provider to sign in.";
        break;
      case "CredentialsSignin":
        message = "Invalid email or password. Please try again.";
        break;
      case "AccessDenied":
        message =
          "Access denied. Please check your credentials or try a different provider.";
        break;
      case "Configuration":
        message =
          "There is a configuration error with the authentication provider. Please contact support.";
        break;
      case "OAuthCallback":
        message =
          "There was an error during the OAuth sign-in process. Please try again or use a different provider.";
        break;
      default:
        message = decodeURIComponent(error);
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Card className="w-full max-w-md border-accent">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-destructive dark:text-destructive text-center">
            Authentication Error
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-foreground dark:text-foreground text-lg font-medium">
            {message}
          </p>
          <Link href="/auth/log-in">
            <Button className="mb-4 w-full" variant="default">
              Back to Login
            </Button>
          </Link>
          <div className="mt-2">
            <span className="block text-muted-foreground mb-1">Need help?</span>
            <Link href="mailto:flyinnsafuh@gmail.com" target="_blank">
              <Button className="w-full" variant="secondary">
                Contact Support
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function AuthErrorPage() {
  return (
    <Suspense fallback={null}>
      <ErrorComponent />
    </Suspense>
  );
}
