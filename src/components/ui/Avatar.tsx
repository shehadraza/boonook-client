"use client";
import { useState } from "react";

export default function Avatar({ src, name, className = "" }: { src?: string | null; name: string; className?: string }) {
  const [bad, setBad] = useState(false);

  if (!src || bad) {
    return (
      <span className={`grid h-full w-full place-items-center bg-maroon font-bold text-[#f4ead8] ${className}`}>
        {name?.[0]?.toUpperCase() ?? "U"}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} onError={() => setBad(true)} referrerPolicy="no-referrer" className={`h-full w-full object-cover ${className}`} />
  );
}