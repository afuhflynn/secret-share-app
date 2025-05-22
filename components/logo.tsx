import Link from "next/link";
import Image from "next/image";

export default function Logo({ hideText }: { hideText?: boolean }) {
  return (
    <div className="w-auto h-auto">
      <Link
        href="/"
        className="flex items-center justify-center w-full h-full gap-2 p-0 m-0 font-bold"
      >
        <div className="flex items-center justify-center w-9 h-9 p-0 m-0 bg-primary/10 rounded-full overflow-hidden">
          <Image
            src={"/logo.ico"}
            alt="Logo"
            width={48}
            height={48}
            className="h-full w-full rounded-full"
          />
        </div>
        {!hideText && <span className="text-2xl">SecretShare</span>}
      </Link>
    </div>
  );
}
