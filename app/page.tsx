import Link from "next/link";
import { ArrowRight, Lock, Share2, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

export default function Home() {
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
        <section className="container space-y-6 py-12 text-center md:py-24 lg:py-32">
          <div className="mx-auto max-w-[64rem] space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Share Environment Variables Securely
            </h1>
            <p className="mx-auto max-w-[42rem] text-muted-foreground sm:text-xl">
              Securely share sensitive environment variables with your team or
              clients. No more sending secrets over email or chat.
            </p>
          </div>
          <div className="mx-auto flex max-w-md flex-col gap-2 min-[400px]:flex-row">
            <Link href="/auth/sign-up" className="w-full">
              <Button size="lg" className="w-full">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-it-works" className="w-full">
              <Button size="lg" variant="outline" className="w-full">
                How It Works
              </Button>
            </Link>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 p-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                End-to-End Encryption
              </h2>
              <p className="text-muted-foreground">
                Your environment variables are encrypted before they leave your
                browser. Only those with the unique access link can decrypt
                them.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">How It Works</h3>
                  <p className="text-sm text-muted-foreground">
                    1. Enter your environment variables
                  </p>
                  <p className="text-sm text-muted-foreground">
                    2. Generate a secure sharing link
                  </p>
                  <p className="text-sm text-muted-foreground">
                    3. Share the link with your team
                  </p>
                  <p className="text-sm text-muted-foreground">
                    4. They can access the variables securely
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container space-y-12">
            <div className="mx-auto max-w-[58rem] space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Features
              </h2>
              <p className="text-muted-foreground">
                Everything you need to securely share and manage environment
                variables.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <Lock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Secure Sharing</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Share environment variables with end-to-end encryption.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <Share2 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Team Access</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Control who can access your environment variables.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <Shield className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Expiring Links</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Set expiration dates for your shared environment variables.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-[58rem] space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Pricing
            </h2>
            <p className="text-muted-foreground">
              Simple, transparent pricing for teams of all sizes.
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="text-muted-foreground">
                  For individuals and small teams.
                </p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">$0</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Up to 5 secret shares
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  7-day expiration
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Basic encryption
                </li>
              </ul>
              <Link href="/auth/sign-up" className="mt-6">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-muted-foreground">For growing teams.</p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">$9</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Unlimited secret shares
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  30-day expiration
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Advanced encryption
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Access controls
                </li>
              </ul>
              <Link href="/auth/sign-up" className="mt-6">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
            <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <p className="text-muted-foreground">
                  For large organizations.
                </p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">$29</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Everything in Pro
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Custom expiration dates
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Team management
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Audit logs
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <Link href="/contact" className="mt-6">
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-bold">
            <Lock className="h-5 w-5" />
            <span>SecretShare</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} SecretShare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
