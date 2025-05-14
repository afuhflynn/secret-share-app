import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="flex items-center gap-2 mb-8">
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Terms of Service
              </h1>
              <p className="mt-4 text-muted-foreground">
                Last updated: June 1, 2025
              </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Please read these Terms of Service ("Terms", "Terms of Service")
                carefully before using the SecretShare website and service
                operated by SecretShare, Inc. ("us", "we", "our").
              </p>

              <p>
                Your access to and use of the Service is conditioned on your
                acceptance of and compliance with these Terms. These Terms apply
                to all visitors, users, and others who access or use the
                Service.
              </p>

              <p>
                By accessing or using the Service, you agree to be bound by
                these Terms. If you disagree with any part of the terms, then
                you may not access the Service.
              </p>

              <h2>1. Accounts</h2>
              <p>
                When you create an account with us, you must provide information
                that is accurate, complete, and current at all times. Failure to
                do so constitutes a breach of the Terms, which may result in
                immediate termination of your account on our Service.
              </p>

              <p>
                You are responsible for safeguarding the password that you use
                to access the Service and for any activities or actions under
                your password, whether your password is with our Service or a
                third-party service.
              </p>

              <p>
                You agree not to disclose your password to any third party. You
                must notify us immediately upon becoming aware of any breach of
                security or unauthorized use of your account.
              </p>

              <h2>2. Service Usage</h2>
              <p>
                Our service is designed to help you securely share sensitive
                information. You agree to use the service only for lawful
                purposes and in accordance with these Terms.
              </p>

              <p>You agree not to use the Service:</p>
              <ul>
                <li>
                  In any way that violates any applicable national or
                  international law or regulation.
                </li>
                <li>
                  To transmit, or procure the sending of, any advertising or
                  promotional material, including any "junk mail", "chain
                  letter", "spam", or any other similar solicitation.
                </li>
                <li>
                  To impersonate or attempt to impersonate the Company, a
                  Company employee, another user, or any other person or entity.
                </li>
                <li>
                  To share illegal content, malware, or any content designed to
                  harm others.
                </li>
              </ul>

              <h2>3. Content Responsibility</h2>
              <p>
                You are solely responsible for the content that you share
                through our Service. While we employ end-to-end encryption and
                cannot access the unencrypted content of your secrets, you agree
                not to use our Service to share:
              </p>
              <ul>
                <li>Content that infringes on intellectual property rights</li>
                <li>Illegal content or materials</li>
                <li>Malicious software or code</li>
                <li>Content that violates the privacy or rights of others</li>
              </ul>

              <h2>4. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and
                functionality are and will remain the exclusive property of
                SecretShare, Inc. and its licensors. The Service is protected by
                copyright, trademark, and other laws of both the United States
                and foreign countries.
              </p>

              <p>
                Our trademarks and trade dress may not be used in connection
                with any product or service without the prior written consent of
                SecretShare, Inc.
              </p>

              <h2>5. Subscription and Payments</h2>
              <p>
                Some parts of the Service are billed on a subscription basis.
                You will be billed in advance on a recurring and periodic basis,
                depending on the type of subscription plan you select.
              </p>

              <p>
                At the end of each period, your subscription will automatically
                renew under the same conditions unless you cancel it or
                SecretShare, Inc. cancels it.
              </p>

              <p>
                You may cancel your subscription either through your online
                account management page or by contacting our customer support
                team.
              </p>

              <h2>6. Free Trial</h2>
              <p>
                We may, at our sole discretion, offer a subscription with a free
                trial for a limited period of time.
              </p>

              <p>
                You may be required to enter your billing information to sign up
                for the free trial. If you do enter your billing information
                when signing up for a free trial, you will not be charged by
                SecretShare, Inc. until the free trial has expired.
              </p>

              <h2>7. Limitation of Liability</h2>
              <p>
                In no event shall SecretShare, Inc., nor its directors,
                employees, partners, agents, suppliers, or affiliates, be liable
                for any indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul>
                <li>
                  Your access to or use of or inability to access or use the
                  Service;
                </li>
                <li>
                  Any conduct or content of any third party on the Service;
                </li>
                <li>Any content obtained from the Service; and</li>
                <li>
                  Unauthorized access, use or alteration of your transmissions
                  or content.
                </li>
              </ul>

              <h2>8. Disclaimer</h2>
              <p>
                Your use of the Service is at your sole risk. The Service is
                provided on an "AS IS" and "AS AVAILABLE" basis. The Service is
                provided without warranties of any kind, whether express or
                implied, including, but not limited to, implied warranties of
                merchantability, fitness for a particular purpose,
                non-infringement or course of performance.
              </p>

              <h2>9. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with
                the laws of the State of California, United States, without
                regard to its conflict of law provisions.
              </p>

              <p>
                Our failure to enforce any right or provision of these Terms
                will not be considered a waiver of those rights. If any
                provision of these Terms is held to be invalid or unenforceable
                by a court, the remaining provisions of these Terms will remain
                in effect.
              </p>

              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days' notice prior to any new
                terms taking effect.
              </p>

              <p>
                By continuing to access or use our Service after those revisions
                become effective, you agree to be bound by the revised terms. If
                you do not agree to the new terms, please stop using the
                Service.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <ul>
                <li>Email: secretshare-legal@gmail.com</li>
                <li>
                  Address: Biscuiterie, Biyem-Assi, Nfoundi, Yaounde, Cameroon
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
