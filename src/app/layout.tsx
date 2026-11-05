
import type { Metadata } from "next";
import { Suspense } from "react";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastProvider from "@/providers/ToastProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: "BookNook | Add a book, borrow a book, return a book",
  description:
    "BookNook is a small online library. Add books, borrow them for a few days and return them.",
};

const themeScript = `try{var t=localStorage.getItem("booknook-theme");if(t==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body>
        <ToastProvider />

        <Suspense fallback={<div className="h-20" />}>
          <Navbar />
        </Suspense>

        <main className="min-h-[70vh]">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
