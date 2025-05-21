"use client";

import { useUserStore } from "@/store/user.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { privateAxios } from "@/utils/axios.config";
import { User as AuthUser } from "@prisma/client";
import { devLog } from "@/utils/devLog";

export const NotificationsSettings = () => {
  const { user, isGettingUserProfile, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState<boolean>(
    user?.emailNotifications as boolean
  );
  const [accessNotifications, setAccessNotifications] = useState<boolean>(
    user?.accessNotifications as boolean
  );
  const [marketingEmails, setMarketingEmails] = useState<boolean>(
    user?.marketingEmails as boolean
  );

  async function saveSettings() {
    setIsLoading(true);

    try {
      const res = await privateAxios.put<{ message: string; user: AuthUser }>(
        "/api/v1/user/update-email-preference",
        {
          accessNotifications,
          marketingEmails,
          emailNotifications,
        }
      );
      setUser(res.data.user);
      devLog(res.data.user);
      toast({
        title: "Settings saved",
        description:
          res.data.message || "Your settings have been saved successfully.",
      });
      // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
    } catch (error: Error) {
      devLog(error);
      toast({
        title: "Error",
        description:
          error.response.data.message ||
          "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isGettingUserProfile) {
    return null;
  }

  return (
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
            <Label htmlFor="access-notifications">Access Notifications</Label>
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
  );
};
