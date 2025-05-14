import type { Metadata } from "next";
import Link from "next/link";
import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-noto-serif-bold">
            Welcome back
          </CardTitle>
          <CardDescription className="text-sm font-inter-18pt-regular text-muted-foreground">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action="/api/v1/user/github-signin" method="GET">
            <Button
              type="submit"
              className="w-full font-source-code-pro-medium"
              variant="outline"
            >
              <Github className="w-4 h-4 mr-2" />
              Sign in with GitHub
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background font-inter-18pt-medium text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Placeholder for other auth methods */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full font-source-code-pro-medium"
              disabled
            >
              Other providers coming soon
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <p className="text-xs font-inter-18pt-regular text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms-of-service"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
