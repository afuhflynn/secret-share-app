"use client";
import { Copy, CopyCheck, LucideCopyCheck } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export const CodeExample = ({
  template,
}: {
  template: { title: string; id: number; content: string };
}) => {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopyCode = async (code: string) => {
    setIsCopying((prev) => !prev);
    await navigator.clipboard.writeText(code);

    setTimeout(() => {
      setIsCopying((prev) => !prev);
    }, 2000);
  };
  return (
    <>
      <h3 className="mb-2 text-lg font-medium">{template.title}</h3>
      <div className="relative w-full p-4 font-mono text-sm rounded-md bg-muted">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => handleCopyCode(template.content)}
          className="absolute px-0 py-0 rounded-md top-1 right-1 hover:bg-background"
        >
          {isCopying ? <LucideCopyCheck /> : <Copy />}
          <span className="sr-only">Copy</span>
        </Button>
        <pre>{template.content}</pre>
      </div>
    </>
  );
};
