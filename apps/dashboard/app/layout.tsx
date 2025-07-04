import "@packages/ui/globals.css";
import "./globals.css";

import { cn } from "@packages/ui/lib/utils";
import type { Metadata } from "next";

import { fontVariables } from "@/app/fonts";
import { ThemeProvider } from "@/app/theme-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};
