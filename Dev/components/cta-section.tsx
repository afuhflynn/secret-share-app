import Link from "next/link";
import { Button } from "./ui/button";

export default function CTASection() {
  return (
    <section className="relative flex items-center w-full py-16 overflow-hidden bg-primary text-primary-foreground md:py-24 lg:py-32 h-auto">
      <div className="container">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
            Ready to share secrets securely?
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Join thousands of developers who trust SecretShare for their
            sensitive information.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Get Started for Free
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-foreground hover:text-white dark:hover:text-black sm:w-auto border-primary-foreground/20 hover:bg-primary-foreground/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
