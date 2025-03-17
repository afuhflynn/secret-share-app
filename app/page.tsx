import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Key,
  Lock,
  Shield,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/main-navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-b from-background to-muted/30 md:py-24 lg:py-32">
          <div className="container relative z-10">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 text-sm border rounded-full border-primary/20 bg-primary/10 text-primary">
                  <Shield className="mr-1 h-3.5 w-3.5" />
                  <span>Secure Environment Variables</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Share Secrets <span className="text-primary">Securely</span>
                </h1>
                <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
                  Securely share sensitive environment variables with your team
                  or clients. No more sending secrets over email or chat.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/auth/sign-up">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      How It Works
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
              <div className="relative max-w-lg p-1 mx-auto rounded-lg shadow-xl aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background">
                <div className="w-full h-full p-6 border rounded-lg shadow-sm bg-card">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <div className="ml-2 text-xs font-medium">
                        environment.env
                      </div>
                    </div>
                    <div className="p-4 space-y-2 font-mono text-xs rounded-md bg-muted">
                      <div className="text-muted-foreground">
                        <span className="text-primary">API_KEY</span>
                        =sk_test_51HZ...
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-primary">DATABASE_URL</span>
                        =postgres://user:password@localhost:5432/db
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-primary">JWT_SECRET</span>
                        =your_jwt_secret_key
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-primary">
                          NEXT_PUBLIC_API_URL
                        </span>
                        =https://api.example.com
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-xs text-muted-foreground">
                        Expires in 7 days
                      </div>
                      <div className="text-xs font-medium text-primary">
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

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-[58rem] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
                Everything you need to share secrets securely
              </h2>
              <p className="text-muted-foreground">
                SecretShare provides a secure way to share sensitive information
                with your team or clients.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-primary/10 bg-gradient-to-br from-background to-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 mb-2 rounded-lg bg-primary/10">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>End-to-End Encryption</CardTitle>
                  <CardDescription>
                    Your secrets are encrypted before they leave your browser.
                    Only those with the link can decrypt them.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Client-side encryption</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Secure key generation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Zero knowledge architecture</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-primary/10 bg-gradient-to-br from-background to-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 mb-2 rounded-lg bg-primary/10">
                    <Key className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Expiring Secrets</CardTitle>
                  <CardDescription>
                    Set your secrets to expire after a specific time or number
                    of views for added security.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Time-based expiration</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>View-based expiration</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Automatic cleanup</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-primary/10 bg-gradient-to-br from-background to-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 mb-2 rounded-lg bg-primary/10">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Team Sharing</CardTitle>
                  <CardDescription>
                    Share secrets with your entire team or specific individuals
                    with granular access controls.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Email-based access</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Access notifications</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Audit logs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-muted/50 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-[58rem] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
                How It Works
              </h2>
              <p className="text-muted-foreground">
                Sharing sensitive information has never been easier or more
                secure.
              </p>
            </div>
            <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">Create</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your environment variables or sensitive information and
                  set expiration options.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">Share</h3>
                <p className="text-sm text-muted-foreground">
                  Generate a secure link and share it with your team or clients
                  via any communication channel.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">Access</h3>
                <p className="text-sm text-muted-foreground">
                  Recipients can securely access the information before it
                  expires or reaches its view limit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-[58rem] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
                Trusted by developers worldwide
              </h2>
              <p className="text-muted-foreground">
                See what our users have to say about SecretShare.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                      <span className="text-lg font-bold">A</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Alex Johnson</h4>
                      <p className="text-sm text-muted-foreground">
                        Senior Developer
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "SecretShare has completely changed how our team handles
                    sensitive information. No more worrying about secrets in
                    emails or chat logs."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                      <span className="text-lg font-bold">S</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Sarah Miller</h4>
                      <p className="text-sm text-muted-foreground">
                        DevOps Engineer
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "The expiring links feature is a game-changer. I can share
                    credentials with contractors and know they'll expire
                    automatically."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                      <span className="text-lg font-bold">M</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Michael Chen</h4>
                      <p className="text-sm text-muted-foreground">CTO</p>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "We've integrated SecretShare into our onboarding process.
                    New team members get exactly the credentials they need,
                    securely."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-muted/50 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-[58rem] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="text-muted-foreground">
                Choose the plan that's right for you and your team.
              </p>
            </div>
            <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <div className="flex items-baseline mt-4">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <CardDescription className="mt-2">
                    For individuals and small projects.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Up to 5 secret shares</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>7-day expiration</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Basic encryption</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/auth/sign-up" className="w-full">
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="relative border-primary">
                <div className="absolute px-3 py-1 text-xs font-medium -translate-x-1/2 rounded-full -top-4 left-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <div className="flex items-baseline mt-4">
                    <span className="text-4xl font-bold">$9</span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <CardDescription className="mt-2">
                    For teams and growing businesses.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Unlimited secret shares</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>30-day expiration</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Advanced encryption</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Access controls</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/auth/sign-up" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="flex items-baseline mt-4">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <CardDescription className="mt-2">
                    For large organizations with advanced needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Custom expiration dates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Team management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Audit logs</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/contact" className="w-full">
                    <Button variant="outline" className="w-full">
                      Contact Sales
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 max-w-[58rem] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Find answers to common questions about SecretShare.
              </p>
            </div>
            <div className="grid max-w-3xl gap-6 mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How secure is SecretShare?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    SecretShare uses end-to-end encryption, meaning your secrets
                    are encrypted in your browser before being sent to our
                    servers. We never have access to your unencrypted data. We
                    use industry-standard AES-256 encryption to ensure your data
                    remains secure.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Can I use SecretShare for free?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Yes! Our free plan allows you to share up to 5 secrets with
                    a 7-day expiration. This is perfect for individual
                    developers or small projects. For more features and longer
                    expiration times, check out our Pro and Enterprise plans.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How do expiring secrets work?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    You can set your secrets to expire after a specific time
                    period (e.g., 1 hour, 24 hours, 7 days) or after a certain
                    number of views. Once the expiration condition is met, the
                    secret is permanently deleted from our servers and can no
                    longer be accessed.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Can I restrict who can access my secrets?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Yes, with our Pro and Enterprise plans, you can restrict
                    access to specific email addresses. Only users with those
                    email addresses will be able to view the secret. You can
                    also receive notifications when someone accesses your
                    secret.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground md:py-24">
          <div className="container">
            <div className="mx-auto max-w-[58rem] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to share secrets securely?
              </h2>
              <p className="mb-8 text-primary-foreground/80">
                Join thousands of developers who trust SecretShare for their
                sensitive information.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/auth/sign-up">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 border-t md:py-12">
        <div className="container">
          <div className="flex flex-col gap-8 md:flex-row md:gap-16">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 font-bold">
                <Lock className="w-5 h-5 text-primary" />
                <span>SecretShare</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Securely share sensitive information with your team or clients.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="mb-3 text-sm font-medium">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/how-it-works"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-medium">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-medium">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-center text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} SecretShare. All rights
                reserved.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Globe className="w-5 h-5" />
                  <span className="sr-only">Website</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Dribbble</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
