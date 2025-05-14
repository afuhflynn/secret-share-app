"use client";

import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
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
      } else {
        router.push(`/${user?.name}`);
      }
    } else {
      router.push(`/${user?.name}`);
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
    setIsDeleting(true);

    try {
      // Demo mode - simulate creating a secret
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Secret deleted",
        description: "Your secret has been deleted successfully.",
        variant: "destructive",
      });

      router.push(`/${user?.name}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update secret. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
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
            <CardTitle>
              Delete &apos;
              {secret.name.length > 34
                ? `${secret.name.substring(0, 34)}...`
                : secret.name}
              &apos;
            </CardTitle>
            <CardDescription>
              Created on {new Date(secret.createdAt).toLocaleDateString()} •
              Expires on {new Date(secret.expiresAt).toLocaleDateString()}
            </CardDescription>
            <CardDescription className="pt-2 text-red-500">
              The action you are about to perform cannot be undone. Are you sure
              you want to delete this secret?
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Environment Variables</h3>
            </div>
            <Textarea
              value={secret.content}
              readOnly
              className="h-40 font-mono resize-none"
            />
          </div>

          <div className="p-4 rounded-md bg-muted">
            <div className="flex flex-col items-center justify-between gap-3 sm:gap-0 sm:flex-row">
              <div>
                <h4 className="font-medium">Confirm Delete</h4>
                <p className="text-sm text-muted-foreground">
                  Click the button on the right to delete the secret.
                </p>
              </div>
              <CardFooter>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Secret"}
                </Button>
              </CardFooter>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
