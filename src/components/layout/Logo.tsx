import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="BookNook home">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-brand-ink">
        <BookOpen size={20} />
      </span>
      <span className="font-display text-2xl font-bold tracking-tight text-ink">BookNook</span>
    </Link>
  );
}