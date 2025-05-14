"use client";
import { useUserStore } from "@/store/user.store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUserProfile, isAuthenticated, user } = useUserStore();

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  useEffect(() => {
    if (user && isAuthenticated)
      redirect(
        `/${user.username ? user.username : user.name?.trim()?.split(" ")[0]}`
      );
  }, [isAuthenticated, user]);

  return <div className="container py-6 md:py-8">{children}</div>;
}
