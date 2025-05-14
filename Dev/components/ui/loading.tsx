import { LoaderIcon } from "lucide-react";

export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <div className="w-12 h-12 border-4 rounded-full animate-spin border-primary border-t-transparent" />
      <h2 className="text-center font-source-code-pro-semibold ">
        Please wait, do not refresh your browser.
      </h2>
    </div>
  );
}

export function Loader() {
  return <LoaderIcon className="animate-spin" />;
}
