"use client";
import Link from "next/link";
import { UserAccountNav } from "./user-account-nav";

import Logo from "./logo";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user.store";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const { user, isGettingUserProfile, isAuthenticated } = useUserStore();
  const pathname = usePathname();

  if ((!user || isGettingUserProfile) && !isAuthenticated) {
    return null;
  }
  return (
    <header
      className={cn(
        "sticky top-0 z-10 border-b bg-background",
        pathname === "/dashboard" ? "" : "hidden"
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href={`/dashboard`} className="flex items-center gap-2">
          <Logo hideText />
          <h2 className="hidden text-md font-semibold capitalize sm:block">
            {user?.username || user?.name?.split(" ")[0]}
          </h2>
        </Link>
        <div className="flex items-center gap-4">
          <UserAccountNav user={user as User} />
          <div>
            <span className="sr-only">Have an issue to report?</span>
            <Button variant="ghost" className="relative w-8 h-8 rounded-full">
              <Link href={"/contact"}>?</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
