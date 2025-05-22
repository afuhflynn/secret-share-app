"use client";

import { useState } from "react";
import Link from "next/link";
import type { Secret } from "@prisma/client";
import { Copy, Download, Lock } from "lucide-react";

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
import { toast } from "@/hooks/use-toast";

interface AccessSecretProps {
  secret: Secret;
  expires: Date;
}

export function AccessSecret({ secret, expires }: AccessSecretProps) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
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

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Secure Environment Variables
          </h1>
          <p className="text-sm text-muted-foreground">
            Someone has shared environment variables with you.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{secret.name}</CardTitle>
            <CardDescription>
              Expires at {new Date(expires).toLocaleDateString()}
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
                value={secret.content}
                readOnly
                className="font-mono h-40"
              />
            </div>

            <div className="rounded-md bg-muted p-4">
              <p className="text-sm">
                <strong>Note:</strong> This is a one-time view. Once you leave
                this page, you may not be able to access these environment
                variables again.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-center">
              <Link href="/">
                <Button variant="outline">Go to Homepage</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
