import { Lock } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold">
      <Lock className="h-5 w-5" />
      <span>SecretShare</span>
    </Link>
  );
}
