import type { Metadata } from "next";
import { Rajdhani, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from '@clerk/nextjs'
import { RippleEffect } from '@/components/ripple-effect';

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: 'swap',
});

import { VMark } from "@/components/icons";

export const metadata: Metadata = {
  title: "VeylanLabs | Premium Trading Ecosystem",
  description: "Understand the session — with a room that trades it live, every day.",
  icons: {
    icon: VMark({}).props.src,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${rajdhani.variable} ${bebasNeue.variable} ${jetbrains.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col transition-colors duration-500">
          <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange={false}>
            <RippleEffect />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
