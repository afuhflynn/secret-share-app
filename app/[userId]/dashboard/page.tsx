"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDemoAuth } from "@/components/providers/demo-auth-provider";

// Mock data for demo purposes
const mockSecrets = [
  {
    id: "1",
    name: "Development Environment",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    currentViews: 3,
    maxViews: 10,
  },
  {
    id: "2",
    name: "Production API Keys",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    currentViews: 1,
    maxViews: 5,
  },
];

export default function DashboardPage() {
  const { user, isDevelopment } = useDemoAuth();
  const [secrets, setSecrets] = useState<typeof mockSecrets>([]);

  useEffect(() => {
    // In a real app, we would fetch secrets from the API
    // For demo purposes, we'll use mock data
    const storedSecrets = localStorage.getItem("demoSecrets");
    if (storedSecrets) {
      setSecrets(JSON.parse(storedSecrets));
    } else {
      setSecrets(mockSecrets);
      localStorage.setItem("demoSecrets", JSON.stringify(mockSecrets));
    }
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      {isDevelopment && !user && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Development Mode:</strong>
          <span className="block sm:inline">
            {" "}
            You're viewing this page without authentication.
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Secrets</h1>
        <Link href={`/${user?.name}/dashboard/create`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Secret
          </Button>
        </Link>
      </div>

      {secrets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold">No secrets yet</h3>
              <p className="text-sm text-muted-foreground">
                Create your first secret to get started.
              </p>
              <Link
                href={`/${user?.name}/dashboard/create`}
                className="mt-4 inline-block"
              >
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Secret
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {secrets.map((secret) => (
            <Card key={secret.id}>
              <CardHeader>
                <CardTitle>{secret.name}</CardTitle>
                <CardDescription>
                  Created on {new Date(secret.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expires</span>
                    <span>
                      {new Date(secret.expiresAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Views</span>
                    <span>
                      {secret.currentViews}{" "}
                      {secret.maxViews ? `/ ${secret.maxViews}` : ""}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/${user?.name}/dashboard/secret/${secret.id}`}>
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/${user?.name}/dashboard/secret/${secret.id}/share`}
                  >
                    Share
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
