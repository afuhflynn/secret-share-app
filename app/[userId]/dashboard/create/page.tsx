"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useDemoAuth } from "@/components/providers/demo-auth-provider";

export default function CreateSecretPage() {
  const router = useRouter();
  const { isDevelopment, user } = useDemoAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [expiryType, setExpiryType] = useState("time");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const content = formData.get("content") as string;
    const expiryTime = formData.get("expiryTime") as string;
    const maxViews = formData.get("maxViews") as string;

    try {
      // Demo mode - simulate creating a secret
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Calculate expiration date based on expiryTime
      const expiresAt = new Date();
      if (expiryType === "time" && expiryTime) {
        if (expiryTime === "1h") {
          expiresAt.setHours(expiresAt.getHours() + 1);
        } else if (expiryTime === "24h") {
          expiresAt.setHours(expiresAt.getHours() + 24);
        } else if (expiryTime === "7d") {
          expiresAt.setDate(expiresAt.getDate() + 7);
        } else if (expiryTime === "30d") {
          expiresAt.setDate(expiresAt.getDate() + 30);
        } else if (expiryTime === "never") {
          // For "never", set a far future date (1 year)
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        }
      } else {
        // Default to 7 days
        expiresAt.setDate(expiresAt.getDate() + 7);
      }

      // Create a new secret
      const newSecret = {
        id: Math.random().toString(36).substring(2, 15),
        name,
        content,
        createdAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
        currentViews: 0,
        maxViews: expiryType === "views" && maxViews ? Number(maxViews) : null,
      };

      // Get existing secrets from localStorage
      const storedSecrets = localStorage.getItem("demoSecrets");
      const secrets = storedSecrets ? JSON.parse(storedSecrets) : [];

      // Add the new secret
      secrets.unshift(newSecret);

      // Save to localStorage
      localStorage.setItem("demoSecrets", JSON.stringify(secrets));

      toast({
        title: "Secret created",
        description: "Your secret has been created successfully.",
      });

      router.push(`/${user?.name}/dashboard`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create secret. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      {isDevelopment && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Development Mode:</strong>
          <span className="block sm:inline">
            {" "}
            You can create secrets without authentication.
          </span>
        </div>
      )}

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
          <CardTitle>Create New Secret</CardTitle>
          <CardDescription>
            Share environment variables securely with your team or clients.
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Secret Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Development Environment Variables"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Environment Variables</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="API_KEY=your_api_key
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key"
                className="font-mono h-40"
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter your environment variables in KEY=VALUE format, one per
                line.
              </p>
            </div>

            <div className="space-y-4">
              <Label>Expiration Settings</Label>
              <RadioGroup
                defaultValue="time"
                onValueChange={setExpiryType}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-3 rounded-md border p-3">
                  <RadioGroupItem value="time" id="time" />
                  <Label
                    htmlFor="time"
                    className="flex cursor-pointer items-center gap-2 font-normal"
                  >
                    <Clock className="h-4 w-4" />
                    <span>Time-based expiration</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-md border p-3">
                  <RadioGroupItem value="views" id="views" />
                  <Label
                    htmlFor="views"
                    className="flex cursor-pointer items-center gap-2 font-normal"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View-based expiration</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {expiryType === "time" ? (
              <div className="space-y-2">
                <Label htmlFor="expiryTime">Expires After</Label>
                <Select name="expiryTime" defaultValue="7d">
                  <SelectTrigger>
                    <SelectValue placeholder="Select expiration time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="24h">24 hours</SelectItem>
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="30d">30 days</SelectItem>
                    <SelectItem value="never">Never (Pro plan only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="maxViews">Maximum Views</Label>
                <Select name="maxViews" defaultValue="5">
                  <SelectTrigger>
                    <SelectValue placeholder="Select maximum views" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 view</SelectItem>
                    <SelectItem value="5">5 views</SelectItem>
                    <SelectItem value="10">10 views</SelectItem>
                    <SelectItem value="25">25 views (Pro plan only)</SelectItem>
                    <SelectItem value="unlimited">
                      Unlimited (Enterprise plan only)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Secret"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
