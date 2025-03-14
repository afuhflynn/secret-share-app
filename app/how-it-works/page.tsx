import Link from "next/link";
import { ArrowLeft, ArrowRight, Key, Lock, Share2, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/logo";

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-4">
            <Link
              href="/auth/log-in"
              className="text-sm font-medium hover:underline"
            >
              Login
            </Link>
            <Link href="/auth/sign-up">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-16">
          <div className="flex items-center gap-2 mb-8">
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How SecretShare Works
              </h1>
              <p className="text-lg text-muted-foreground">
                SecretShare provides a secure way to share sensitive environment
                variables with your team or clients.
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Key className="h-4 w-4 text-primary" />
                    </div>
                    <span>Step 1: Create Your Secret</span>
                  </CardTitle>
                  <CardDescription>
                    Enter your environment variables securely
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Start by creating a new secret in your dashboard. Enter your
                    environment variables in KEY=VALUE format, one per line.
                    These could be API keys, database credentials, or any
                    sensitive information you need to share.
                  </p>
                  <div className="rounded-md bg-muted p-4 font-mono text-sm">
                    API_KEY=your_api_key
                    <br />
                    DATABASE_URL=your_database_url
                    <br />
                    SECRET_KEY=your_secret_key
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <span>Step 2: Set Security Options</span>
                  </CardTitle>
                  <CardDescription>
                    Configure expiration and access controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Choose how your secret should expire - either after a
                    specific time period or after a certain number of views. You
                    can also restrict access to specific email addresses for
                    additional security.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">
                        Time-based Expiration
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Set your secret to expire after 1 hour, 24 hours, 7
                        days, or 30 days.
                      </p>
                    </div>
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">
                        View-based Expiration
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Set your secret to expire after it has been viewed a
                        specific number of times.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Share2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Step 3: Share Your Secret</span>
                  </CardTitle>
                  <CardDescription>
                    Generate a secure link to share with others
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Generate a secure link that you can share with your team or
                    clients. This link can be sent via email, chat, or any other
                    communication channel. Only those with the link can access
                    your secret.
                  </p>
                  <div className="rounded-md bg-muted p-4 font-mono text-sm break-all">
                    https://secretshare.example.com/s/abc123/xyz789
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Lock className="h-4 w-4 text-primary" />
                    </div>
                    <span>Step 4: Secure Access</span>
                  </CardTitle>
                  <CardDescription>
                    Recipients can securely access your environment variables
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    When someone accesses your shared link, they can view, copy,
                    or download the environment variables. Once the expiration
                    conditions are met (time or views), the link becomes invalid
                    and the secret can no longer be accessed.
                  </p>
                  <div className="rounded-md border p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Ready to securely share your environment variables?
                    </p>
                    <Link href="/auth/sign-up">
                      <Button>
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <Logo />
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} SecretShare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
