import Link from "next/link";
import { ArrowLeft, Building, Check, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/footer";
import Navbar from "@/components/main-navbar";

export default async function JobPostingPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app, you would fetch the job posting data from an API or CMS
  // For this demo, we'll use hardcoded data
  const jobPostings = {
    "senior-frontend-engineer": {
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "We're looking for a Senior Frontend Engineer to help build and improve our web application. You'll work closely with our design and product teams to create intuitive and responsive user interfaces.",
      responsibilities: [
        "Design, build, and maintain high-quality, reusable frontend components",
        "Collaborate with designers, product managers, and other engineers to deliver features",
        "Write clean, maintainable, and well-tested code",
        "Optimize applications for maximum speed and scalability",
        "Stay up-to-date with emerging trends and technologies in frontend development",
      ],
      requirements: [
        "5+ years of experience in frontend development",
        "Strong proficiency in JavaScript, TypeScript, HTML, and CSS",
        "Experience with modern frontend frameworks (React, Vue, Angular)",
        "Understanding of responsive design and cross-browser compatibility",
        "Experience with state management (Redux, MobX, Vuex)",
        "Familiarity with RESTful APIs and GraphQL",
        "Strong communication and collaboration skills",
        "Experience with testing frameworks (Jest, React Testing Library)",
      ],
      preferred: [
        "Experience with Next.js or similar frameworks",
        "Experience with CSS-in-JS libraries (styled-components, Emotion)",
        "Experience with design systems and component libraries",
        "Experience with performance optimization techniques",
        "Experience with accessibility (WCAG)",
        "Open source contributions",
      ],
    },
    "security-engineer": {
      title: "Security Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "As a Security Engineer at SecretShare, you'll help ensure our platform remains secure and trustworthy. You'll conduct security audits, implement security best practices, and stay up-to-date with the latest security threats.",
      responsibilities: [
        "Design and implement security measures to protect our systems and data",
        "Conduct security assessments, penetration testing, and vulnerability analysis",
        "Develop and maintain security standards, best practices, and procedures",
        "Monitor systems for security breaches and investigate incidents",
        "Collaborate with engineering teams to ensure security is built into our products",
        "Stay up-to-date with the latest security threats and vulnerabilities",
      ],
      requirements: [
        "3+ years of experience in security engineering or related field",
        "Strong knowledge of web application security, cryptography, and network security",
        "Experience with security tools and frameworks",
        "Familiarity with OWASP Top 10 and common security vulnerabilities",
        "Experience with penetration testing and vulnerability assessment",
        "Strong problem-solving and analytical skills",
        "Excellent communication and documentation skills",
      ],
      preferred: [
        "Security certifications (CISSP, CEH, OSCP)",
        "Experience with cloud security (AWS, GCP, Azure)",
        "Knowledge of compliance frameworks (SOC 2, GDPR, HIPAA)",
        "Experience with security automation and tooling",
        "Background in software development",
        "Experience with incident response and forensics",
      ],
    },
    "product-manager": {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description:
        "We're seeking a Product Manager to help define and execute our product roadmap. You'll work closely with our engineering, design, and marketing teams to build features that delight our users.",
      responsibilities: [
        "Define and prioritize product features and requirements",
        "Collaborate with engineering, design, and marketing teams to deliver high-quality products",
        "Conduct user research and gather feedback to inform product decisions",
        "Analyze product metrics and user behavior to drive product improvements",
        "Create and maintain product roadmaps and documentation",
        "Communicate product vision and strategy to stakeholders",
      ],
      requirements: [
        "3+ years of experience in product management",
        "Strong understanding of product development processes",
        "Experience working with engineering and design teams",
        "Excellent communication and presentation skills",
        "Data-driven decision making and analytical skills",
        "Strong problem-solving and prioritization skills",
      ],
      preferred: [
        "Experience with B2B SaaS products",
        "Technical background or experience in software development",
        "Experience with security or privacy-focused products",
        "Knowledge of user research methodologies",
        "Experience with agile development methodologies",
        "MBA or relevant advanced degree",
      ],
    },
    "customer-success-manager": {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description:
        "As a Customer Success Manager, you'll help our customers get the most out of SecretShare. You'll provide onboarding, training, and ongoing support to ensure our customers are successful.",
      responsibilities: [
        "Onboard new customers and ensure they're set up for success",
        "Provide ongoing support and training to customers",
        "Build and maintain strong relationships with key stakeholders",
        "Identify upsell and cross-sell opportunities",
        "Gather customer feedback and share insights with product and engineering teams",
        "Monitor customer health and proactively address issues",
      ],
      requirements: [
        "3+ years of experience in customer success, account management, or similar role",
        "Strong communication and interpersonal skills",
        "Experience with B2B SaaS products",
        "Problem-solving and conflict resolution skills",
        "Ability to understand technical concepts and explain them to non-technical users",
        "Experience with CRM software (Salesforce, HubSpot)",
      ],
      preferred: [
        "Experience with security or privacy-focused products",
        "Technical background or experience in software development",
        "Experience with customer success tools (Gainsight, ChurnZero)",
        "Experience with data analysis and reporting",
        "Knowledge of best practices for customer onboarding and retention",
        "Experience with creating customer documentation and training materials",
      ],
    },
    "marketing-specialist": {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description:
        "We're looking for a Marketing Specialist to help grow our user base. You'll create and execute marketing campaigns, manage our social media presence, and analyze the results to continuously improve our marketing efforts.",
      responsibilities: [
        "Create and execute marketing campaigns across various channels",
        "Manage our social media presence and content calendar",
        "Write blog posts, case studies, and other marketing content",
        "Analyze marketing metrics and optimize campaigns",
        "Collaborate with product and design teams on marketing materials",
        "Stay up-to-date with industry trends and competitor activities",
      ],
      requirements: [
        "2+ years of experience in marketing, preferably in B2B SaaS",
        "Strong writing and communication skills",
        "Experience with digital marketing channels (email, social media, content)",
        "Analytical skills and experience with marketing analytics tools",
        "Creativity and attention to detail",
        "Ability to work independently and as part of a team",
      ],
      preferred: [
        "Experience with security or privacy-focused products",
        "Experience with marketing automation tools (HubSpot, Marketo)",
        "Knowledge of SEO best practices",
        "Experience with paid advertising (Google Ads, LinkedIn Ads)",
        "Graphic design skills and experience with design tools",
        "Experience with event marketing and webinars",
      ],
    },
  };

  const jobId = await params.id;

  const job = jobPostings[jobId as keyof typeof jobPostings];

  if (!job) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <div className="container py-16 md:py-24">
            <div className="flex items-center gap-2 mb-8">
              <Link
                href="/careers"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Careers
              </Link>
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                Job Not Found
              </h1>
              <p className="mb-8 text-muted-foreground">
                The job posting you're looking for doesn't exist or has been
                removed.
              </p>
              <Link href="/careers">
                <Button>View All Positions</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="flex items-center gap-2 mb-8">
            <Link
              href="/careers"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Link>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{job.type}</span>
                </div>
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About the Role</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-muted-foreground">{job.description}</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-lg font-bold">Responsibilities</h3>
                    <ul className="space-y-2">
                      {job.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-bold">Requirements</h3>
                    <ul className="space-y-2">
                      {job.requirements.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-bold">Nice to Have</h3>
                    <ul className="space-y-2">
                      {job.preferred.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  Apply for this Position
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About SecretShare</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  At SecretShare, we're on a mission to make sharing sensitive
                  information secure, simple, and stress-free. We're a team of
                  security experts, engineers, designers, and product thinkers
                  who are passionate about building tools that help people work
                  more securely.
                </p>
                <p className="mb-4 text-muted-foreground">
                  We believe in hiring the best talent, regardless of location,
                  and providing them with the resources and support they need to
                  do their best work. We're a remote-first company with team
                  members across the globe, united by our shared values and
                  mission.
                </p>
                <p className="text-muted-foreground">
                  If you're passionate about security, privacy, and building
                  great products, we'd love to hear from you.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/about" className="text-primary hover:underline">
                  Learn more about SecretShare
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
