"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { CATEGORIES } from "@/lib/constants";
import type { Book } from "@/types";
import BookCard from "@/components/books/BookCard";
import Spinner from "@/components/ui/Spinner";

type Res = { books: Book[]; totalPages: number; totalBooks: number };

function BooksInner() {
  useTitle("BookNook | All Books");
  const params = useSearchParams();
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => { setSearch(input.trim()); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [input]);

  const qs = new URLSearchParams({ page: String(page), limit: "12" });
  if (search) qs.set("search", search);
  if (category) qs.set("category", category);
  const { data, loading, error } = useApi<Res>(`/books?${qs.toString()}`);

  return (
    <section className="section">
      <div className="container-x">
        <h1 className="section-title">All Books</h1>
        <p className="section-sub">Browse every book on the shelves. Search by title or author, or pick a category.</p>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative md:max-w-sm md:flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search title or author" className="input !pl-11" aria-label="Search books" />
          </div>
          <div className="flex flex-wrap gap-2">
            {["", ...CATEGORIES].map((c) => (
              <button
                key={c || "all"}
                onClick={() => { setCategory(c); setPage(1); }}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${category === c ? "border-transparent bg-gradient-to-br from-[#a32c3e] to-[#5a1220] text-[#f4ead8]" : "border-line text-muted hover:text-ink"}`}
              >
                {c || "All"}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <Spinner label="Loading books..." />
        ) : error ? (
          <p className="mt-10 rounded-xl border border-line p-6 text-center text-muted">Could not load books: {error}</p>
        ) : data?.books.length ? (
          <>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {data.books.map((b) => (<BookCard key={b._id} book={b} />))}
            </div>
            {data.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <button className="btn btn-ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
                <span className="text-sm text-muted">Page {page} of {data.totalPages}</span>
                <button className="btn btn-ghost" disabled={page >= data.totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
              </div>
            )}
          </>
        ) : (
          <p className="mt-10 rounded-xl border border-line p-10 text-center text-muted">No books match your search. Try a different word or category.</p>
        )}
      </div>
    </section>
  );
}

export default function BooksPage() {
  return (<Suspense fallback={<Spinner />}><BooksInner /></Suspense>);
}