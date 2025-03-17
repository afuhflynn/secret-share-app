import Link from "next/link";
import Logo from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16">
        <Logo />
        <nav className="flex items-center gap-4">
          <Link
            href="/how-it-works"
            className="text-sm font-medium hover:underline"
          >
            How it Works
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline">
            Contact
          </Link>
          <ThemeToggle />
          <Link
            href="/auth/log-in"
            className="text-sm font-medium hover:underline"
          >
            Login
          </Link>
          <Link href="/auth/sign-up">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
