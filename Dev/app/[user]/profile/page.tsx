"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Camera, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { UploadButton } from "@/utils/uploadthing";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { toast } from "@/hooks/use-toast";
import { DeleteAccountButton } from "@/components/delete-account-button";
import { useUserStore } from "@/store/user.store";
import { Loading } from "@/components/ui/loading";
import { devLog } from "@/utils/devLog";
import { privateAxios } from "@/utils/axios.config";
import { User as AuthUser } from "@prisma/client";

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    isGettingUserProfile,
    setUser,
    error,
    setMessage,
    setError,
    message,
  } = useUserStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
  });

  const [securityFormData, setSecurityFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // const imageInputRef = useRef<null | HTMLInputElement>(null);
  const [profileAvatar, setProfileAvatar] = useState(user?.image || "");

  const [isUpdatingDetails, setIsUpdatingDetails] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // clear the error and message and redirect the user to verify email page
  useEffect(() => {
    setMessage(null);
    setError(null);
  }, [setMessage, setError]);

  async function handleUpdateDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsUpdatingDetails(true);

    try {
      const res = await privateAxios.put<{
        user: AuthUser;
        message: string;
      }>("/api/v1/user/update-details", {
        email: formData.email,
        image: profileAvatar,
        name: formData.name,
        username: formData.username,
      });

      setUser(res.data.user);
      setMessage(res.data.message);
      setIsSubmitted(true);
    } catch (error: Error | any) {
      if (error.response.data) setError(error.response.data.error);
      else
        setError(
          "Sorry, an unexpected error occurred. Please try again later."
        );

      devLog(error);
    } finally {
      setIsUpdatingDetails(false);
    }
  }
  async function handleUpdatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsUpdatingPassword(true);

    if (securityFormData.newPassword !== securityFormData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await privateAxios.put<{
        user: AuthUser;
        message: string;
      }>("/api/v1/user/update-password", {
        password: securityFormData.newPassword,
        currentPassword: securityFormData.currentPassword,
      });

      setUser(res.data.user);
      setMessage(res.data.message);
    } catch (error: Error | any) {
      if (error.response.data) setError(error.response.data.error);
      else
        setError(
          "Sorry, an unexpected error occurred. Please try again later."
        );

      devLog(error);
    } finally {
      setIsUpdatingPassword(false);
    }
  }

  // update state popup for details info update
  useEffect(() => {
    if (
      message &&
      message !== null &&
      error === null &&
      (!isUpdatingDetails || !isUpdatingPassword) &&
      isSubmitted
    ) {
      toast({
        title: "Profile updated",
        description: message || "Your profile has been updated successfully.",
      });
      if (message !== null) router.refresh();
    } else {
      if (error !== null)
        toast({
          title: "Error",
          description: error || "Failed to update profile. Please try again.",
          variant: "destructive",
        });
    }
  }, [message, error]);

  // const handleToggleImageInput = () => {
  //   if (imageInputRef && imageInputRef.current) {
  //     imageInputRef.current.click();
  //   }
  // };

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleImportantInputChange = (name: string, value: string) => {
    setSecurityFormData({ ...securityFormData, [name]: value });
  };

  if (isGettingUserProfile) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl mx-auto">
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
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and profile information.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your profile information and email address.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleUpdateDetails}>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src={profileAvatar ? profileAvatar : user?.image || ""}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="text-2xl">
                      {user?.name ? (
                        user.name.charAt(0).toUpperCase()
                      ) : (
                        <User className="w-12 h-12" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  {/* <>
                        <span className="sr-only">Upload avatar</span>
                        <Camera className="w-4 h-4" />
                      </> */}
                </div>
                <UploadButton
                  appearance={
                    {
                      // container: {
                      //   background: "transparent",
                      // },
                      // button: {
                      //   background: "transparent",
                      //   border: "none",
                      //   padding: 0,
                      //   width: "100%",
                      //   height: "100%",
                      //   display: "flex",
                      //   alignItems: "center",
                      //   justifyContent: "center",
                      // },
                    }
                  }
                  className="appearance-none w-8 h-8"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    devLog("Files: ", res);
                    setProfileAvatar(res[0].ufsUrl);
                    toast({
                      title: "Upload complete",
                      description: "Profile photo uploaded successfully",
                    });
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      title: "Error uploading profile photo",
                      description: `ERROR! ${error.message}`,
                      variant: "destructive",
                    });
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Click the camera icon to upload a new avatar
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    handleInputChange(e.target.id, e.target.value)
                  }
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Username (Optional)</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange(e.target.id, e.target.value)
                  }
                  placeholder="Your username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    handleInputChange(e.target.id, e.target.value)
                  }
                  placeholder="Your email address"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isUpdatingDetails}>
                {isUpdatingDetails ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <form onSubmit={handleUpdatePassword}>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="********"
                  value={securityFormData.currentPassword}
                  onChange={(e) =>
                    handleImportantInputChange(e.target.id, e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={securityFormData.newPassword}
                  onChange={(e) =>
                    handleImportantInputChange(e.target.id, e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={securityFormData.confirmPassword}
                  onChange={(e) =>
                    handleImportantInputChange(e.target.id, e.target.value)
                  }
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button disabled={isUpdatingPassword} type="submit">
                {isUpdatingPassword
                  ? "Changing password..."
                  : "Change Password"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Permanently delete your account and all of your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Once you delete your account, there is no going back. This action
              cannot be undone.
            </p>
            <DeleteAccountButton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
