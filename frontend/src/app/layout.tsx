import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Bibliotech | Your Personal Library",
  description: "Manage your personal library with Bibliotech. Add, view, and organize your books easily.",
  metadataBase: new URL("https://bibliotech.local"),
  openGraph: {
    title: "Bibliotech | Your Personal Library",
    description: "Manage your personal library with Bibliotech. Add, view, and organize your books easily.",
    type: "website",
    locale: "en_US",
  },
};


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950`}>
        <Providers>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
