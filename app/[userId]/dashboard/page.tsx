"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Plus, Trash2 } from "lucide-react";

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
      setSecrets([]);
      localStorage.setItem("demoSecrets", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      {isDevelopment && !user && (
        <div className="relative px-4 py-3 mb-4 text-yellow-800 bg-yellow-100 border border-yellow-400 rounded dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-100">
          <strong className="font-bold">Development Mode:</strong>
          <span className="block sm:inline">
            {" "}
            You're viewing this page without authentication.
          </span>
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <h1 className="text-3xl font-bold">Your Secrets</h1>
        <Link href={`/${user?.name}/dashboard/create`}>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
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
                className="inline-block mt-4"
              >
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Secret
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {secrets.map((secret, index) => (
            <Card
              key={`item-${secret.id}-${secret.name}-${index}`}
              className="relative group hover:shadow-md"
            >
              <CardHeader>
                <CardTitle>{secret.name}</CardTitle>
                <CardDescription>
                  Created on {new Date(secret.createdAt).toLocaleDateString()}
                </CardDescription>
                <div className="absolute flex flex-row items-center top-3 right-3">
                  <Link
                    href={`/${user?.name}/dashboard/secret/${secret.id}/edit`}
                    className="transition-opacity opacity-0 group-hover:opacity-100"
                  >
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Edit className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                  <Link
                    href={`/${user?.name}/dashboard/secret/${secret.id}/delete`}
                    className="transition-opacity opacity-0 group-hover:opacity-100"
                  >
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </Link>
                </div>
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
