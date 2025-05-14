import { CheckCircle, Key, Shield, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function FeaturesSection() {
  return (
    <section
      className="relative w-full h-auto py-16 overflow-hidden bg-gradient-to-b from-background to-muted/30 md:py-24 lg:py-32"
      id="features"
    >
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
                Your secrets are encrypted before they leave your browser. Only
                those with the link can decrypt them.
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
                Set your secrets to expire after a specific time or number of
                views for added security.
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
                Share secrets with your entire team or specific individuals with
                granular access controls.
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
  );
}
