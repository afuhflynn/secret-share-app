"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  Eye,
  EyeOff,
  User,
  XCircle,
} from "lucide-react";
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
import {
  getStrengthPercent,
  rules,
  validatePassword,
} from "@/lib/password-validate";
import { getSession } from "next-auth/react";
import { User as AuthUser } from "@prisma/client";

export default function ProfilePage() {
  // Get the user session from the server using the react session hook from authjs
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();
  const { isGettingUserProfile, getUserProfile } = useUserStore();
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
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isUpdatingDetails, setIsUpdatingDetails] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState(user?.image || "");
  const [error, setError] = useState<null | string>(null);
  const [message, setMessage] = useState<null | string>(null);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  // get user session and data use ueEffect
  useEffect(() => {
    async function fetchUser() {
      const session = await getSession();
      if (session) {
        const userData = session.user as AuthUser;
        setUser(userData);
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          username: userData.username || "",
        });
        setSecurityFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setProfileAvatar(userData.image || "");
      }
    }
    fetchUser();
  }, []);

  // derive newPassword strength
  const pwdResults = useMemo(
    () => validatePassword(securityFormData.newPassword),
    [securityFormData.newPassword]
  );
  const strength = useMemo(() => getStrengthPercent(pwdResults), [pwdResults]);
  const passwordsMatch =
    securityFormData.newPassword === securityFormData.confirmPassword;
  const allGood = strength === 100 && passwordsMatch;

  async function handleUpdateDetails(e: React.FormEvent) {
    e.preventDefault();
    setIsUpdatingDetails(true);
    try {
      const res = await privateAxios.put("/api/v1/user/update-details", {
        ...formData,
        image: user?.image,
      });
      setUser(res.data.user);
      setMessage(res.data.message);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.error || "Unexpected error");
      devLog(err);
    } finally {
      setIsUpdatingDetails(false);
    }
  }

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    setIsUpdatingPassword(true);
    if (!passwordsMatch) {
      setError("Passwords do not match");
      setIsUpdatingPassword(false);
      return;
    }
    if (strength < 100) {
      setError("New password is not strong enough");
      setIsUpdatingPassword(false);
      return;
    }
    try {
      const res = await privateAxios.put("/api/v1/user/update-password", {
        currentPassword: securityFormData.currentPassword,
        newPassword: securityFormData.newPassword,
      });
      setUser(res.data.user);
      setMessage(res.data.message);
      setIsSubmitted(true);
    } catch (err: Error | any) {
      if (err.response.data) {
        setError(err.response.data.error || "Unexpected error");
      } else {
        setError(err.message || "Unexpected error");
      }
      devLog(err);
    } finally {
      setIsUpdatingPassword(false);
    }
  }

  useEffect(() => {
    if (message && !error && isSubmitted) {
      toast({ title: "Success", description: message });
      router.refresh();
    } else if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    }
  }, [message, error, isSubmitted, router]);

  const handleSecurityChange = (name: string, value: string) =>
    setSecurityFormData({ ...securityFormData, [name]: value });

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
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

                  <UploadButton
                    appearance={{
                      container: {},
                      button: {
                        border: "none",
                        padding: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    }}
                    className="appearance-none absolute"
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
                </div>
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
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password.</CardDescription>
          </CardHeader>
          <form onSubmit={handleUpdatePassword}>
            <CardContent className="space-y-2 flex flex-col">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  value={securityFormData.currentPassword}
                  onChange={(e) =>
                    handleSecurityChange(e.target.id, e.target.value)
                  }
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((v) => !v)}
                  className="absolute inset-y-0 right-2"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  value={securityFormData.newPassword}
                  onChange={(e) =>
                    handleSecurityChange(e.target.id, e.target.value)
                  }
                  required
                  className={`pr-10 ${
                    securityFormData.newPassword.length > 0 ? "mb-3" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute inset-y-0 right-2"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {!allGood && (
                <>
                  {securityFormData.newPassword.length > 0 && (
                    <div className="w-full bg-gray-200 h-1 rounded mt-2 overflow-hidden">
                      <div
                        className="h-2 rounded"
                        style={{
                          width: `${strength}%`,
                          backgroundColor:
                            strength >= 80 ? "#10b981" : "#f59e0b",
                        }}
                      />
                    </div>
                  )}
                  {securityFormData.newPassword.length > 0 && (
                    <ul className="my-2 space-y-1 text-sm mb-4">
                      {rules.map((r) => {
                        const ok = pwdResults[r.key];
                        return (
                          <li key={r.key} className="flex items-center">
                            {ok ? (
                              <CheckCircle
                                size={14}
                                className="text-green-500 mr-1"
                              />
                            ) : (
                              <XCircle
                                size={14}
                                className="text-red-500 mr-1"
                              />
                            )}
                            <span
                              className={ok ? "text-green-600" : "text-red-600"}
                            >
                              {r.label}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              )}

              <Label htmlFor="confirmPassword" className="pt-4">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={securityFormData.confirmPassword}
                onChange={(e) =>
                  handleSecurityChange(e.target.id, e.target.value)
                }
                required
                className="pr-10"
              />
              {!passwordsMatch && securityFormData.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  Passwords do not match
                </p>
              )}
              {error && (
                <p className="text-destructive text-sm mt-2">{error}</p>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isUpdatingPassword}>
                {isUpdatingPassword ? "Changing..." : "Change Password"}
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
