"use client";
import Link from "next/link";
import Book3D from "@/components/ui/Book3D";
import { useTitle } from "@/hooks/useTitle";

export default function NotFound() {
  useTitle("BookNook | Page Not Found");
  return (
    <section className="container-x flex min-h-[75vh] flex-col items-center justify-center gap-8 py-16 text-center md:flex-row md:text-left">
      <Book3D title="404" subtitle="Page missing" c1="#2b4a7c" c2="#0a1226" />
      <div className="max-w-md">
        <h1 className="section-title">This page wandered off the shelf</h1>
        <p className="section-sub">The link may be broken or the page was removed. Head back home and find your next read.</p>
        <Link href="/" className="btn btn-primary mt-7">Back to Home</Link>
      </div>
    </section>
  );
}