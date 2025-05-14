"use client";

import { useState } from "react";
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
import { decryptData } from "@/lib/encryption";
import { SECRETS_PASSWORD } from "@/utils/Load_Envs";
import { useUserStore } from "@/store/user.store";
import { Secret } from "@prisma/client";
import { Loading } from "@/components/ui/loading";

export default function DashboardPage() {
  const { user, isGettingUserProfile } = useUserStore();
  const [secrets, setSecrets] = useState<Secret[] | []>([]);

  if (isGettingUserProfile) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <h1 className="text-3xl font-bold">Your Secrets</h1>
        <Link
          href={`/${
            user?.username ? user?.username : user?.name?.trim()?.split(" ")[0]
          }/create`}
        >
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Secret
          </Button>
        </Link>
      </div>

      {secrets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold">No secrets yet</h3>
              <p className="text-sm text-muted-foreground">
                Create your first secret to get started.
              </p>
              <Link
                href={`/${
                  user?.username
                    ? user?.username
                    : user?.name?.trim()?.split(" ")[0]
                }/create`}
                className="inline-block mt-4"
              >
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Secret
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {secrets.map((secret, index) => (
            <Card
              key={`item-${secret.id}-${secret.name}-${index}`}
              className="relative group hover:shadow-md card"
            >
              <CardHeader className="group">
                <CardTitle>
                  {secret.name.length > 23
                    ? `${secret.name.substring(0, 23)}...`
                    : secret.name}
                </CardTitle>
                <CardDescription>
                  Created on {new Date(secret.createdAt).toLocaleDateString()}
                </CardDescription>
                <div className="absolute flex-row items-center hidden top-3 right-3 bg-background group-hover:flex">
                  <Link
                    href={`/${
                      user?.username
                        ? user?.username
                        : user?.name?.trim()?.split(" ")[0]
                    }/secret/${secret.id}/edit`}
                    className="transition-opacity opacity-0 group-hover:opacity-100"
                  >
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Edit className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                  <Link
                    href={`/${
                      user?.username
                        ? user?.username
                        : user?.name?.trim()?.split(" ")[0]
                    }/secret/${secret.id}/delete`}
                    className="transition-opacity opacity-0 group-hover:opacity-100"
                  >
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expires</span>
                    <span>
                      {new Date(secret.expiresAt as Date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Views</span>
                    <span>
                      {secret.currentViews}{" "}
                      {secret.maxViews ? `/ ${secret.maxViews}` : ""}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/${
                      user?.username
                        ? user?.username
                        : user?.name?.trim()?.split(" ")[0]
                    }/secret/${secret.id}`}
                  >
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/${
                      user?.username
                        ? user?.username
                        : user?.name?.trim()?.split(" ")[0]
                    }/secret/${secret.id}/share`}
                  >
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
