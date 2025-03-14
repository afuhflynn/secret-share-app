"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Copy, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useDemoAuth } from "@/components/providers/demo-auth-provider";

export default function SecretPage() {
  const params = useParams();
  const router = useRouter();
  const [secret, setSecret] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
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
        router.push(`/${user?.name}/dashboard`);
      }
    } else {
      router.push(`/${user?.name}/dashboard`);
    }
    setIsLoading(false);
  }, [params.id, router]);

  function copyToClipboard() {
    if (!secret) return;

    navigator.clipboard.writeText(secret.content);
    setCopied(true);

    toast({
      title: "Copied to clipboard",
      description:
        "The environment variables have been copied to your clipboard.",
    });

    setTimeout(() => setCopied(false), 2000);
  }

  function downloadAsFile() {
    if (!secret) return;

    const element = document.createElement("a");
    const file = new Blob([secret.content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${secret.name.toLowerCase().replace(/\s+/g, "-")}.env`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Downloaded",
      description: "The environment variables have been downloaded as a file.",
    });
  }

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

  return (
    <div className="mx-auto max-w-2xl">
      <Button
        variant="ghost"
        className="mb-4 flex items-center text-muted-foreground"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{secret.name}</CardTitle>
          <CardDescription>
            Created on {new Date(secret.createdAt).toLocaleDateString()} •
            Expires on {new Date(secret.expiresAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Environment Variables</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadAsFile}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              value={
                secret.content ||
                `API_KEY=demo_api_key_${secret.id}\nDATABASE_URL=demo_database_url_${secret.id}\nSECRET_KEY=demo_secret_key_${secret.id}`
              }
              readOnly
              className="font-mono h-40"
            />
          </div>

          <div className="rounded-md bg-muted p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sharing</h4>
                <p className="text-sm text-muted-foreground">
                  Share this secret with others
                </p>
              </div>
              <Link href={`/${user?.name}/dashboard/secret/${secret.id}/share`}>
                <Button>Share Secret</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
