"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { apiFetch, errMsg } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { addDays, formatDate } from "@/lib/utils";
import { BORROW_DAYS } from "@/lib/constants";
import type { Borrow } from "@/types";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Spinner from "@/components/ui/Spinner";

export default function MyBorrowsPage() {
  useTitle("BookNook | My Borrows");
  const { data, loading, error, mutate } = useApi<{ borrows: Borrow[] }>("/borrows", true);
  const [target, setTarget] = useState<Borrow | null>(null);
  const [busy, setBusy] = useState(false);

  // Returned books are not shown, only books you still have
  const borrows = data?.borrows.filter((b) => b.status === "active") ?? [];

  async function confirmReturn() {
    if (!target) return;
    setBusy(true);
    try {
      await apiFetch(`/borrows/${target._id}`, { method: "DELETE", auth: true });
      mutate((d) => ({ ...d, borrows: d.borrows.filter((b) => b._id !== target._id) }));
      toast.success(`"${target.bookTitle}" returned. Thank you!`);
      setTarget(null);
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section">
      <div className="container-x">
        <h1 className="section-title">My Borrows</h1>
        <p className="section-sub">The books you have right now. Return a book when you finish reading it.</p>

        {loading ? (
          <Spinner label="Loading your borrows..." />
        ) : error ? (
          <p className="mt-10 rounded-xl border border-line p-6 text-center text-muted">Could not load your borrows: {error}</p>
        ) : !borrows.length ? (
          <div className="card mt-10 p-12 text-center">
            <p className="text-muted">You have no borrowed books right now.</p>
            <Link href="/books" className="btn btn-primary mt-5">Browse Books</Link>
          </div>
        ) : (
          <>
            <p className="mt-8 text-sm text-muted">
              {borrows.length} {borrows.length === 1 ? "book" : "books"} borrowed
            </p>
            <div className="card mt-3 overflow-x-auto">
              <table className="d-table w-full min-w-[820px]">
                <thead>
                  <tr>
                    <th className="th">Book</th>
                    <th className="th">Borrow Date</th>
                    <th className="th">Return Date</th>
                    <th className="th">Copies</th>
                    <th className="th text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {borrows.map((b) => {
                    const due = b.dueDate || addDays(b.borrowedAt, BORROW_DAYS);
                    const hasCopies = b.copiesBefore !== undefined && b.copiesAfter !== undefined;
                    return (
                      <tr key={b._id}>
                        <td className="td">
                          <div className="flex items-center gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={b.bookImage} alt={b.bookTitle} className="h-[72px] w-14 rounded-lg object-cover" />
                            <div>
                              <p className="font-semibold">{b.bookTitle}</p>
                              <p className="text-sm text-muted">{b.bookAuthor}</p>
                            </div>
                          </div>
                        </td>
                        <td className="td text-sm">{formatDate(b.borrowedAt)}</td>
                        <td className="td text-sm">
                          {formatDate(due)} <span className="text-muted">(due)</span>
                        </td>
                        <td className="td text-sm">
                          {hasCopies ? (
                            <div>
                              <p>{b.copiesBefore} available before</p>
                              <p className="text-muted">{b.copiesAfter} left after you borrowed</p>
                            </div>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td className="td text-right">
                          <button className="btn btn-primary !px-5 !py-2" onClick={() => setTarget(b)}>Return Book</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <ConfirmModal
        open={!!target}
        busy={busy}
        title="Return this book?"
        message={`You are returning "${target?.bookTitle ?? ""}". The copy goes back on the shelf for the next reader.`}
        confirmLabel="Return Book"
        onConfirm={confirmReturn}
        onClose={() => setTarget(null)}
      />
    </section>
  );
}