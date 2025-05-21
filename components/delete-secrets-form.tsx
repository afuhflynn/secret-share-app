"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
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
import { Secret } from "@prisma/client";
import { useUserStore } from "@/store/user.store";

export function DeleteSecretButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { error, setMessage, setError, message, setSecrets } = useUserStore();
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
        secrets: Secret;
        message: string;
      }>("/api/v1/secrets/delete-secrets", {
        email: formData.email,
      });

      setSecrets(null);
      setMessage(res.data.message);
      setIsSubmitted(true);
      // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
    } catch (error: Error) {
      if (error.response.data) setError(error.response.data.message);
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
        title: "Secrets deleted successfully",
        description:
          message || "Your secrets have been permanently deleted successfully.",
      });
      setIsOpen(false);
    } else {
      if (error !== null)
        toast({
          title: "Error deleting secrets",
          description:
            error || "Failed to delete your secrets. Please try again.",
          variant: "destructive",
        });
    }
  }, [message, error]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Delete All Secrets
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete all of
            your secrets from our databases.
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
            {isLoading ? "Deleting..." : "Delete Secrets"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
