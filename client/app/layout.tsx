import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import Loader from "@/components/loading";
import { cn } from "@/lib/utils";
import { PropsWithChildren, Suspense } from "react";
import { ApolloClientProvider } from "@/providers/apollo-provider";
import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from "next-themes";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ApolloClientProvider>
          <Suspense fallback={<Loader />}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey="chat-theme"
            >
              {children}
            </ThemeProvider>
          </Suspense>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
