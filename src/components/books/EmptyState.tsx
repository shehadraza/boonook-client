import Link from "next/link";
import { BookPlus, Library } from "lucide-react";

type Props = { title: string; text: string; showAll?: boolean };

export default function EmptyState({ title, text, showAll }: Props) {
  return (
    <div className="card mt-10 flex flex-col items-center px-6 py-14 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-surface2 text-gold">
        <Library size={30} />
      </span>
      <h3 className="mt-5 font-display text-2xl font-bold">{title}</h3>
      <p className="mt-2 max-w-md text-muted">{text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/add-book" className="btn btn-primary"><BookPlus size={18} /> Add Book</Link>
        {showAll && <Link href="/books" className="btn btn-ghost">Show All Books</Link>}
      </div>
    </div>
  );
}