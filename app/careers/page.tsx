import Link from "next/link";
import {
  ArrowLeft,
  Coffee,
  DollarSign,
  Globe,
  GraduationCap,
  Heart,
  Lock,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/footer";
import Navbar from "@/components/main-navbar";

export default function CareersPage() {
  const benefits = [
    {
      title: "Competitive Salary",
      description:
        "We offer top-of-market compensation packages to attract and retain the best talent.",
      icon: DollarSign,
    },
    {
      title: "Remote-First",
      description:
        "Work from anywhere in the world. We believe in hiring the best talent, regardless of location.",
      icon: Globe,
    },
    {
      title: "Health Benefits",
      description:
        "Comprehensive health, dental, and vision insurance for you and your dependents.",
      icon: Heart,
    },
    {
      title: "Learning Budget",
      description:
        "$2,000 annual budget for conferences, courses, books, and other learning opportunities.",
      icon: GraduationCap,
    },
    {
      title: "Flexible Hours",
      description:
        "We care about results, not when you work. Set your own schedule that works for you.",
      icon: Coffee,
    },
    {
      title: "Team Retreats",
      description:
        "Twice-yearly company retreats to connect, collaborate, and celebrate our achievements.",
      icon: Users,
    },
  ];

  const openPositions = [
    {
      id: "senior-frontend-engineer",
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "We're looking for a Senior Frontend Engineer to help build and improve our web application. You'll work closely with our design and product teams to create intuitive and responsive user interfaces.",
    },
    {
      id: "security-engineer",
      title: "Security Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "As a Security Engineer at SecretShare, you'll help ensure our platform remains secure and trustworthy. You'll conduct security audits, implement security best practices, and stay up-to-date with the latest security threats.",
    },
    {
      id: "product-manager",
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description:
        "We're seeking a Product Manager to help define and execute our product roadmap. You'll work closely with our engineering, design, and marketing teams to build features that delight our users.",
    },
    {
      id: "customer-success-manager",
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description:
        "As a Customer Success Manager, you'll help our customers get the most out of SecretShare. You'll provide onboarding, training, and ongoing support to ensure our customers are successful.",
    },
    {
      id: "marketing-specialist",
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description:
        "We're looking for a Marketing Specialist to help grow our user base. You'll create and execute marketing campaigns, manage our social media presence, and analyze the results to continuously improve our marketing efforts.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
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
                Join Our Team
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Help us build the future of secure information sharing.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                <div>
                  <h2 className="mb-4 text-3xl font-bold tracking-tighter">
                    Why Work at SecretShare?
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      At SecretShare, we're on a mission to make sharing
                      sensitive information secure, simple, and stress-free.
                      We're a team of security experts, engineers, designers,
                      and product thinkers who are passionate about building
                      tools that help people work more securely.
                    </p>
                    <p>
                      We believe in hiring the best talent, regardless of
                      location, and providing them with the resources and
                      support they need to do their best work. We're a
                      remote-first company with team members across the globe,
                      united by our shared values and mission.
                    </p>
                    <p>
                      If you're passionate about security, privacy, and building
                      great products, we'd love to hear from you.
                    </p>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg aspect-video bg-muted">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="SecretShare team"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Our Values
                </h2>
                <p className="mt-4 text-muted-foreground">
                  The principles that guide our work and decisions.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                <Card className="bg-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">Security First</h3>
                    <p className="text-sm text-muted-foreground">
                      We never compromise on security. Every feature and
                      decision is evaluated through the lens of security and
                      privacy.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">User-Centric</h3>
                    <p className="text-sm text-muted-foreground">
                      We believe security tools should be intuitive and
                      accessible. We design for humans, not just security
                      experts.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">Transparency</h3>
                    <p className="text-sm text-muted-foreground">
                      We're open about how our technology works and our business
                      practices. Trust is earned through transparency.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Benefits & Perks
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We take care of our team so they can focus on doing their best
                  work.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit) => (
                  <Card key={benefit.title} className="bg-card">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                        <benefit.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Open Positions
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Join our team and help us build the future of secure
                  information sharing.
                </p>
              </div>
              <div className="space-y-6">
                {openPositions.map((position) => (
                  <Card key={position.id} className="bg-card">
                    <CardHeader>
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <CardTitle>{position.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {position.department} • {position.location} •{" "}
                            {position.type}
                          </CardDescription>
                        </div>
                        <Link href={`/careers/${position.id}`}>
                          <Button>View Position</Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {position.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                <div className="relative overflow-hidden rounded-lg aspect-video bg-muted">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="SecretShare office"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h2 className="mb-4 text-3xl font-bold tracking-tighter">
                    Our Hiring Process
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">
                          Application Review
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          We review your application and resume to determine if
                          there's a potential fit.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Initial Interview</h3>
                        <p className="text-sm text-muted-foreground">
                          A 30-minute video call with a hiring manager to
                          discuss your background and the role.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">
                          Technical Assessment
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          A take-home assignment or technical interview,
                          depending on the role.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                        <span className="text-sm font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Team Interviews</h3>
                        <p className="text-sm text-muted-foreground">
                          Meet with potential teammates and cross-functional
                          partners.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                        <span className="text-sm font-bold">5</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Final Interview</h3>
                        <p className="text-sm text-muted-foreground">
                          A conversation with a founder or executive to discuss
                          company vision and your role in it.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                        <span className="text-sm font-bold">6</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Offer</h3>
                        <p className="text-sm text-muted-foreground">
                          If there's a mutual fit, we'll extend an offer and
                          welcome you to the team!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground md:py-24">
          <div className="container">
            <div className="mx-auto max-w-[58rem] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
                Don't see a role that fits?
              </h2>
              <p className="mb-8 text-primary-foreground/80">
                We're always looking for talented individuals who are passionate
                about security and building great products.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="mailto:careers@secretshare.example.com">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Send Us Your Resume
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-foreground hover:text-white dark:hover:text-black sm:w-auto border-primary-foreground/20 hover:bg-primary-foreground/10"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
