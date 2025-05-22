"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
import { BackButton } from "@/components/back-button";
import { privateAxios } from "@/utils/axios.config";
import { Secret } from "@prisma/client";
import { decryptData, encryptData } from "@/lib/encryption";
import { devLog } from "@/utils/devLog";
import { Loading } from "@/components/ui/loading";

export default function EditSecretPage() {
  const params = useParams();
  const [secret, setSecret] = useState<Secret | null>(null);
  const [secretValue, setSecretValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

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
      setSecretValue(decrypted.content);
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

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsUpdating(true);

    try {
      // NOTE: Encrypt data before sending
      const encryptedData = await encryptData(
        secretValue,
        process.env.NEXT_PUBLIC_SECRETS_PASSWORD!
      );
      const res = await privateAxios.put<{ message: string }>(
        `/api/v1/secrets/${params.id}/secrets`,
        {
          content: encryptedData,
        }
      );
      toast({
        title: "Secret updated",
        description:
          res.data.message || "Your secret has been updated successfully.",
      });
      // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
    } catch (error: Error) {
      devLog(error);
      if (error.response)
        toast({
          title: "Error",
          description:
            error.response.data.message ||
            "Failed to update secret. Please try again.",
          variant: "destructive",
        });
      else
        toast({
          title: "Error",
          description: "Failed to update secret. Please try again.",
          variant: "destructive",
        });
    } finally {
      setIsUpdating(false);
    }
  }
  if (isLoading) {
    return <Loading hideText />;
  }
  if (!secret) {
    return null;
  }
  return (
    <form className="max-w-2xl mx-auto pt-16" onSubmit={onSubmit}>
      <BackButton />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              Edit &apos;
              {secret.name.length > 34
                ? `${secret.name.substring(0, 34)}...`
                : secret.name}
              &apos;
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
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Environment Variables</h3>
            </div>
            <Textarea
              value={secretValue}
              onChange={(e) => setSecretValue(e.target.value)}
              className="h-[18rem] font-mono resize-y"
            />
          </div>

          <div className="p-4 rounded-md bg-muted">
            <div className="flex flex-col items-center justify-between gap-3 sm:gap-0 sm:flex-row">
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
