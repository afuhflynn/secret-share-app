"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Copy, Download, Edit } from "lucide-react";

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
import { BackButton } from "@/components/back-button";
import { useUserStore } from "@/store/user.store";

export default function SecretPage() {
  const params = useParams();
  const router = useRouter();
  const [secret, setSecret] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { secrets } = useUserStore();

  useEffect(() => {
    const s = secrets?.find((item) => item.id === params.id);
    setSecret(s);
    // In a real app, we would fetch the secret from the API
    // For demo purposes, we'll use localStorage
    // const storedSecrets = localStorage.getItem("demoSecrets");
    // if (storedSecrets) {
    //   const secrets = JSON.parse(storedSecrets);
    //   const foundSecret = secrets.find((s: any) => s.id === params.id);
    //   if (foundSecret) {
    //     setSecret(foundSecret);
    //   } else {
    //     router.push(`/dashboard`);
    //   }
    // } else {
    //   router.push(`dashboard`);
    // }
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

    const element = document.createElement("a"); // Initialize an anchor tag
    const file = new Blob([secret.content], { type: "text/plain" }); // Create a file
    element.href = URL.createObjectURL(file);
    element.download = `${secret.name.toLowerCase().replace(/\s+/g, "-")}.env`; // replace every space with -
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
    <div className="max-w-2xl mx-auto">
      <BackButton />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {secret.name.length > 34
                ? `${secret.name.substring(0, 34)}...`
                : secret.name}
            </CardTitle>
            <CardDescription>
              Created on {new Date(secret.createdAt).toLocaleDateString()} •
              Expires on {new Date(secret.expiresAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/secret/${secret.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <h3 className="text-sm font-medium">Environment Variables</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadAsFile}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              value={
                secret.content ||
                `API_KEY=demo_api_key_${secret.id}
DATABASE_URL=demo_database_url_${secret.id}
SECRET_KEY=demo_secret_key_${secret.id}`
              }
              readOnly
              className="h-[16rem] font-mono"
            />
          </div>

          <div className="p-4 rounded-md bg-muted">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <h4 className="font-medium">Sharing</h4>
                <p className="text-sm text-muted-foreground">
                  Share this secret with others
                </p>
              </div>
              <Link href={`/dashboard/secret/${secret.id}/share`}>
                <Button>Share Secret</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
