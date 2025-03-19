import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Globe,
  Key,
  Shield,
  Users,
} from "lucide-react";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-16 bg-muted/30 md:py-24">
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
                Features
              </h1>
              <p className="text-muted-foreground sm:text-xl">
                Everything you need to securely share and manage environment
                variables.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="grid gap-12 md:grid-cols-2 md:gap-16">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold">
                    End-to-End Encryption
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    Your environment variables are encrypted before they leave
                    your browser. Only those with the unique access link can
                    decrypt them.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>AES-256 encryption</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Client-side encryption</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Zero-knowledge architecture</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 border rounded-lg shadow-sm bg-card">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <div className="ml-2 text-xs font-medium">
                        encryption.js
                      </div>
                    </div>
                    <div className="p-4 space-y-2 font-mono text-xs rounded-md bg-muted">
                      <div className="text-muted-foreground">
                        <span className="text-blue-500 dark:text-blue-400">
                          async
                        </span>{" "}
                        <span className="text-yellow-500 dark:text-yellow-400">
                          function
                        </span>{" "}
                        <span className="text-green-500 dark:text-green-400">
                          encryptData
                        </span>
                        (data, password) {"{"}
                      </div>
                      <div className="pl-4 text-muted-foreground">
                        <span className="text-blue-500 dark:text-blue-400">
                          const
                        </span>{" "}
                        encoder ={" "}
                        <span className="text-blue-500 dark:text-blue-400">
                          new
                        </span>{" "}
                        TextEncoder();
                      </div>
                      <div className="pl-4 text-muted-foreground">
                        <span className="text-blue-500 dark:text-blue-400">
                          const
                        </span>{" "}
                        keyMaterial ={" "}
                        <span className="text-blue-500 dark:text-blue-400">
                          await
                        </span>{" "}
                        window.crypto.subtle.importKey(...);
                      </div>
                      <div className="pl-4 text-muted-foreground">
                        <span className="text-green-500 dark:text-green-400">
                          // Generate a salt
                        </span>
                      </div>
                      <div className="pl-4 text-muted-foreground">
                        <span className="text-blue-500 dark:text-blue-400">
                          const
                        </span>{" "}
                        salt = window.crypto.getRandomValues(
                        <span className="text-blue-500 dark:text-blue-400">
                          new
                        </span>{" "}
                        Uint8Array(16));
                      </div>
                      <div className="pl-4 text-muted-foreground">
                        <span className="text-green-500 dark:text-green-400">
                          // Derive a key from the password
                        </span>
                      </div>
                      <div className="pl-4 text-muted-foreground">
                        <span className="text-blue-500 dark:text-blue-400">
                          const
                        </span>{" "}
                        key ={" "}
                        <span className="text-blue-500 dark:text-blue-400">
                          await
                        </span>{" "}
                        window.crypto.subtle.deriveKey(...);
                      </div>
                      <div className="text-muted-foreground">{"}"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="grid gap-12 md:grid-cols-2 md:gap-16">
                <div className="order-2 p-6 border rounded-lg shadow-sm bg-card md:order-1">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        Expiration Settings
                      </div>
                    </div>
                    <div className="p-4 space-y-2 rounded-md bg-muted">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 rounded-full border-primary"></div>
                        <div className="text-sm">Time-based expiration</div>
                      </div>
                      <div className="ml-6 space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-primary/20"></div>
                          <div className="text-xs text-muted-foreground">
                            1 hour
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-primary/40"></div>
                          <div className="text-xs text-muted-foreground">
                            24 hours
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                          <div className="text-xs text-muted-foreground">
                            7 days
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-primary/80"></div>
                          <div className="text-xs text-muted-foreground">
                            30 days
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 space-x-2">
                        <div className="w-4 h-4 border-2 rounded-full"></div>
                        <div className="text-sm">View-based expiration</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                    <Key className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold">Expiring Secrets</h2>
                  <p className="mb-4 text-muted-foreground">
                    Set your secrets to expire after a specific time or number
                    of views for added security.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Time-based expiration (1 hour to 30 days)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>View-based expiration (1 to unlimited views)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Automatic cleanup of expired secrets</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Custom expiration settings (Enterprise plan)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="grid gap-12 md:grid-cols-2 md:gap-16">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold">Team Sharing</h2>
                  <p className="mb-4 text-muted-foreground">
                    Share secrets with your entire team or specific individuals
                    with granular access controls.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Email-based access restrictions</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Access notifications</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Detailed access logs</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Team management (Enterprise plan)</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 border rounded-lg shadow-sm bg-card">
                  <div className="space-y-4">
                    <div className="text-sm font-medium">Share Settings</div>
                    <div className="p-4 space-y-3 rounded-md bg-muted">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 rounded-full border-primary"></div>
                        <div className="text-sm">Anyone with the link</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 rounded-full"></div>
                        <div className="text-sm">Specific email addresses</div>
                      </div>
                      <div className="p-2 mt-4 border rounded-md bg-card">
                        <div className="text-xs text-muted-foreground">
                          Enter email addresses, separated by commas
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="text-sm">Email Notification</div>
                      <div className="w-10 h-5 p-1 rounded-full bg-primary/20">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="grid gap-12 md:grid-cols-2 md:gap-16">
                <div className="order-2 p-6 border rounded-lg shadow-sm bg-card md:order-1">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <div className="ml-2 text-xs font-medium">
                        audit-log.json
                      </div>
                    </div>
                    <div className="p-4 space-y-2 font-mono text-xs rounded-md bg-muted">
                      <div className="text-muted-foreground">[</div>
                      <div className="pl-4 text-muted-foreground">{"{"}</div>
                      <div className="pl-8 text-muted-foreground">
                        <span className="text-blue-500 dark:text-blue-400">
                          "event"
                        </span>
                        :{" "}
                        <span className="text-green-500 dark:text-green-400">
                          "secret.accessed"
                        </span>
                        ,
                      </div>
                      <div className="pl-8 text-muted-foreground">
                        <span className="text-blue-500 dark:text-blue-400">
                          "timestamp"
                        </span>
                        :{" "}
                        <span className="text-green-500 dark:text-green-400">
                          "2023-06-15T14:32:10Z"
                        </span>
                        ,
                      </div>
                      <div className="pl-8 text-muted-foreground">
                        <span className="text-blue-500 dark:text-blue-400">
                          "user"
                        </span>
                        :{" "}
                        <span className="text-green-500 dark:text-green-400">
                          "john@example.com"
                        </span>
                        ,
                      </div>
                      <div className="pl-8 text-muted-foreground">
                        <span className="text-blue-500 dark:text-blue-400">
                          "ip"
                        </span>
                        :{" "}
                        <span className="text-green-500 dark:text-green-400">
                          "192.168.1.1"
                        </span>
                        ,
                      </div>
                      <div className="pl-8 text-muted-foreground">
                        <span className="text-blue-500 dark:text-blue-400">
                          "secret_id"
                        </span>
                        :{" "}
                        <span className="text-green-500 dark:text-green-400">
                          "sec_12345"
                        </span>
                      </div>
                      <div className="pl-4 text-muted-foreground">{"}"}</div>
                      <div className="text-muted-foreground">]</div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold">Advanced Security</h2>
                  <p className="mb-4 text-muted-foreground">
                    Enterprise-grade security features to keep your sensitive
                    information protected.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Detailed audit logs</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>IP-based access restrictions</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Two-factor authentication</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      <span>Single sign-on (Enterprise plan)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
