/**
 * This component handles the accessibility of secret by outside visitors
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
import Logo from "@/components/logo";
import { Secret } from "@prisma/client";
import { privateAxios } from "@/utils/axios.config";
import { decryptData } from "@/lib/encryption";
import { devLog } from "@/utils/devLog";

export default function AccessSecretPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [secret, setSecret] = useState<Secret | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchSecret = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await privateAxios.get<{
        secret: Secret;
        message: string;
      }>(`/api/v1/secrets/${params.id}/shares/${params.token}`);
      const decryptedName = await decryptData(
        data.secret.name,
        process.env.NEXT_PUBLIC_SECRETS_PASSWORD!
      );
      const decryptedContent = await decryptData(
        data.secret.content,
        process.env.NEXT_PUBLIC_SECRETS_PASSWORD!
      );

      const decrypted = {
        ...data.secret,
        name: decryptedName,
        content: decryptedContent,
      };
      setSecret(decrypted);
      toast({
        title: "Secret Shared",
        description:
          data.message || "The environment variables shared successfully.",
      });
      devLog("Decrypted secrets:", decrypted);
      // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
    } catch (error: Error) {
      devLog("Failed to fetch secrets:", error);
      if (error.response) {
        toast({
          title: "Error",
          description:
            error.response.data.message ||
            "Failed to fetch secret. Please try again.",
          variant: "destructive",
        });
        setError(error.response.data.message);
      } else
        toast({
          title: "Error",
          description: "Failed to fetch secret. Please try again.",
          variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  }, [setSecret, setIsLoading]);

  // load secrets once
  useEffect(() => {
    fetchSecret();
  }, [fetchSecret]);

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

  useEffect(() => {
    if (!secret) {
      // redirect("/dashboard");
    }
  }, [secret]);
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md mx-auto space-y-6 flex flex-col items-center">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo hideText />
          <h1 className="text-2xl font-semibold tracking-tight">
            Secure Environment Variables
          </h1>
          <p className="text-sm text-muted-foreground">
            Someone has shared environment variables with you.
          </p>
        </div>

        {isLoading ? (
          <Card className="w-[36rem]">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="w-12 h-12 border-4 rounded-full animate-spin border-primary border-t-transparent" />
              <p className="mt-4 text-sm text-muted-foreground">
                Loading environment variables...
              </p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="w-[36rem]">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="p-3 rounded-full bg-destructive/10">
                <Lock className="w-6 h-6 text-destructive" />
              </div>
              <h2 className="mt-4 text-xl font-semibold">Access Denied</h2>
              <p className="mt-2 text-sm text-center text-muted-foreground">
                {error}
              </p>
              <Link href="/" className="mt-6">
                <Button variant="outline">Go to Homepage</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-[36rem]">
            <CardHeader>
              <CardTitle>{secret?.name}</CardTitle>
              {secret && secret.expiresAt && (
                <CardDescription>
                  Expires at {new Date(secret?.expiresAt).toLocaleDateString()}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0">
                  <h3 className="text-sm font-medium">Environment Variables</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadAsFile}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={secret?.content}
                  disabled
                  readOnly
                  className="h-[18rem] font-mono"
                />
              </div>

              <div className="p-4 rounded-md bg-muted">
                <p className="text-sm">
                  <strong>Note:</strong> This is a one-time view. Once you leave
                  this page, you may not be able to access these environment
                  variables again.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-center w-full">
                <Link href="/">
                  <Button variant="outline">Go to Homepage</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
