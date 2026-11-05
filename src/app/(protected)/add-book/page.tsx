"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useTitle } from "@/hooks/useTitle";
import type { BookPayload } from "@/types";
import BookForm from "@/components/books/BookForm";

export default function AddBookPage() {
  useTitle("BookNook | Add Book");
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  async function onSubmit(data: BookPayload) {
    await apiFetch("/books", { method: "POST", auth: true, body: JSON.stringify(data) });
    toast.success("Book added to the shelves!");
    router.push("/my-books");
  }

  return (
    <section className="section">
      <div className="container-x max-w-4xl">
        <h1 className="section-title">Add a Book</h1>
        <p className="section-sub">Share a book with the community. Readers can borrow it right away.</p>
        <div className="card mt-8 p-6 md:p-8">
          {user && <BookForm userName={user.name} userEmail={user.email} submitLabel="Add Book" onSubmit={onSubmit} />}
        </div>
      </div>
    </section>
  );
}