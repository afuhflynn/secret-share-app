"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { localStorageKey } from "@/lib/constants";
import { useUserStore } from "@/store/user.store";
import { devLog } from "@/utils/devLog";

export const ResendVerificationEmail = () => {
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute = 60 seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [userEmail, setUserEmail] = useState("");

  const {
    error,
    setError,
    setMessage,
    message,
    resendVerificationEmail,
    loading,
  } = useUserStore();

  // clear the error and message and redirect the user to verify email page
  useEffect(() => {
    setMessage(null);
    setError(null);
  }, [setMessage, setError]);

  async function onResend() {
    setError("");

    try {
      resendVerificationEmail(userEmail);
    } catch (error) {
      devLog(error);
    }
  }

  useEffect(() => {
    const userData = localStorage.getItem(localStorageKey);
    if (userData) setUserEmail(JSON.parse(userData));
  }, [localStorageKey, setUserEmail]);

  // Route user if signup is successful
  useEffect(() => {
    if (message && message !== null && error === null) {
      toast({
        title: "Verification Email sent",
        description: "New verification email sent successfully!",
      });
    } else {
      toast({
        title: "Error sending verification email",
        description:
          "An error occurred sending verification email. Please try again later!",
        variant: "destructive",
      });
    }
  }, [message, error]);

  useEffect(() => {
    if (timeLeft === 0) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1 && intervalRef.current) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [timeLeft]);

  const handleResend = () => {
    onResend();
    setTimeLeft(60); // restart countdown
    // trigger resend logic here if needed
  };

  const format = (val: number) => val.toString().padStart(2, "0");
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Button
      variant="link"
      className="w-full"
      onClick={timeLeft > 0 ? undefined : handleResend}
      disabled={timeLeft > 0 || loading}
      type="button"
    >
      {timeLeft > 0 ? (
        <>
          Resend email{" "}
          <span className="text-lg font-inter-18pt-semibold">
            {format(minutes)}:{format(seconds)}
          </span>
        </>
      ) : (
        "Resend code or link"
      )}
    </Button>
  );
};
