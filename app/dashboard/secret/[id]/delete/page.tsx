"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
import { decryptData } from "@/lib/encryption";
import { devLog } from "@/utils/devLog";
import { Loading } from "@/components/ui/loading";

export default function EditSecretPage() {
  const params = useParams();
  const router = useRouter();
  const [secret, setSecret] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

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

  useEffect(() => {}, [params.id, router]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDeleting(true);

    try {
      const res = await privateAxios.delete<{ message: string }>(
        `/api/v1/secrets/${params.id}/secrets`
      );

      toast({
        title: "Secret deleted",
        description:
          res.data.message || "Your secret has been deleted successfully.",
      });

      router.push("/dashboard");
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
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    <Loading hideText />;
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
              Delete &apos;
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
              className="h-[18rem] font-mono resize-none"
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
