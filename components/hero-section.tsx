import { ArrowRight, CheckCircle, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SecretShareLogo } from "./ui/secret-share-logo";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen py-16 overflow-hidden bg-gradient-to-b from-background to-muted/30 md:py-24 lg:py-32 lg:pt-40 md:pt-50">
      <div className="container">
        <div className="flex flex-col items-center w-full gap-12 sm:grid sm:w-full md:grid-cols-2">
          <div className="w-full space-y-6">
            <div className="inline-flex items-center px-3 py-1 text-sm border rounded-full border-primary/20 bg-primary/10 text-primary">
              <Shield className="mr-1 h-3.5 w-3.5" />
              <span>Secure Environment Variables</span>
            </div>
            <SecretShareLogo variant="horizontal" darkMode />
            <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
              Securely share sensitive environment variables with your team or
              clients. No more sending secrets over email or chat.
            </p>
            <div className="flex flex-col w-full gap-3 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/auth/sign-up">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </div>
            <div className="flex flex-col items-center gap-4 text-sm sm:flex-row text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-primary" />
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-primary" />
                <span>No registration required</span>
              </div>
            </div>
          </div>
          <div className="p-1 mx-auto rounded-lg shadow-xl aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background h-[18rem] cursor-default w-full">
            <div className="w-full h-full p-6 border rounded-lg shadow-sm cursor-default lg:w-full bg-card">
              <div className="space-y-4 cursor-default">
                <div className="flex items-center gap-2 cursor-default">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div className="ml-2 text-xs font-medium cursor-default">
                    environment.env
                  </div>
                </div>
                <div className="flex-1 p-4 space-y-2 overflow-hidden font-mono text-xs rounded-md cursor-default bg-muted">
                  <div className="cursor-default text-muted-foreground">
                    <span className="cursor-default text-primary">API_KEY</span>
                    <span className="cursor-default"> = sk_test_51HZ...</span>
                  </div>
                  <div className="text-muted-foreground">
                    <span className="cursor-default text-primary">
                      DATABASE_URL
                    </span>
                    <span className="cursor-default">
                      {" "}
                      = postgres://user:password@localhost:5432/db
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    <span className="text-primary">JWT_SECRET</span>
                    <span className="cursor-default">
                      {" "}
                      = your_jwt_secret_key
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    <span className="cursor-default text-primary">
                      NEXT_PUBLIC_API_URL
                    </span>
                    <span className="cursor-default">
                      {" "}
                      = https://api.example.com
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs cursor-default text-muted-foreground">
                    Expires in 7 days
                  </div>
                  <div className="text-xs font-medium cursor-default text-primary">
                    Copy Link
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(120,120,255,0.1),transparent_25%)]" />
    </section>
  );
}
