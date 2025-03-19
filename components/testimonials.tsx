import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
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
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <span className="text-lg font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-medium">Sarah Miller</h4>
                  <p className="text-sm text-muted-foreground">
                    DevOps Engineer
                  </p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                "The expiring links feature is a game-changer. I can share
                credentials with contractors and know they'll expire
                automatically."
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <span className="text-lg font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-medium">Michael Chen</h4>
                  <p className="text-sm text-muted-foreground">CTO</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                "We've integrated SecretShare into our onboarding process. New
                team members get exactly the credentials they need, securely."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
