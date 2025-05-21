import { useEffect, useState } from "react";
import { User as AuthUser } from "@prisma/client";
import { useUserStore } from "@/store/user.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Camera, User } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { devLog } from "@/utils/devLog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { privateAxios } from "@/utils/axios.config";
import { toast } from "@/hooks/use-toast";
import { Loader } from "./ui/loading";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

export const ProfileInfo = () => {
  const { user, setUser } = useUserStore();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
  });
  const [isUpdatingDetails, setIsUpdatingDetails] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState(user?.image || "");
  const [error, setError] = useState<null | string>(null);
  const [message, setMessage] = useState<null | string>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  async function handleUpdateDetails(e: React.FormEvent) {
    e.preventDefault();
    setIsUpdatingDetails(true);
    setIsSubmitted(false);
    setMessage(null);
    setError(null);
    try {
      const res = await privateAxios.put<{ message: string; user: AuthUser }>(
        "/api/v1/user/update-details",
        {
          ...formData,
          image: profileAvatar || user?.image,
        }
      );
      setUser(res.data.user);
      setMessage(res.data.message);
      setIsSubmitted(true);
    } catch (err: Error | any) {
      if (err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("sorry, an unexpected error occurred");
      }
      setIsSubmitted(true);
      devLog(err);
    } finally {
      setIsUpdatingDetails(false);
    }
  }

  useEffect(() => {
    if (message && !error && isSubmitted) {
      toast({ title: "Success ", description: message });
    }
    if (!message && error && isSubmitted) {
      toast({
        title: "Error updating profile",
        description: error,
        variant: "destructive",
      });
    }
  }, [message, error, isSubmitted]);

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
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
              <Avatar className="w-24 h-24 relative">
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
                {!isUploadingImage ? (
                  <UploadButton
                    appearance={{
                      button: {
                        border: "none",
                        padding: 0,
                        width: "100%",
                        height: "",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "black",
                        MozUserFocus: "ignore",
                        color: "white",
                        msBlockProgression: "lr",
                      },
                    }}
                    content={{
                      button() {
                        return <Camera className="w-5 h-5" />;
                      },
                    }}
                    className="appearance-none absolute -bottom-4 bg-opacity-60 bg-background h-[60%] w-full ut-readying:focus:bg-transparent"
                    config={{ cn: twMerge }}
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      devLog("Files: ", res);
                      setProfileAvatar(res[0].ufsUrl);
                      setIsUploadingImage(false);
                      toast({
                        title: "Upload complete",
                        description: "Profile photo uploaded successfully",
                      });
                    }}
                    onUploadError={(_: Error) => {
                      setIsUploadingImage(false);
                      toast({
                        title: "Error uploading profile photo",
                        description: `Error updating profile photo now. Please try again later`,
                        variant: "destructive",
                      });
                    }}
                    onUploadProgress={() => {
                      setIsUploadingImage(true);
                    }}
                  />
                ) : (
                  <div className="absolute bg-background bg-opacity-60 flex items-center justify-center w-full h-[40%] bottom-0">
                    <Loader />
                  </div>
                )}
              </Avatar>
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
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Username (Optional)</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              placeholder="Your username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              placeholder="Your email address"
            />
          </div>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isUpdatingDetails}>
            {isUpdatingDetails ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
