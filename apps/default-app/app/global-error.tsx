"use client";

import { ServerError } from "@packages/ui/components/server-error";
import { cn } from "@packages/ui/lib/utils";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { fontVariables } from "@/app/fonts";
import { ThemeProvider } from "@/app/theme-provider";

/*
 * If a server error ocurrs, this page is rendered.
 * Note that this includes some of the same code as layout.tsx.tsx
 * However, we cannot reuse layout.tsx because the error might
 * be caused by something in layout.tsx itself.
 * That's why we wrap ServerError in html boilerplate and the ThemeProvider.
 * dworak.dev
 */
export default ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          fontVariables,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ServerError></ServerError>
        </ThemeProvider>
      </body>
    </html>
  );
};
