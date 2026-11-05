"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, User, Star } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import type { Book } from "@/types";
import Spinner from "@/components/ui/Spinner";


type Res = {
  book: Book;
};

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = String(params.id || "");

  const { data, loading, error } = useApi<Res>(
    id ? `/books/${id}` : null
  );

  const book = data?.book;

  useTitle(book ? `BookNook | ${book.title}` : "BookNook | Book Details");

  if (loading) {
    return <Spinner label="Loading book details..." />;
  }

  if (error || !book) {
    return (
      <section className="section">
        <div className="container-x text-center">
          <h1 className="section-title">Book Not Found</h1>
          <p className="section-sub mt-3">
            {error || "This book could not be found."}
          </p>
          <Link href="/books" className="btn btn-primary mt-6">
            Back to All Books
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container-x">
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 text-muted hover:text-ink"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-line bg-white p-8">
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                className="max-h-[380px] max-w-full object-contain"
              />
            ) : (
              <BookOpen size={100} className="text-muted" />
            )}
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">
              {book.category}
            </span>

            <h1 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
              {book.title}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-muted">
              <User size={18} />
              {book.author}
            </p>

            <div className="mt-5 flex items-center gap-2">
              <Star size={18} className="fill-amber-500 text-amber-500" />
              <span>{book.rating ?? "No rating yet"}</span>
            </div>

            <div className="mt-8 rounded-xl border border-line p-5">
              <p className="text-sm text-muted">Available Copies</p>
              <p className="mt-2 text-2xl font-bold text-ink">
                —
              </p>
            </div>

            <h2 className="mt-8 text-lg font-semibold text-ink">
              About This Book
            </h2>

            <p className="mt-3 leading-7 text-muted">
              {book.description || "No description available for this book."}
            </p>

            <div className="mt-8">
              <Link href="/books" className="btn btn-primary">
                Browse More Books
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}