"use client";

import { useState } from "react";
import Link from "next/link";
import type { Secret } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

interface DashboardSecretsProps {
  initialSecrets: Secret[];
}

export function DashboardSecrets({ initialSecrets }: DashboardSecretsProps) {
  const [secrets, setSecrets] = useState<Secret[]>(initialSecrets);

  return (
    <>
      {secrets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold">No secrets yet</h3>
              <p className="text-sm text-muted-foreground">
                Create your first secret to get started.
              </p>
              <Link href="/create" className="inline-block mt-4">
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
                      {new Date(secret.expiresAt as Date).toLocaleDateString()}
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
                  <Link href={`/secret/${secret.id}`}>View</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/secret/${secret.id}/share`}>Share</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
