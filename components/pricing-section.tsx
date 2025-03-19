import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

export default function PricingSection() {
  return (
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
  );
}
