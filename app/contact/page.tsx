"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Footer from "@/components/footer";
import { ContactInfo } from "@/components/contact-info";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 md:py-16">
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

          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Contact Us
              </h1>
              <p className="mt-4 text-muted-foreground">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <ContactForm />

              <ContactInfo />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
