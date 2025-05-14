import Link from "next/link";
import Image from "next/image";

export default function Logo({ hideText }: { hideText?: boolean }) {
  return (
    <div className="w-auto h-auto">
      <Link
        href="/"
        className="flex items-center justify-center w-full h-full gap-2 p-0 m-0 font-bold"
      >
        <div className="flex items-center justify-center w-12 h-12 p-0 m-0 rounded-full bg-primary/10">
          <Image
            src={"/logo.svg"}
            alt="Logo"
            width={48}
            height={48}
            className=""
          />
        </div>
        {!hideText && <span>SecretShare</span>}
      </Link>
    </div>
  );
}
