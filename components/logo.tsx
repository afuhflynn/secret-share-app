import { Lock } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold">
      <Lock className="w-5 h-5 text-primary" />
      <span>SecretShare</span>
    </Link>
  );
}
