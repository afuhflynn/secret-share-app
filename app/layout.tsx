import type { Metadata } from "next";

import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export const metadata: Metadata = {
  title: "SecretShare - Share Environment Variables Securely",
  description:
    "Securely share sensitive environment variables with your team or clients.",
  generator: "secret-share.dev",
};

async function UTSSR() {
  await connection();
  return (
    <NextSSRPlugin
      /**
       * The `extractRouterConfig` will extract **only** the route configs
       * from the router to prevent additional information from being
       * leaked to the client. The data passed to the client is the same
       * as if you were to fetch `/api/uploadthing` directly.
       */
      routerConfig={extractRouterConfig(ourFileRouter)}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Suspense>
            <UTSSR />
          </Suspense>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { connection } from "next/server";
import { Suspense } from "react";
