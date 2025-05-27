"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Footer from "@/components/footer";
import { useUserStore } from "@/store/user.store";

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const { user, getUserProfile } = useUserStore();

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const plans = [
    {
      name: "Free",
      description: "For individuals and small projects.",
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        "Secrets don't last more than 7 days",
        "Basic encryption",
        "Email support",
        "Access notifications",
      ],
      limitations: [
        "No team sharing",
        "No custom expiration",
        "No access controls",
      ],
      cta: "Get Started",
      href: "/signup",
      popular: false,
      isCurrentPlan: user && user.plan && user.plan === "free",
    },
    {
      name: "Pro",
      description: "For teams and growing businesses.",
      price: {
        monthly: 9,
        yearly: 90,
      },
      features: [
        "Unlimited secret shares",
        "30-day expiration available",
        "Advanced encryption",
        "Email-based access controls",
        "Access notifications",
        "Priority support",
      ],
      limitations: ["No team management", "No audit logs"],
      cta: "Get Started",
      href: "/signup",
      popular: true,
      isCurrentPlan: user && user.plan && user.plan === "pro",
    },
    {
      name: "Enterprise",
      description: "For large organizations with advanced needs.",
      price: {
        monthly: 29,
        yearly: 290,
      },
      features: [
        "Everything in Pro",
        "Custom expiration dates",
        "Team management",
        "Audit logs",
        "IP-based access restrictions",
        "Single sign-on (SSO)",
        "Dedicated support",
      ],
      limitations: [],
      cta: "Contact Sales",
      href: "/contact",
      popular: false,
      isCurrentPlan: user && user.plan && user.plan === "enterprise",
    },
  ];

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
                Simple, transparent pricing
              </h1>
              <p className="text-muted-foreground sm:text-xl">
                Choose the plan that's right for you and your team.
              </p>
              <div className="flex items-center justify-center pt-4 space-x-4">
                <span
                  className={`text-sm ${
                    billingInterval === "monthly"
                      ? "font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  Monthly
                </span>
                <Switch
                  checked={billingInterval === "yearly"}
                  onCheckedChange={(checked) =>
                    setBillingInterval(checked ? "yearly" : "monthly")
                  }
                  id="billing-switch"
                />
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-sm ${
                      billingInterval === "yearly"
                        ? "font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    Yearly
                  </span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                    Save 17%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative ${
                    plan.popular ? "border-primary shadow-lg" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute px-3 py-1 text-xs font-medium -translate-x-1/2 rounded-full -top-4 left-1/2 bg-primary text-primary-foreground">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="flex items-baseline mt-4">
                      <span className="text-4xl font-bold">
                        ${plan.price[billingInterval]}
                      </span>
                      <span className="ml-1 text-sm text-muted-foreground">
                        {plan.price[billingInterval] === 0
                          ? ""
                          : `/${
                              billingInterval === "monthly" ? "month" : "year"
                            }`}
                      </span>
                    </div>
                    <CardDescription className="mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium">
                          Included Features
                        </h3>
                        <ul className="mt-2 space-y-2 text-sm">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center">
                              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {plan.limitations.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium">Limitations</h3>
                          <ul className="mt-2 space-y-2 text-sm">
                            {plan.limitations.map((limitation) => (
                              <li
                                key={limitation}
                                className="flex items-center"
                              >
                                <X className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  {limitation}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    {plan.isCurrentPlan ? (
                      <Button
                        variant={"outline"}
                        className="w-full"
                        disabled={plan.isCurrentPlan}
                      >
                        Current Plan
                      </Button>
                    ) : (
                      <Link href={plan.href} className="w-full">
                        <Button
                          variant={plan.popular ? "default" : "outline"}
                          className="w-full"
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Compare Plans
                </h2>
                <p className="mt-2 text-muted-foreground">
                  See which plan is right for you and your team.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 font-medium text-left">Feature</th>
                      <th className="py-4 font-medium text-center">Free</th>
                      <th className="py-4 font-medium text-center">Pro</th>
                      <th className="py-4 font-medium text-center">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 text-sm">Secret shares</td>
                      <td className="py-4 text-sm text-center">5</td>
                      <td className="py-4 text-sm text-center">Unlimited</td>
                      <td className="py-4 text-sm text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 text-sm">Maximum expiration</td>
                      <td className="py-4 text-sm text-center">7 days</td>
                      <td className="py-4 text-sm text-center">30 days</td>
                      <td className="py-4 text-sm text-center">Custom</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 text-sm">End-to-end encryption</td>
                      <td className="py-4 text-sm text-center">
                        <CheckCircle className="w-4 h-4 mx-auto text-primary" />
                      </td>
                      <td className="py-4 text-sm text-center">
                        <CheckCircle className="w-4 h-4 mx-auto text-primary" />
                      </td>
                      <td className="py-4 text-sm text-center">
                        <CheckCircle className="w-4 h-4 mx-auto text-primary" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 text-sm">
                        Email-based access controls
                      </td>
                      <td className="py-4 text-sm text-center">
                        <X className="w-4 h-4 mx-auto text-muted-foreground" />
                      </td>
                      <td className="py-4 text-sm text-center">
                        <CheckCircle className="w-4 h-4 mx-auto text-primary" />
                      </td>
                      <td className="py-4 text-sm text-center">
                        <CheckCircle className="w-4 h-4 mx-auto text-primary" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 text-sm">Access notifications</td>
                      <td className="py-4 text-sm text-center">
                        <X className="w-4 h-4 mx-auto text-muted-foreground" />
                      </td>
                      <td className="py-4 text-sm text-center">
                        <CheckCircle className="w-4 h-4 mx-auto text-primary" />
                      </td>
                      <td className="py-4 text-sm text-center">
                        <CheckCircle className="w-4 h-4 mx-auto text-primary" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 text-sm">Team management</td>
                      <td className="py-4 text-sm text-center">
                        <X className="w-4 h-4 mx-auto text-muted-foreground" />
                      </td>
                      <td className="py-4 text-sm text-center">
                        <X className="w-4 h-4 mx-auto text-muted-foreground" />
                      </td>
                      <td className="py-4 text-sm text-center">
                        <CheckCircle className="w-4 h-4 mx-auto text-primary" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 text-sm">Audit logs</td>
                      <td className="py-4 text-sm text-center">
                        <X className="w-4 h-4 mx-auto text-muted-foreground" />
                      </td>
                      <td className="py-4 text-sm text-center">
                        <X className="w-4 h-4 mx-auto text-muted-foreground" />
                      </td>
                      <td className="py-4 text-sm text-center">
                        <CheckCircle className="w-4 h-4 mx-auto text-primary" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 text-sm">Single sign-on (SSO)</td>
                      <td className="py-4 text-sm text-center">
                        <X className="w-4 h-4 mx-auto text-muted-foreground" />
                      </td>
                      <td className="py-4 text-sm text-center">
                        <X className="w-4 h-4 mx-auto text-muted-foreground" />
                      </td>
                      <td className="py-4 text-sm text-center">
                        <CheckCircle className="w-4 h-4 mx-auto text-primary" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 text-sm">Support</td>
                      <td className="py-4 text-sm text-center">Email</td>
                      <td className="py-4 text-sm text-center">Priority</td>
                      <td className="py-4 text-sm text-center">Dedicated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
