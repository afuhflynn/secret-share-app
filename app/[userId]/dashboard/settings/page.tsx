"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Globe, Lock, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { useDemoAuth } from "@/components/providers/demo-auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isDevelopment } = useDemoAuth();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [accessNotifications, setAccessNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  async function saveSettings() {
    setIsLoading(true);

    try {
      // In a real app, we would save the settings to the database
      // For demo purposes, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {isDevelopment && (
        <div className="relative px-4 py-3 mb-4 text-yellow-800 bg-yellow-100 border border-yellow-400 rounded">
          <strong className="font-bold">Development Mode:</strong>
          <span className="block sm:inline">
            {" "}
            Settings changes will not be persisted.
          </span>
        </div>
      )}

      <Button
        variant="ghost"
        className="flex items-center mb-4 text-muted-foreground"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your application settings and preferences.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how SecretShare looks on your device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <RadioGroup
                defaultValue={theme}
                onValueChange={setTheme}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center p-3 space-x-3 border rounded-md">
                  <RadioGroupItem value="light" id="light" />
                  <Label
                    htmlFor="light"
                    className="flex items-center gap-2 font-normal cursor-pointer"
                  >
                    <Sun className="w-4 h-4" />
                    <span>Light</span>
                  </Label>
                </div>
                <div className="flex items-center p-3 space-x-3 border rounded-md">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label
                    htmlFor="dark"
                    className="flex items-center gap-2 font-normal cursor-pointer"
                  >
                    <Moon className="w-4 h-4" />
                    <span>Dark</span>
                  </Label>
                </div>
                <div className="flex items-center p-3 space-x-3 border rounded-md">
                  <RadioGroupItem value="system" id="system" />
                  <Label
                    htmlFor="system"
                    className="flex items-center gap-2 font-normal cursor-pointer"
                  >
                    <Globe className="w-4 h-4" />
                    <span>System</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Receive email notifications about your account.
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="access-notifications">
                  Access Notifications
                </Label>
                <p className="text-xs text-muted-foreground">
                  Get notified when someone accesses your shared secrets.
                </p>
              </div>
              <Switch
                id="access-notifications"
                checked={accessNotifications}
                onCheckedChange={setAccessNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-xs text-muted-foreground">
                  Receive emails about new features and promotions.
                </p>
              </div>
              <Switch
                id="marketing-emails"
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Notification Settings"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <Switch
                id="two-factor"
                checked={twoFactorAuth}
                onCheckedChange={setTwoFactorAuth}
              />
            </div>
            <Separator />
            <div>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/${user?.name}/dashboard/profile`}>
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Security Settings"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>
              Manage your data and privacy settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Button variant="outline" className="w-full">
                Export Your Data
              </Button>
            </div>
            <div>
              <Button variant="outline" className="w-full">
                Delete All Secrets
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
