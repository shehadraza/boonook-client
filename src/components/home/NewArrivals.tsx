"use client";
import Link from "next/link";
import { useApi } from "@/hooks/useApi";
import type { Book } from "@/types";
import BookCard from "@/components/books/BookCard";
import EmptyState from "@/components/books/EmptyState";
import Spinner from "@/components/ui/Spinner";
import Reveal from "@/components/ui/Reveal";

export default function NewArrivals() {
  const { data, loading, error } = useApi<{ books: Book[] }>("/books?limit=6");

  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-sub">The six newest books added to the shelves by our readers.</p>
        </Reveal>

        {loading ? (
          <Spinner label="Fetching the latest books..." />
        ) : error ? (
          <p className="mt-10 rounded-xl border border-line p-6 text-center text-muted">Could not load books: {error}</p>
        ) : data?.books.length ? (
          <>
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {data.books.map((b) => (<BookCard key={b._id} book={b} />))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/books" className="btn btn-primary">See All Books</Link>
            </div>
          </>
        ) : (
          <EmptyState title="The shelves are empty" text="No books have been added yet. Add the first book and start the library." />
        )}
      </div>
    </section>
  );
}