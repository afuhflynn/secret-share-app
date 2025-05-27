"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, ChevronRight, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/footer";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();

  const postId = params.slug;
  const post = {
    id: postId,
    title:
      "End-to-End Encryption Explained: How SecretShare Protects Your Data",
    excerpt:
      "A deep dive into how end-to-end encryption works and how SecretShare implements it to keep your sensitive information secure.",
    date: "May 28, 2025",
    author: "Sarah Chen",
    authorTitle: "CTO & Co-Founder",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Technology",
    image: "/placeholder.svg?height=600&width=1200",
    readTime: "8 min read",
    content: `
      <p>In today's digital landscape, protecting sensitive information is more important than ever. At SecretShare, we take security seriously, which is why we've implemented end-to-end encryption (E2EE) to ensure your secrets remain secure.</p>
      
      <h2>What is End-to-End Encryption?</h2>
      
      <p>End-to-end encryption is a system of communication where only the communicating users can read the messages. In principle, it prevents potential eavesdroppers – including telecom providers, internet providers, and even the provider of the communication service – from being able to access the cryptographic keys needed to decrypt the conversation.</p>
      
      <p>The "end-to-end" in "end-to-end encryption" refers to the fact that the encryption happens at the endpoints – the sender and receiver – rather than at any intermediate point. This means that even if a third party intercepts the data in transit, they cannot read it without the decryption keys, which only the endpoints possess.</p>
      
      <h2>How SecretShare Implements E2EE</h2>
      
      <p>At SecretShare, we've implemented E2EE using a combination of symmetric and asymmetric encryption:</p>
      
      <ol>
        <li><strong>Client-Side Encryption:</strong> When you create a secret in SecretShare, the encryption happens entirely in your browser before any data is sent to our servers. This means your unencrypted data never leaves your device.</li>
        
        <li><strong>AES-256 Encryption:</strong> We use the Advanced Encryption Standard (AES) with a 256-bit key length, which is one of the strongest encryption algorithms available and is used by governments and security professionals worldwide.</li>
        
        <li><strong>Secure Key Generation:</strong> For each secret, a unique encryption key is generated. This key is never sent to our servers in its unencrypted form.</li>
        
        <li><strong>Secure Sharing:</strong> When you share a secret, the recipient receives a unique URL that contains the decryption key as a fragment identifier (the part after the # in a URL). This fragment is never sent to our servers, ensuring that we never have access to the decryption key.</li>
      </ol>
      
      <h2>Zero-Knowledge Architecture</h2>
      
      <p>SecretShare operates on a zero-knowledge architecture, which means we have no knowledge of the content of your secrets. Even if our servers were compromised, an attacker would only have access to encrypted data, which is useless without the decryption keys.</p>
      
      <p>This approach provides several benefits:</p>
      
      <ul>
        <li>We cannot access your secrets, even if compelled by law enforcement.</li>
        <li>A breach of our servers would not expose your unencrypted secrets.</li>
        <li>Your secrets remain private, even from our own employees.</li>
      </ul>
      
      <h2>Verifying Our Security</h2>
      
      <p>We believe in transparency when it comes to security. That's why our encryption implementation is open for review, and we encourage security researchers to audit our code and provide feedback.</p>
      
      <p>Additionally, we regularly conduct security audits and penetration testing to ensure the integrity of our systems.</p>
      
      <h2>Best Practices for Using SecretShare</h2>
      
      <p>While we've built SecretShare with security as a top priority, there are additional steps you can take to ensure your secrets remain secure:</p>
      
      <ul>
        <li>Use strong, unique passwords for your SecretShare account.</li>
        <li>Enable two-factor authentication for an additional layer of security.</li>
        <li>Set appropriate expiration times for your secrets.</li>
        <li>Use email-based access restrictions for sensitive secrets.</li>
        <li>Regularly review your access logs to monitor who has accessed your secrets.</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>End-to-end encryption is a powerful tool for protecting sensitive information, and at SecretShare, we've implemented it in a way that ensures your secrets remain secure from end to end. By combining strong encryption algorithms, client-side encryption, and a zero-knowledge architecture, we provide a secure platform for sharing sensitive information with your team or clients.</p>
      
      <p>If you have any questions about our security practices or would like to learn more about how we protect your data, please don't hesitate to contact our security team.</p>
    `,
  };

  const relatedPosts = [
    {
      id: "api-key-security",
      title: "Protecting Your API Keys: Do's and Don'ts",
      excerpt:
        "Learn how to properly handle API keys and other sensitive credentials in your applications and development workflow.",
      date: "April 22, 2025",
      author: "Emily Patel",
      category: "Security",
      image: "/placeholder.svg?height=400&width=600",
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
    },
    {
      id: "secure-env-vars",
      title: "Best Practices for Managing Environment Variables",
      excerpt:
        "Learn how to securely manage environment variables in your development workflow and avoid common security pitfalls.",
      date: "June 15, 2025",
      author: "Alex Johnson",
      category: "Security",
      image: "/placeholder.svg?height=400&width=600",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="flex items-center gap-2 mb-8">
            <Link
              href="/blog"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <Link href="/blog" className="hover:text-foreground">
                  Blog
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link
                  href={`/blog?category=${post.category}`}
                  className="hover:text-foreground"
                >
                  {post.category}
                </Link>
              </div>

              <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 overflow-hidden rounded-full">
                    <img
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {post.author}
                    </span>
                    <span className="block text-xs">{post.authorTitle}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {post.category}
                  </span>
                </div>
                <div>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="mb-8 overflow-hidden rounded-lg aspect-video">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>

            <div
              className="mb-12 prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="flex items-center justify-between py-6 my-8 border-t border-b">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img
                    src={post.authorImage || "/placeholder.svg"}
                    alt={post.author}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {post.authorTitle}
                  </div>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden">
                    <div className="overflow-hidden aspect-video">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base line-clamp-2">
                        <Link
                          href={`/blog/${relatedPost.id}`}
                          className="hover:underline"
                        >
                          {relatedPost.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {relatedPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
