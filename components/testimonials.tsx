import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function Testimonials() {
  return (
    <section className="relative w-full h-auto py-16 overflow-hidden bg-gradient-to-b from-background to-muted/30 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto mb-12 max-w-[58rem] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
            Trusted by developers worldwide
          </h2>
          <p className="text-muted-foreground">
            See what our users have to say about SecretShare.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <span className="text-lg font-bold">F</span>
                </div>
                <div>
                  <h4 className="font-medium">Flynn Afuh</h4>
                  <p className="text-sm text-muted-foreground">
                    Full Stack Engineer @TicHub
                  </p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                "SecretShare has completely changed how our team handles
                sensitive information. No more worrying about secrets in emails
                or chat logs."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
