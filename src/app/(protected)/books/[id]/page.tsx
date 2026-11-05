"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookMarked, CalendarClock, Info, Library, User } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch, errMsg } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { formatDate } from "@/lib/utils";
import { BORROW_DAYS } from "@/lib/constants";
import type { Book, Borrow } from "@/types";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { data, loading, error, mutate } = useApi<{ book: Book }>(`/books/${id}`, true);
  const { data: borrowData } = useApi<{ borrows: Borrow[] }>("/borrows", true);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [justBorrowed, setJustBorrowed] = useState(false);
  const book = data?.book;
  useTitle(book ? `BookNook | ${book.title}` : "BookNook | Book Details");

  if (loading) return <Spinner label="Opening the book..." />;

  if (error || !book)
    return (
      <div className="container-x py-24 text-center">
        <h1 className="section-title">Book not found</h1>
        <p className="section-sub mx-auto">{error || "This book is no longer on the shelves."}</p>
        <Link href="/books" className="btn btn-primary mt-6">Back to All Books</Link>
      </div>
    );

  const alreadyBorrowed =
    justBorrowed || !!borrowData?.borrows.some((b) => b.bookId === book._id && b.status === "active");
  const isOwner = user?.email === book.ownerEmail;
  const soldOut = book.availableCopies < 1;

  // One label and one note for every state, so the reader always knows why a button is disabled
  let label = "Borrow This Book";
  let note = `Borrow this book for ${BORROW_DAYS} days. You can return it any time from My Borrows.`;
  let disabled = false;

  if (isOwner) {
    label = "You added this book";
    note = "You added this book yourself, so you cannot borrow it. You can edit or delete it from My Books.";
    disabled = true;
  } else if (alreadyBorrowed) {
    label = "Already Borrowed";
    note = "You already have a copy of this book. Return it from My Borrows if you want to borrow it again.";
    disabled = true;
  } else if (soldOut) {
    label = "Not Available";
    note = "All copies are borrowed right now. Check again after another reader returns one.";
    disabled = true;
  }

  async function confirmBorrow() {
    setBusy(true);
    try {
      await apiFetch("/borrows", { method: "POST", auth: true, body: JSON.stringify({ bookId: book!._id }) });
      toast.success("Book borrowed! Enjoy reading.");
      setJustBorrowed(true);
      mutate((d) => ({ book: { ...d.book, availableCopies: d.book.availableCopies - 1 } }));
      setOpen(false);
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section">
      <div className="container-x">
        <Link href="/books" className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft size={16} /> Back to All Books
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Cover */}
          <div className="mx-auto w-full max-w-md" style={{ perspective: 1200 }}>
            <div
              className="relative overflow-hidden rounded-2xl border border-line shadow-2xl shadow-black/60"
              style={{ transform: "rotateY(-8deg) rotateX(3deg)", transformStyle: "preserve-3d" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={book.image} alt={book.title} className="h-[480px] w-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="badge">{book.category}</span>
            <h1 className="section-title mt-4">{book.title}</h1>
            <p className="mt-2 text-lg text-muted">by {book.author}</p>

            <div className="d-rating d-rating-sm pointer-events-none mt-3" aria-label={`${book.rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((n) => (
                <input key={n} type="radio" name="book-rating" className="d-mask d-mask-star-2 bg-gold" defaultChecked={n === Math.round(book.rating)} aria-label={`${n} star`} />
              ))}
            </div>

            <h2 className="mt-8 font-display text-xl font-bold">About this book</h2>
            <p className="mt-2 max-w-xl text-muted">{book.description}</p>

            <dl className="mt-8 grid max-w-xl grid-cols-2 gap-4 text-sm">
              <div className="card p-4">
                <dt className="flex items-center gap-2 text-muted"><Library size={15} /> Copies available</dt>
                <dd className="mt-1 text-xl font-bold">{book.availableCopies} of {book.totalCopies}</dd>
              </div>
              <div className="card p-4">
                <dt className="flex items-center gap-2 text-muted"><CalendarClock size={15} /> Borrow period</dt>
                <dd className="mt-1 text-xl font-bold">{BORROW_DAYS} days</dd>
              </div>
              <div className="card col-span-2 p-4">
                <dt className="flex items-center gap-2 text-muted"><User size={15} /> Added by</dt>
                <dd className="mt-1 font-semibold">
                  {book.ownerName} <span className="font-normal text-muted">({book.ownerEmail})</span>
                </dd>
                <dd className="mt-1 text-muted">Added on {formatDate(book.createdAt)}</dd>
              </div>
            </dl>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              {justBorrowed ? (
                <Link href="/my-borrows" className="btn btn-primary"><BookMarked size={18} /> View My Borrows</Link>
              ) : (
                <button className="btn btn-primary" disabled={disabled} onClick={() => setOpen(true)}>
                  <BookMarked size={18} /> {label}
                </button>
              )}
              <Link href="/books" className="btn btn-ghost">Back to All Books</Link>
            </div>

            <p className="mt-4 flex max-w-xl items-start gap-2 text-sm text-muted">
              <Info size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>{justBorrowed ? "Done! The book is now in My Borrows. Return it there when you finish reading." : note}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Borrow modal */}
      <Modal open={open} onClose={() => !busy && setOpen(false)} title="Borrow this book">
        <p className="mb-5 text-sm text-muted">
          You will keep <strong className="text-ink">{book.title}</strong> for {BORROW_DAYS} days.
        </p>
        <div className="space-y-4">
          <div>
            <label className="label" htmlFor="borrow-name">Your Name</label>
            <input id="borrow-name" readOnly value={user?.name || ""} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="borrow-email">Your Email</label>
            <input id="borrow-email" readOnly value={user?.email || ""} className="input" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-ghost" onClick={() => setOpen(false)} disabled={busy}>Cancel</button>
          <button className="btn btn-primary" onClick={confirmBorrow} disabled={busy}>
            {busy ? "Borrowing..." : "Confirm Borrow"}
          </button>
        </div>
      </Modal>
    </section>
  );
}