"use client";

import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user.store";
import { Loading } from "@/components/ui/loading";
import { ProfileInfo } from "@/components/profile-info";
import { PasswordInfo } from "@/components/password-info";
import { DeleteAccountInfo } from "@/components/delete-account-into";
import { BackButton } from "@/components/back-button";

export default function ProfilePage() {
  const router = useRouter();
  const { isGettingUserProfile, getUserProfile } = useUserStore();

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  if (isGettingUserProfile) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl mx-auto  pt-16">
      <BackButton />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and profile information.
          </p>
        </div>

        <ProfileInfo />

        <PasswordInfo />

        <DeleteAccountInfo />
      </div>
    </div>
  );
}
