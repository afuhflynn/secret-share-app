"use client";

import Link from "next/link";
import Logo from "./logo";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileNavbar, setIsMobileNavbar] = useState(false);
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16">
        <Logo />
        {/* Desktop navbar */}
        <nav className="items-center hidden md:flex gap-14">
          <div className="flex flex-row items-center justify-center gap-4">
            <Link
              href="/features"
              className="text-sm font-medium hover:underline"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:underline"
            >
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              About us
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:underline">
              Blog
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium hover:underline"
            >
              How it Works
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:underline"
            >
              Contact
            </Link>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <Link
              href="/auth/log-in"
              className="text-sm font-medium hover:underline"
            >
              Login
            </Link>
            <Link href="/auth/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
        {/* Mobile navbar */}
        <nav className="flex items-center justify-center gap-8 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="secondary"
                onMouseDownCapture={() => setIsMobileNavbar((prev) => !prev)}
              >
                {!isMobileNavbar ? <Menu /> : <X />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-10 flex flex-col items-start justify-center w-screen gap-3 px-8 py-3 bg-background">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/features"
                  className="text-sm font-medium hover:underline"
                >
                  Features
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/pricing"
                  className="text-sm font-medium hover:underline"
                >
                  Pricing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/about"
                  className="text-sm font-medium hover:underline"
                >
                  About us
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/blog"
                  className="text-sm font-medium hover:underline"
                >
                  Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/how-it-works"
                  className="text-sm font-medium hover:underline"
                >
                  How it Works
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/contact"
                  className="text-sm font-medium hover:underline"
                >
                  Contact
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/auth/log-in" className="text-sm font-medium">
                    Login
                  </Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Button className="w-full" asChild>
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
