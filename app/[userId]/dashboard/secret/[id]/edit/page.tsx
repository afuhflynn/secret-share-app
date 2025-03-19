"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useDemoAuth } from "@/components/providers/demo-auth-provider";
import { toast } from "@/hooks/use-toast";

export default function EditSecretPage() {
  const params = useParams();
  const router = useRouter();
  const [secret, setSecret] = useState<any>(null);
  const [secretValue, setSecretValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useDemoAuth();

  useEffect(() => {
    // In a real app, we would fetch the secret from the API
    // For demo purposes, we'll use localStorage
    const storedSecrets = localStorage.getItem("demoSecrets");
    if (storedSecrets) {
      const secrets = JSON.parse(storedSecrets);
      const foundSecret = secrets.find((s: any) => s.id === params.id);
      if (foundSecret) {
        setSecret(foundSecret);
        setSecretValue(foundSecret.content);
      } else {
        router.push(`${user?.name}/dashboard`);
      }
    } else {
      router.push(`${user?.name}/dashboard`);
    }
    setIsLoading(false);
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!secret) {
    return null;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsUpdating(true);

    try {
      // Demo mode - simulate creating a secret
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a new secret
      setSecret({ ...secret, content: secretValue });

      // Get existing secrets from localStorage
      const storedSecrets = localStorage.getItem("demoSecrets");
      const secrets = storedSecrets ? JSON.parse(storedSecrets) : [];

      // Update current secret
      secrets.map((item: any) => {
        if (item.id === params.id) {
          item = secret;
        }
      });

      // Save to localStorage
      localStorage.setItem("demoSecrets", JSON.stringify(secrets));

      toast({
        title: "Secret updated",
        description: "Your secret has been updated successfully.",
      });

      router.push(`/${user?.name}/dashboard`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update secret. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  }
  return (
    <form className="max-w-2xl mx-auto" onSubmit={onSubmit}>
      <Button
        variant="ghost"
        className="flex items-center mb-4 text-muted-foreground"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Edit &apos;{secret.name}&apos;</CardTitle>
            <CardDescription>
              Created on {new Date(secret.createdAt).toLocaleDateString()} •
              Expires on {new Date(secret.expiresAt).toLocaleDateString()}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Environment Variables</h3>
            </div>
            <Textarea
              value={secretValue}
              onChange={(e) => setSecretValue(e.target.value)}
              className="h-40 font-mono"
            />
          </div>

          <div className="p-4 rounded-md bg-muted">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Done Editing</h4>
                <p className="text-sm text-muted-foreground">
                  Click the button on the right to save the changes.
                </p>
              </div>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update Secret"}
                </Button>
              </CardFooter>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
