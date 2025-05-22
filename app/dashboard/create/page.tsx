"use client";

import { useEffect, useState } from "react";
import { Clock, Eye } from "lucide-react";

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
import { encryptData } from "@/lib/encryption";
import { BackButton } from "@/components/back-button";
import { privateAxios } from "@/utils/axios.config";
import { Secret } from "@prisma/client";
import { devLog } from "@/utils/devLog";
import { useUserStore } from "@/store/user.store";

const initialFormValues = {
  name: "",
  content: "",
  expiryType: "time",
  maxViews: "5",
  expiryTime: "7d",
};
export default function CreateSecretPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormValues);
  const { user, getUserProfile } = useUserStore();

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);
  devLog(user);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const encryptedContent = await encryptData(
        formData.content,
        process.env.NEXT_PUBLIC_SECRETS_PASSWORD || ""
      );

      const encryptedName = await encryptData(
        formData.name,
        process.env.NEXT_PUBLIC_SECRETS_PASSWORD || ""
      );

      const res = await privateAxios.post<{
        secret: Secret;
        message: string;
      }>("/api/v1/secrets", {
        ...formData,
        content: encryptedContent,
        name: encryptedName,
      });

      setFormData(initialFormValues);

      toast({
        title: "Secret created",
        description:
          res.data.message || "Your secret has been created successfully.",
      });
      // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
    } catch (error: Error) {
      if (error.response.data)
        toast({
          title: "Error",
          description:
            error.response.data.message ||
            "Failed to create secret. Please try again.",
          variant: "destructive",
        });
      else
        toast({
          title: "Error",
          description:
            "Sorry, an unexpected error occurred. Please try again later.",
          variant: "destructive",
        });

      devLog(error);
      toast({
        title: "Error",
        description: "Failed to create secret. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleFormData = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-2xl mx-auto  pt-16">
      <BackButton />

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
                value={formData.name}
                onChange={(e) => handleFormData("name", e.target.value)}
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
                className="h-[17rem] font-mono resize-y"
                required
                value={formData.content}
                onChange={(e) => handleFormData("content", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter your environment variables in KEY=VALUE format, one per
                line.
              </p>
            </div>

            <div className="space-y-4">
              <Label>Expiration Settings</Label>
              <RadioGroup
                value={formData.expiryType}
                onValueChange={(value) => handleFormData("expiryType", value)}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center p-3 space-x-3 border rounded-md">
                  <RadioGroupItem value="time" id="time" />
                  <Label
                    htmlFor="time"
                    className="flex items-center gap-2 font-normal cursor-pointer"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Time-based expiration</span>
                  </Label>
                </div>
                <div className="flex items-center p-3 space-x-3 border rounded-md">
                  <RadioGroupItem value="views" id="views" />
                  <Label
                    htmlFor="views"
                    className="flex items-center gap-2 font-normal cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View-based expiration</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.expiryType === "time" ? (
              <div className="space-y-2">
                <Label htmlFor="expiryTime">Expires After</Label>
                <Select
                  name="expiryTime"
                  value={formData.expiryTime}
                  onValueChange={(value) => handleFormData("expiryTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select expiration time" />
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
            ) : (
              <div className="space-y-2">
                <Label htmlFor="maxViews">Maximum Views</Label>
                <Select
                  name="maxViews"
                  value={formData.maxViews}
                  onValueChange={(value) => handleFormData("maxViews", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select maximum views" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="1" className="cursor-pointer">
                      1 view
                    </SelectItem>
                    <SelectItem value="5" className="cursor-pointer">
                      5 views
                    </SelectItem>
                    <SelectItem value="10" className="cursor-pointer">
                      10 views
                    </SelectItem>
                    <SelectItem
                      value="25"
                      className="cursor-pointer"
                      disabled={user?.plan === "free"}
                    >
                      25 views (Pro plan only)
                    </SelectItem>
                    <SelectItem
                      value="unlimited"
                      className="cursor-pointer"
                      disabled={user?.plan === "free"}
                    >
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
