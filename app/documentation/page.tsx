import Link from "next/link";
import {
  ArrowLeft,
  Book,
  ChevronRight,
  Code,
  FileText,
  Lock,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/footer";
import Navbar from "@/components/main-navbar";

export default function DocumentationPage() {
  const guides = [
    {
      id: "getting-started",
      title: "Getting Started",
      description:
        "Learn the basics of SecretShare and how to create your first secret.",
      icon: Book,
    },
    {
      id: "sharing-secrets",
      title: "Sharing Secrets",
      description: "Learn how to securely share your secrets with others.",
      icon: FileText,
    },
    {
      id: "api-reference",
      title: "API Reference",
      description: "Integrate SecretShare into your applications with our API.",
      icon: Code,
    },
    {
      id: "security",
      title: "Security",
      description:
        "Learn about our security practices and how we protect your data.",
      icon: Lock,
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
                Documentation
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Learn how to use SecretShare to securely share sensitive
                information.
              </p>
              <div className="relative mt-8">
                <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  className="max-w-md pl-10 mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="guides" className="mb-12">
                <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
                  <TabsTrigger value="guides">Guides</TabsTrigger>
                  <TabsTrigger value="api">API Reference</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                </TabsList>
                <TabsContent value="guides">
                  <div className="grid gap-6 mt-8 md:grid-cols-2">
                    {guides.map((guide) => (
                      <Link key={guide.id} href={`/documentation/${guide.id}`}>
                        <Card className="h-full transition-colors hover:border-primary">
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                                <guide.icon className="w-4 h-4 text-primary" />
                              </div>
                              <CardTitle className="text-xl">
                                {guide.title}
                              </CardTitle>
                            </div>
                            <CardDescription>
                              {guide.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center text-sm text-primary">
                              Read guide
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="api">
                  <div className="p-6 mt-8 border rounded-lg shadow-sm bg-card">
                    <h2 className="mb-4 text-2xl font-bold">API Reference</h2>
                    <p className="mb-6 text-muted-foreground">
                      Integrate SecretShare into your applications with our
                      RESTful API. Our API allows you to programmatically
                      create, share, and manage secrets.
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 rounded-md bg-muted">
                        <h3 className="mb-2 font-medium">Authentication</h3>
                        <p className="mb-2 text-sm text-muted-foreground">
                          All API requests require authentication using an API
                          key.
                        </p>
                        <div className="p-3 font-mono text-sm border rounded bg-card">
                          Authorization: Bearer YOUR_API_KEY
                        </div>
                      </div>
                      <div className="p-4 rounded-md bg-muted">
                        <h3 className="mb-2 font-medium">Create a Secret</h3>
                        <p className="mb-2 text-sm text-muted-foreground">
                          Create a new secret with the specified content and
                          expiration settings.
                        </p>
                        <div className="p-3 font-mono text-sm border rounded bg-card">
                          POST /api/v1/secrets
                        </div>
                      </div>
                      <div className="p-4 rounded-md bg-muted">
                        <h3 className="mb-2 font-medium">Get a Secret</h3>
                        <p className="mb-2 text-sm text-muted-foreground">
                          Retrieve a secret by its ID.
                        </p>
                        <div className="p-3 font-mono text-sm border rounded bg-card">
                          GET /api/v1/secrets/:id
                        </div>
                      </div>
                      <div className="p-4 rounded-md bg-muted">
                        <h3 className="mb-2 font-medium">Share a Secret</h3>
                        <p className="mb-2 text-sm text-muted-foreground">
                          Generate a share link for a secret.
                        </p>
                        <div className="p-3 font-mono text-sm border rounded bg-card">
                          POST /api/v1/secrets/:id/share
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button>View Full API Documentation</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="examples">
                  <div className="mt-8 space-y-8">
                    <div className="p-6 border rounded-lg shadow-sm bg-card">
                      <h2 className="mb-4 text-2xl font-bold">Code Examples</h2>
                      <p className="mb-6 text-muted-foreground">
                        Learn how to integrate SecretShare into your
                        applications with these code examples.
                      </p>
                      <div className="space-y-6">
                        <div>
                          <h3 className="mb-2 text-lg font-medium">
                            JavaScript / Node.js
                          </h3>
                          <div className="p-4 font-mono text-sm rounded-md bg-muted">
                            <pre>{`const axios = require('axios');

async function createSecret(content, expiryTime) {
  const response = await axios.post('https://api.secretshare.com/v1/secrets', {
    content,
    expiryTime
  }, {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  });
  
  return response.data;
}

// Example usage
createSecret('API_KEY=your_api_key', '7d')
  .then(secret => console.log(secret))
  .catch(error => console.error(error));`}</pre>
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-2 text-lg font-medium">Python</h3>
                          <div className="p-4 font-mono text-sm rounded-md bg-muted">
                            <pre>{`import requests

def create_secret(content, expiry_time):
    url = "https://api.secretshare.com/v1/secrets"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY"
    }
    payload = {
        "content": content,
        "expiryTime": expiry_time
    }
    
    response = requests.post(url, json=payload, headers=headers)
    return response.json()

# Example usage
secret = create_secret("API_KEY=your_api_key", "7d")
print(secret)`}</pre>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button>View More Examples</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="p-8 mt-16 border rounded-lg shadow-sm bg-card">
                <div className="mb-8 text-center">
                  <h2 className="mb-2 text-2xl font-bold">Need help?</h2>
                  <p className="text-muted-foreground">
                    Can't find what you're looking for? Our support team is here
                    to help.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link href="/support">
                    <Button className="w-full sm:w-auto">
                      Contact Support
                    </Button>
                  </Link>
                  <Link href="/faqs">
                    <Button variant="outline" className="w-full sm:w-auto">
                      View FAQ
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
