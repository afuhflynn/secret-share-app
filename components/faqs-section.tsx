import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function FAQsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-[58rem] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Find answers to common questions about SecretShare.
          </p>
        </div>
        <div className="grid max-w-3xl gap-6 mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                How secure is SecretShare?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                SecretShare uses end-to-end encryption, meaning your secrets are
                encrypted in your browser before being sent to our servers. We
                never have access to your unencrypted data. We use
                industry-standard AES-256 encryption to ensure your data remains
                secure.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Can I use SecretShare for free?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Yes! Our free plan allows you to share up to 5 secrets with a
                7-day expiration. This is perfect for individual developers or
                small projects. For more features and longer expiration times,
                check out our Pro and Enterprise plans.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                How do expiring secrets work?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You can set your secrets to expire after a specific time period
                (e.g., 1 hour, 24 hours, 7 days) or after a certain number of
                views. Once the expiration condition is met, the secret is
                permanently deleted from our servers and can no longer be
                accessed.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Can I restrict who can access my secrets?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Yes, with our Pro and Enterprise plans, you can restrict access
                to specific email addresses. Only users with those email
                addresses will be able to view the secret. You can also receive
                notifications when someone accesses your secret.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
