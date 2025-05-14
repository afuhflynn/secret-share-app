import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/footer";

export default function FAQsPage() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is SecretShare?",
          answer:
            "SecretShare is a secure platform for sharing sensitive information like environment variables, API keys, and credentials with your team or clients. It uses end-to-end encryption to ensure your data remains private and secure.",
        },
        {
          question: "How does SecretShare work?",
          answer:
            "SecretShare encrypts your sensitive information in your browser before it's sent to our servers. When you share a secret, we generate a secure link that you can send to others. Only those with the link can decrypt and access the information. You can also set expiration conditions based on time or number of views.",
        },
        {
          question: "Is SecretShare free to use?",
          answer:
            "Yes! We offer a free plan that allows you to share up to 5 secrets with a 7-day expiration. For more features and longer expiration times, check out our Pro and Enterprise plans.",
        },
      ],
    },
    {
      category: "Security",
      questions: [
        {
          question: "How secure is SecretShare?",
          answer:
            "SecretShare uses end-to-end encryption, meaning your secrets are encrypted in your browser before being sent to our servers. We never have access to your unencrypted data. We use industry-standard AES-256 encryption to ensure your data remains secure.",
        },
        {
          question: "Can SecretShare employees access my secrets?",
          answer:
            "No. We use a zero-knowledge architecture, which means your secrets are encrypted in your browser before they reach our servers. We never have access to the encryption keys or the unencrypted content of your secrets.",
        },
        {
          question: "What happens to my secrets after they expire?",
          answer:
            "Once a secret expires (either by reaching its time limit or maximum number of views), it is permanently deleted from our servers. There is no way to recover an expired secret.",
        },
      ],
    },
    {
      category: "Features",
      questions: [
        {
          question: "How do expiring secrets work?",
          answer:
            "You can set your secrets to expire after a specific time period (e.g., 1 hour, 24 hours, 7 days) or after a certain number of views. Once the expiration condition is met, the secret is permanently deleted from our servers and can no longer be accessed.",
        },
        {
          question: "Can I restrict who can access my secrets?",
          answer:
            "Yes, with our Pro and Enterprise plans, you can restrict access to specific email addresses. Only users with those email addresses will be able to view the secret. You can also receive notifications when someone accesses your secret.",
        },
        {
          question: "Can I edit a secret after I've created it?",
          answer:
            "Yes, you can edit the content, name, and expiration settings of your secrets at any time before they expire. However, if someone has already accessed the secret using a shared link, they won't see the updated version unless you share a new link with them.",
        },
      ],
    },
    {
      category: "Account & Billing",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "You can sign up for a SecretShare account using your email address, or by signing in with Google or GitHub. Once you've created an account, you can start sharing secrets right away.",
        },
        {
          question: "Can I switch between plans?",
          answer:
            "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. When you downgrade, the new price will take effect at the start of your next billing cycle.",
        },
        {
          question: "Do you offer refunds?",
          answer:
            "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with SecretShare within the first 14 days, contact our support team for a full refund.",
        },
      ],
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          question: "What should I do if a shared link isn't working?",
          answer:
            "If a shared link isn't working, it may have expired or reached its maximum number of views. You can check the status of your shared secrets in your dashboard. If you believe there's an issue, please contact our support team.",
        },
        {
          question: "I forgot my password. How do I reset it?",
          answer:
            "You can reset your password by clicking the 'Forgot password?' link on the login page. We'll send you an email with instructions to reset your password.",
        },
        {
          question: "How do I contact support?",
          answer:
            "You can contact our support team by emailing secretshare-support@gmail.com or by visiting our Support page. We aim to respond to all inquiries within 24 hours.",
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
                Frequently Asked Questions
              </h1>
              <p className="text-muted-foreground sm:text-xl">
                Find answers to common questions about SecretShare.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {faqs.map((category) => (
                <div key={category.category} className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${category.category}-${index}`}
                      >
                        <AccordionTrigger className="font-medium text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              <div className="p-6 mt-12 border rounded-lg shadow-sm bg-card">
                <h3 className="mb-4 text-xl font-bold">
                  Still have questions?
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Can't find the answer you're looking for? Please contact our
                  support team.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/contact">
                    <Button className="w-full sm:w-auto">
                      Contact Support
                    </Button>
                  </Link>
                  <Link
                    href="https://github.com/afuhflynn/secret-share-app.git"
                    target="_blank"
                  >
                    <Button variant="outline" className="w-full sm:w-auto">
                      View Documentation
                    </Button>
                  </Link>
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
