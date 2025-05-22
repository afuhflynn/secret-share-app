"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Copy, Download, Edit } from "lucide-react";

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
import { BackButton } from "@/components/back-button";
import { privateAxios } from "@/utils/axios.config";
import { Secret } from "@prisma/client";
import { decryptData } from "@/lib/encryption";
import { devLog } from "@/utils/devLog";
import { Loading } from "@/components/ui/loading";

export default function SecretSharePage() {
  const params = useParams();
  const [secret, setSecret] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchSecret = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await privateAxios.get<{ secret: Secret }>(
        `/api/v1/secrets/${params.id}/secrets`
      );
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
      devLog("Decrypted secrets:", decrypted);
    } catch (err) {
      devLog("Failed to fetch secrets:", err);
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

  if (isLoading) return <Loading hideText />;

  if (!secret) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto pt-16">
      <BackButton />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {secret.name.length > 34
                ? `${secret.name.substring(0, 34)}...`
                : secret.name}
            </CardTitle>
            <CardDescription className="mt-4 flex items-start sm:items-center flex-col sm:flex-row sm:gap-2 gap-1">
              <span>
                Created at {new Date(secret.createdAt).toLocaleDateString()}
              </span>
              <span className="hidden sm:block">•</span>
              {secret.expiresAt && (
                <span>
                  Expires at {new Date(secret.expiresAt).toLocaleDateString()}
                </span>
              )}
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
              className="h-[18rem] font-mono"
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
