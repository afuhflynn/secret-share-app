"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Book,
  FileQuestion,
  HelpCircle,
  Lock,
  MessageSquare,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import Footer from "@/components/footer";

export default function SupportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, we would send the form data to an API
      // For demo purposes, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Support request sent",
        description:
          "We've received your message and will get back to you soon.",
      });

      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const faqCategories = [
    {
      id: "account",
      title: "Account & Billing",
      icon: <FileQuestion className="w-5 h-5" />,
      questions: [
        {
          question: "How do I upgrade my plan?",
          answer:
            "You can upgrade your plan at any time from your account settings. Simply select the plan you want to upgrade to and follow the prompts to complete the payment process.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we also offer invoicing with net-30 payment terms.",
        },
        {
          question: "Can I cancel my subscription at any time?",
          answer:
            "Yes, you can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of your current billing cycle, after which you'll be downgraded to the Free plan.",
        },
      ],
    },
    {
      id: "features",
      title: "Features & Usage",
      icon: <Book className="w-5 h-5" />,
      questions: [
        {
          question: "How do expiring secrets work?",
          answer:
            "You can set your secrets to expire after a specific time period (e.g., 1 hour, 24 hours, 7 days) or after a certain number of views. Once the expiration condition is met, the secret is permanently deleted from our servers and can no longer be accessed.",
        },
        {
          question: "Can I restrict who can access my secrets?",
          answer:
            "Yes, with our Pro and Enterprise plans, you can restrict access to specific email addresses. Only users with those email addresses will be able to view the secret.",
        },
        {
          question: "Can I be notified when someone accesses my secret?",
          answer:
            "Yes, with our Pro and Enterprise plans, you can enable email notifications to be alerted whenever someone accesses your shared secrets.",
        },
      ],
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: <Lock className="w-5 h-5" />,
      questions: [
        {
          question: "How secure is SecretShare?",
          answer:
            "SecretShare uses end-to-end encryption, meaning your secrets are encrypted in your browser before being sent to our servers. We never have access to your unencrypted data. We use industry-standard AES-256 encryption to ensure your data remains secure.",
        },
        {
          question: "Can SecretShare employees access my secrets?",
          answer:
            "No. Your secrets are encrypted in your browser before they're sent to our servers. The encryption key is never sent to our servers, so even our employees cannot access your unencrypted secrets.",
        },
        {
          question: "What happens to my secrets after they expire?",
          answer:
            "Once a secret expires (either by time or view limit), it is permanently deleted from our servers. We also perform regular purges of expired secrets to ensure they don't remain in our backups.",
        },
      ],
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
                Support
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Get help with SecretShare. Find answers to common questions or
                contact our support team.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="faq" className="mb-12">
                <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
                  <TabsTrigger value="faq">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    FAQ
                  </TabsTrigger>
                  <TabsTrigger value="contact">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Us
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="faq" className="mt-8">
                  <div className="space-y-8">
                    {faqCategories.map((category) => (
                      <div key={category.id}>
                        <div className="flex items-center gap-2 mb-4">
                          {category.icon}
                          <h2 className="text-2xl font-bold">
                            {category.title}
                          </h2>
                        </div>
                        <div className="grid gap-4">
                          {category.questions.map((faq, index) => (
                            <Card key={index}>
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  {faq.question}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground">
                                  {faq.answer}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 text-center">
                    <p className="mb-4 text-muted-foreground">
                      Can't find what you're looking for? Contact our support
                      team.
                    </p>
                    <Button
                      onClick={() =>
                        document
                          .querySelector('[data-value="contact"]')
                          ?.click()
                      }
                    >
                      Contact Support
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="contact" className="mt-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                        <CardDescription>
                          Fill out the form below and we'll get back to you as
                          soon as possible.
                        </CardDescription>
                      </CardHeader>
                      <form onSubmit={onSubmit}>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Your email address"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Select
                              value={subject}
                              onValueChange={setSubject}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                              <SelectContent className="bg-background">
                                <SelectItem value="general">
                                  General Inquiry
                                </SelectItem>
                                <SelectItem value="technical">
                                  Technical Support
                                </SelectItem>
                                <SelectItem value="billing">
                                  Billing Question
                                </SelectItem>
                                <SelectItem value="feedback">
                                  Feedback
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Your message"
                              className="min-h-[150px]"
                              required
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                          >
                            {isLoading ? "Sending..." : "Send Message"}
                          </Button>
                        </CardFooter>
                      </form>
                    </Card>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Contact Information</CardTitle>
                          <CardDescription>
                            Here are the ways you can reach us.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                              <MessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Email</h3>
                              <p className="text-sm text-muted-foreground">
                                support@secretshare.example.com
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                We aim to respond to all inquiries within 24
                                hours.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Support Hours</CardTitle>
                          <CardDescription>
                            When you can expect to hear from us.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">
                                Monday - Friday
                              </span>
                              <span>9:00 AM - 5:00 PM EST</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Saturday</span>
                              <span>10:00 AM - 2:00 PM EST</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Sunday</span>
                              <span>Closed</span>
                            </div>
                          </div>
                          <p className="mt-4 text-sm text-muted-foreground">
                            For urgent issues outside of business hours, please
                            email us with "URGENT" in the subject line.
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Resources</CardTitle>
                          <CardDescription>
                            Additional resources to help you.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/documentation"
                                className="flex items-center text-primary hover:underline"
                              >
                                <Book className="w-4 h-4 mr-2" />
                                Documentation
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/faqs"
                                className="flex items-center text-primary hover:underline"
                              >
                                <HelpCircle className="w-4 h-4 mr-2" />
                                FAQ
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/blog"
                                className="flex items-center text-primary hover:underline"
                              >
                                <FileQuestion className="w-4 h-4 mr-2" />
                                Blog
                              </Link>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
