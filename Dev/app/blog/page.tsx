import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Footer from "@/components/footer";
import { redirect } from "next/navigation";

export default function BlogPage() {
  redirect("/");
  const blogPosts = [
    {
      id: "secure-env-vars",
      title: "Best Practices for Managing Environment Variables",
      excerpt:
        "Learn how to securely manage environment variables in your development workflow and avoid common security pitfalls.",
      date: "June 15, 2025",
      author: "Alex Johnson",
      category: "Security",
      image: "/placeholder.svg?height=400&width=600",
      readTime: "5 min read",
    },
    {
      id: "encryption-explained",
      title:
        "End-to-End Encryption Explained: How SecretShare Protects Your Data",
      excerpt:
        "A deep dive into how end-to-end encryption works and how SecretShare implements it to keep your sensitive information secure.",
      date: "May 28, 2025",
      author: "Sarah Chen",
      category: "Technology",
      image: "/placeholder.svg?height=400&width=600",
      readTime: "8 min read",
    },
    {
      id: "team-secrets",
      title: "Managing Secrets Across Development Teams",
      excerpt:
        "Strategies for securely sharing and managing secrets across development teams without compromising security.",
      date: "May 10, 2025",
      author: "Michael Rodriguez",
      category: "Teams",
      image: "/placeholder.svg?height=400&width=600",
      readTime: "6 min read",
    },
    {
      id: "api-key-security",
      title: "Protecting Your API Keys: Do's and Don'ts",
      excerpt:
        "Learn how to properly handle API keys and other sensitive credentials in your applications and development workflow.",
      date: "April 22, 2025",
      author: "Emily Patel",
      category: "Security",
      image: "/placeholder.svg?height=400&width=600",
      readTime: "7 min read",
    },
    {
      id: "secrets-ci-cd",
      title: "Secrets Management in CI/CD Pipelines",
      excerpt:
        "Best practices for handling secrets in your continuous integration and deployment pipelines without exposing sensitive information.",
      date: "April 5, 2025",
      author: "Alex Johnson",
      category: "DevOps",
      image: "/placeholder.svg?height=400&width=600",
      readTime: "9 min read",
    },
    {
      id: "compliance-secrets",
      title: "Secrets Management for Compliance: GDPR, HIPAA, and More",
      excerpt:
        "How proper secrets management can help your organization meet regulatory compliance requirements.",
      date: "March 18, 2025",
      author: "Sarah Chen",
      category: "Compliance",
      image: "/placeholder.svg?height=400&width=600",
      readTime: "10 min read",
    },
  ];

  const categories = [
    "All",
    "Security",
    "Technology",
    "Teams",
    "DevOps",
    "Compliance",
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
                Blog
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Insights, tutorials, and updates from the SecretShare team.
              </p>
              <div className="relative mt-8">
                <Input
                  placeholder="Search articles..."
                  className="max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="overflow-hidden aspect-video">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          {post.category}
                        </span>
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="line-clamp-2">
                        <Link
                          href={`/blog/${post.id}`}
                          className="hover:underline"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <Button variant="outline">
                  Load More Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
                Subscribe to our newsletter
              </h2>
              <p className="mb-8 text-muted-foreground">
                Get the latest articles, tutorials, and updates from the
                SecretShare team delivered straight to your inbox.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Input
                  placeholder="Enter your email"
                  className="max-w-md mx-auto sm:mx-0"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
