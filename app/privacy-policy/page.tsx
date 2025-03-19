import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/footer";

export default function PrivacyPolicyPage() {
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
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated: June 1, 2023
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <p>
                At SecretShare, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our service.
              </p>

              <h2>Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you:
              </p>
              <ul>
                <li>Create an account</li>
                <li>Use our services</li>
                <li>Contact our support team</li>
                <li>Subscribe to our newsletter</li>
              </ul>

              <p>This information may include:</p>
              <ul>
                <li>Your name and email address</li>
                <li>
                  Your payment information (if you subscribe to a paid plan)
                </li>
                <li>
                  Your usage data (such as when you create or access secrets)
                </li>
                <li>Your communications with us</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions</li>
                <li>
                  Send you technical notices, updates, security alerts, and
                  support messages
                </li>
                <li>Respond to your comments, questions, and requests</li>
                <li>
                  Monitor and analyze trends, usage, and activities in
                  connection with our services
                </li>
                <li>
                  Detect, investigate, and prevent fraudulent transactions and
                  other illegal activities
                </li>
                <li>Personalize and improve our services</li>
              </ul>

              <h2>How We Protect Your Information</h2>
              <p>
                We implement a variety of security measures to maintain the
                safety of your personal information:
              </p>
              <ul>
                <li>
                  All sensitive information is encrypted using industry-standard
                  encryption technologies
                </li>
                <li>
                  Your secrets are encrypted in your browser before being sent
                  to our servers
                </li>
                <li>
                  We use a zero-knowledge architecture, which means we never
                  have access to your unencrypted secrets
                </li>
                <li>
                  We regularly review our systems and practices to ensure they
                  meet high security standards
                </li>
              </ul>

              <h2>Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personally
                identifiable information to outside parties except in the
                following circumstances:
              </p>
              <ul>
                <li>
                  To trusted third parties who assist us in operating our
                  website, conducting our business, or servicing you, as long as
                  those parties agree to keep this information confidential
                </li>
                <li>
                  When we believe release is appropriate to comply with the law,
                  enforce our site policies, or protect ours or others' rights,
                  property, or safety
                </li>
                <li>
                  In connection with a merger, acquisition, bankruptcy, or other
                  transaction in which your information may be transferred as a
                  business asset
                </li>
              </ul>

              <h2>Your Choices</h2>
              <p>
                You can access and update certain information about yourself
                from within your account settings. You can also request that we
                delete your account and associated data by contacting our
                support team.
              </p>

              <h2>Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track
                activity on our service and hold certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our service is not intended for use by children under the age of
                13, and we do not knowingly collect personal information from
                children under 13.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p>
                Email: privacy@secretshare.example.com
                <br />
                Address: 123 Security Street, Suite 456, San Francisco, CA 94103
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
