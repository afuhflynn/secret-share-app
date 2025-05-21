"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ComputerIcon, Lock, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

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
import { useUserStore } from "@/store/user.store";
import { Loading } from "@/components/ui/loading";
import { BackButton } from "@/components/back-button";
import { DeleteSecretButton } from "@/components/delete-secrets-form";
import { NotificationsSettings } from "@/components/notifications-info";

export default function SettingsPage() {
  const { user, isGettingUserProfile } = useUserStore();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  if (isGettingUserProfile) {
    return <Loading />;
  }
  return (
    <div className="max-w-2xl mx-auto pt-16">
      <BackButton />

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
                <div className="flex items-center p-3 space-x-3 border rounded-md cursor-pointer">
                  <RadioGroupItem value="light" id="light" />
                  <Label
                    htmlFor="light"
                    className="flex items-center gap-2 font-normal cursor-pointer"
                  >
                    <Sun className="w-4 h-4" />
                    <span>Light</span>
                  </Label>
                </div>
                <div className="flex items-center p-3 space-x-3 border rounded-md cursor-pointer">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label
                    htmlFor="dark"
                    className="flex items-center gap-2 font-normal cursor-pointer"
                  >
                    <Moon className="w-4 h-4" />
                    <span>Dark</span>
                  </Label>
                </div>
                <div className="flex items-center p-3 space-x-3 border rounded-md cursor-pointer">
                  <RadioGroupItem value="system" id="system" />
                  <Label
                    htmlFor="system"
                    className="flex items-center gap-2 font-normal cursor-pointer"
                  >
                    <ComputerIcon className="w-4 h-4" />
                    <span>System</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <NotificationsSettings />

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Future feature */}
            {/* <div className="flex items-center justify-between">
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
            </div> */}
            <Separator />
            <div>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/dashboard/profile#password`}>
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Link>
              </Button>
            </div>
          </CardContent>
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
            <DeleteSecretButton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
