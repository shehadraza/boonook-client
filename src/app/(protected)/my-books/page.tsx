"use client";
import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch, errMsg } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { formatDate } from "@/lib/utils";
import type { Book, BookPayload } from "@/types";
import BookForm from "@/components/books/BookForm";
import Modal from "@/components/ui/Modal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Spinner from "@/components/ui/Spinner";

export default function MyBooksPage() {
  useTitle("BookNook | My Books");
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { data, loading, error, mutate } = useApi<{ books: Book[] }>(
    user ? `/books?ownerEmail=${encodeURIComponent(user.email)}&limit=50` : null
  );
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [busy, setBusy] = useState(false);

  async function saveEdit(payload: BookPayload) {
    if (!editing) return;
    const res = await apiFetch<{ book: Book }>(`/books/${editing._id}`, { method: "PATCH", auth: true, body: JSON.stringify(payload) });
    mutate((d) => ({ ...d, books: d.books.map((b) => (b._id === editing._id ? res.book : b)) }));
    toast.success("Book updated successfully");
    setEditing(null);
  }

  async function confirmDelete() {
    if (!deleting) return;
    setBusy(true);
    try {
      await apiFetch(`/books/${deleting._id}`, { method: "DELETE", auth: true });
      mutate((d) => ({ ...d, books: d.books.filter((b) => b._id !== deleting._id) }));
      toast.success("Book deleted");
      setDeleting(null);
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="section-title">My Books</h1>
            <p className="section-sub">Books you added. Edit the details or remove them from the shelves.</p>
          </div>
          <Link href="/add-book" className="btn btn-primary">Add Book</Link>
        </div>

        {loading ? (
          <Spinner label="Loading your books..." />
        ) : error ? (
          <p className="mt-10 rounded-xl border border-line p-6 text-center text-muted">Could not load your books: {error}</p>
        ) : !data?.books.length ? (
          <div className="card mt-10 p-12 text-center">
            <p className="text-muted">You have not added any books yet.</p>
            <Link href="/add-book" className="btn btn-primary mt-5">Add your first book</Link>
          </div>
        ) : (
          <div className="card mt-10 overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr><th className="th">Book</th><th className="th">Category</th><th className="th">Copies</th><th className="th">Added</th><th className="th text-right">Actions</th></tr>
              </thead>
              <tbody>
                {data.books.map((b) => (
                  <tr key={b._id}>
                    <td className="td">
                      <div className="flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.image} alt={b.title} className="h-[72px] w-14 rounded-lg object-cover" />
                        <div><p className="font-semibold">{b.title}</p><p className="text-sm text-muted">{b.author}</p></div>
                      </div>
                    </td>
                    <td className="td"><span className="badge">{b.category}</span></td>
                    <td className="td text-sm">{b.availableCopies} / {b.totalCopies}</td>
                    <td className="td text-sm text-muted">{formatDate(b.createdAt)}</td>
                    <td className="td">
                      <div className="flex justify-end gap-2">
                        <button className="btn btn-ghost !px-4 !py-2" onClick={() => setEditing(b)}><Pencil size={15} /> Edit</button>
                        <button className="btn btn-danger !px-4 !py-2" onClick={() => setDeleting(b)}><Trash2 size={15} /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit book" wide>
        {editing && user && <BookForm key={editing._id} initial={editing} userName={user.name} userEmail={user.email} submitLabel="Save Changes" onSubmit={saveEdit} />}
      </Modal>

      <ConfirmModal open={!!deleting} busy={busy} title="Delete this book?" message={`"${deleting?.title ?? ""}" will be removed from the shelves for good.`} confirmLabel="Delete Book" onConfirm={confirmDelete} onClose={() => setDeleting(null)} />
    </section>
  );
}