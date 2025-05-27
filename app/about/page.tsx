import Link from "next/link";
import { ArrowLeft, Building, Lock, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-2 bg-muted/30 md:py-4 md:pt-24">
          <div className="container">
            <div className="flex items-center gap-2 mb-8">
              <Link
                href="/"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
            <div className="max-w-3xl mx-auto space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                About SecretShare
              </h1>
              <p className="text-muted-foreground sm:text-xl">
                Our mission is to make sharing sensitive information secure and
                simple.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="mb-12 space-y-6">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="text-muted-foreground">
                  SecretShare was founded in 2025 by Afuh Flynn who was
                  frustrated with the insecure ways people were sharing
                  sensitive information. We saw developers sending API keys over
                  email, teams sharing database credentials in chat apps, and
                  companies struggling to securely onboard new team members with
                  the right access.
                </p>
                <p className="text-muted-foreground">
                  He built SecretShare to solve this problem. Our platform
                  provides a secure, easy-to-use way to share sensitive
                  information with the right people, for the right amount of
                  time. Since our launch, we've had very interesting outcomes.
                </p>
                <div className="flex flex-row w-full gap-12 items-center justify-center">
                  {/* <div>
                    <div className="text-3xl font-bold text-primary">10k+</div>
                    <div className="text-sm text-muted-foreground">Users</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">5M+</div>
                    <div className="text-sm text-muted-foreground">
                      Secrets Shared
                    </div>
                  </div> */}
                  <div>
                    <div className="text-3xl font-bold text-primary">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>

              <div className="mb-12 space-y-6">
                <h2 className="text-3xl font-bold">Our Values</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                        <Lock className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold">Security First</h3>
                      <p className="text-sm text-muted-foreground">
                        We believe that security should never be an
                        afterthought. That's why we built SecretShare with a
                        zero-knowledge architecture and end-to-end encryption
                        from day one.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold">User-Centric</h3>
                      <p className="text-sm text-muted-foreground">
                        We believe that security tools should be easy to use.
                        We're constantly working to make SecretShare more
                        intuitive and accessible to everyone, regardless of
                        their technical background.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                        <Building className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold">Transparency</h3>
                      <p className="text-sm text-muted-foreground">
                        We believe in being transparent about how our product
                        works and how we handle your data. We're committed to
                        clear communication and building trust with our users.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                        <svg
                          className="w-6 h-6 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">Innovation</h3>
                      <p className="text-sm text-muted-foreground">
                        We're constantly exploring new ways to make sharing
                        sensitive information more secure and convenient. We're
                        committed to staying at the forefront of security
                        technology.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
