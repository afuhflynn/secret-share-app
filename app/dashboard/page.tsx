"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { Edit, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";

import { decryptData } from "@/lib/encryption";
import { privateAxios } from "@/utils/axios.config";
import { devLog } from "@/utils/devLog";
import { useUserStore } from "@/store/user.store";
import type { Secret } from "@prisma/client";

export default function DashboardPage() {
  const { isGettingUserProfile, getUserProfile, secrets, setSecrets } =
    useUserStore();

  const fetchSecrets = useCallback(async () => {
    try {
      const { data } = await privateAxios.get<{ secrets: Secret[] }>(
        "/api/v1/secrets"
      );
      const decrypted = await Promise.all(
        data.secrets.map(async (s) => ({
          ...s,
          name: await decryptData(
            s.name,
            process.env.NEXT_PUBLIC_SECRETS_PASSWORD!
          ),
          content: await decryptData(
            s.content,
            process.env.NEXT_PUBLIC_SECRETS_PASSWORD!
          ),
        }))
      );
      setSecrets(decrypted);
      devLog("Decrypted secrets:", decrypted);
    } catch (err) {
      devLog("Failed to fetch secrets:", err);
    }
  }, [setSecrets]);

  // load user profile once
  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  useEffect(() => {
    fetchSecrets();
  }, [fetchSecrets]);

  if (isGettingUserProfile) return <Loading hideText />;

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Your Secrets</h1>
        <Button asChild>
          <Link href="/dashboard/create">
            <Plus className="w-4 h-4 mr-2" /> Create New Secret
          </Link>
        </Button>
      </div>

      {/* Empty state */}
      {secrets && secrets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h3 className="text-lg font-semibold">No secrets yet</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Create your first secret to get started.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/create">
                <Plus className="w-4 h-4 mr-2" /> Create New Secret
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {secrets &&
            secrets.map((secret) => (
              <Card key={secret.id} className="relative group hover:shadow-md">
                <CardHeader>
                  <CardTitle>
                    {secret.name.length > 23
                      ? `${secret.name.slice(0, 23)}…`
                      : secret.name}
                  </CardTitle>
                  <CardDescription>
                    Created at {new Date(secret.createdAt).toDateString()}
                  </CardDescription>

                  {/* Edit/Delete buttons */}
                  <div className="absolute top-3 right-3 hidden flex-row items-center bg-background group-hover:flex">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/secret/${secret.id}/edit`}>
                        <Edit className="w-4 h-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/secret/${secret.id}/delete`}>
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                      </Link>
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      {secret.expiresAt && (
                        <>
                          <span className="text-muted-foreground">Expires</span>
                          <span>
                            {new Date(secret.expiresAt).toDateString()}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Views</span>
                      <span>
                        {secret.currentViews}
                        {secret.maxViews && ` / ${secret.maxViews}`}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/secret/${secret.id}`}>View</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/secret/${secret.id}/share`}>
                      Share
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
