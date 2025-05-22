"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Copy, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { BackButton } from "@/components/back-button";
import { privateAxios } from "@/utils/axios.config";
import { decryptData } from "@/lib/encryption";
import { Secret } from "@prisma/client";
import { devLog } from "@/utils/devLog";
import { Loading } from "@/components/ui/loading";
import { useUserStore } from "@/store/user.store";

export default function ShareSecretPage() {
  const params = useParams();
  const [secret, setSecret] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [accessType, setAccessType] = useState("anyone");
  const [emails, setEmails] = useState("");
  const [expiryTime, setExpiryTime] = useState("7d");
  const { user, getUserProfile } = useUserStore();
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);

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
    getUserProfile();
  }, [fetchSecret, getUserProfile]);

  async function generateShareLink() {
    setGenerating(true);

    try {
      const res = await privateAxios.post<{
        message: string;
        shareUrl: string;
      }>(`/api/v1/secrets/${params.id}/shares`, {
        emails,
        expiryTime,
        emailNotifications,
      });
      setShareLink(res.data.shareUrl);
      toast({
        title: "Share link generated",
        description:
          res.data.message || "You can now share this link with others.",
      });
      // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
    } catch (error: Error) {
      devLog(error);
      if (error.response)
        toast({
          title: "Error",
          description:
            error.response.data.message ||
            "Failed to generate share link. Please try again.",
          variant: "destructive",
        });
      else
        toast({
          title: "Error",
          description: "Failed to generate share link. Please try again.",
          variant: "destructive",
        });
    } finally {
      setGenerating(false);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);

    toast({
      title: "Copied to clipboard",
      description: "The share link has been copied to your clipboard.",
    });

    setTimeout(() => setCopied(false), 2000);
  }

  if (isLoading) {
    <Loading hideText />;
  }

  if (!secret) {
    return null;
  }
  return (
    <div className="max-w-2xl mx-auto pt-16">
      <BackButton />

      <Card>
        <CardHeader>
          <CardTitle>
            Share &apos;
            {secret.name.length > 34
              ? `${secret.name.substring(0, 34)}...`
              : secret.name}
            &apos;
          </CardTitle>
          <CardDescription>
            Generate a secure link to share your environment variables.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Access Control</Label>
            <RadioGroup
              defaultValue="anyone"
              onValueChange={setAccessType}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center p-3 space-x-3 border rounded-md">
                <RadioGroupItem value="anyone" id="anyone" />
                <Label
                  htmlFor="anyone"
                  className="flex items-center gap-2 font-normal cursor-pointer"
                >
                  <span>Anyone with the link</span>
                </Label>
              </div>
              <div className="flex items-center p-3 space-x-3 border rounded-md">
                <RadioGroupItem
                  value="email"
                  id="email"
                  disabled={user?.plan === "free"}
                  className="disabled:opacity-50 disabled:hover:cursor-default"
                />
                <Label
                  htmlFor="email"
                  className={`flex items-center gap-2 font-normal ${
                    user?.plan === "free" ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  <span
                    className={`${user?.plan === "free" ? "opacity-50" : ""}`}
                  >
                    Specific email addresses (Pro plan only)
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {accessType === "email" && (
            <div className="space-y-2">
              <Label htmlFor="emails">Email Addresses</Label>
              <Input
                id="emails"
                placeholder="Enter email addresses, separated by commas"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Only these email addresses will be able to access the secret.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="expiry">Expiration</Label>
              <Select defaultValue="7d" onValueChange={setExpiryTime}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select expiration" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="1h" className="cursor-pointer">
                    1 hour
                  </SelectItem>
                  <SelectItem value="24h" className="cursor-pointer">
                    24 hours
                  </SelectItem>
                  <SelectItem value="7d" className="cursor-pointer">
                    7 days
                  </SelectItem>
                  <SelectItem
                    value="30d"
                    className="cursor-pointer"
                    disabled={user?.plan === "free"}
                  >
                    30 days (Pro plan only)
                  </SelectItem>
                  <SelectItem
                    value="never"
                    className="cursor-pointer"
                    disabled={user?.plan === "free"}
                  >
                    Never (Pro plan only)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="space-y-0.5">
              <Label htmlFor="notify">Email Notification</Label>
              <p className="text-xs text-muted-foreground">
                Get notified when someone accesses this secret.
              </p>
            </div>
            <Switch
              id="notify"
              // checked
              checked={emailNotifications}
              onCheckedChange={(value) => setEmailNotifications(value)}
            />
          </div>

          {shareLink ? (
            <div className="space-y-2">
              <Label htmlFor="shareLink">Share Link</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="shareLink"
                  value={shareLink}
                  readOnly
                  className="font-mono"
                />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Share this link with others to give them access to your
                environment variables.
              </p>
            </div>
          ) : (
            <Button
              onClick={generateShareLink}
              className="w-full"
              disabled={generating}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {generating ? "Generating..." : "Generate Share Link"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
