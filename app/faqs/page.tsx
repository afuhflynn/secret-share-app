"use client";

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
import { faqs } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [faqsData, setFaqsData] = useState(faqs);

  useEffect(() => {
    const filtered = faqs.map((item) =>
      // item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.questions.map((value) =>
        value.question.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    console.log(filtered);
    // setFaqsData(

    // );
  }, [faqs, setFaqsData, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="pt-16 bg-muted/30 md:pt-24 md:pb-6">
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
          <div className="flex items-center w-full pt-6">
            <Input
              placeholder="Search by category, question or answer..."
              className="py-5 px-4 max-w-3xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {faqsData.map((category) => (
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
