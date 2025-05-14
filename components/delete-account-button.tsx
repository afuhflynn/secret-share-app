"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "@/hooks/use-toast";
import { devLog } from "@/utils/devLog";
import { privateAxios } from "@/utils/axios.config";
import { User as AuthUser } from "@prisma/client";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";

export function DeleteAccountButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    reason: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const router = useRouter();
  const { setUser, error, setMessage, setError, message } = useUserStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // clear the error and message and redirect the user to verify email page
  useEffect(() => {
    setMessage(null);
    setError(null);
  }, [setMessage, setError]);

  async function handleDeleteAccount() {
    setIsLoading(true);

    try {
      const res = await privateAxios.post<{
        user: AuthUser;
        message: string;
      }>("/api/v1/user/delete-account", {
        email: formData.email,
        reason: formData.reason,
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
      setIsLoading(false);
    }
  }

  // update state popup for details info update
  useEffect(() => {
    if (
      message &&
      message !== null &&
      error === null &&
      !isLoading &&
      isSubmitted
    ) {
      toast({
        title: "Account deleted",
        description:
          message || "Your account has been permanently deleted successfully.",
      });
      setIsOpen(false);
    } else {
      if (error !== null)
        toast({
          title: "Error deleting account",
          description:
            error || "Failed to delete your account. Please try again.",
          variant: "destructive",
        });
    }
  }, [message, error]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all of your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start">
          <Label className="mb-4" htmlFor="email">
            <span>Email </span>
            <span className="text-xs">
              (Helps to correctly determine who wants to initiate the delete)
            </span>
          </Label>
          <Input
            value={formData.email}
            id="email"
            name="email"
            type="email"
            placeholder="johana@example.com"
            onChange={(e) => handleInputChange(e.target.id, e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start">
          <Label className="mt-5 mb-4" htmlFor="reason">
            <span>Account Delete Reason </span>
            <span className="text-xs">
              (Helps us serve you better next time you come by)
            </span>
          </Label>
          <Textarea
            className="h-[10rem]"
            value={formData.reason}
            maxLength={400}
            id="reason"
            name="reason"
            placeholder="Your message here..."
            onChange={(e) => handleInputChange(e.target.id, e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button disabled={isLoading} variant={"outline"}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleDeleteAccount}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? "Deleting..." : "Delete Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
