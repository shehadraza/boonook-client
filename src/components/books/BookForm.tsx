"use client";
import { FormEvent, useState } from "react";
import { ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import { CATEGORIES } from "@/lib/constants";
import { errMsg } from "@/lib/api";
import { uploadImage } from "@/lib/upload";
import type { Book, BookPayload } from "@/types";

type Props = {
  initial?: Book; userName: string; userEmail: string; submitLabel: string;
  onSubmit: (data: BookPayload) => Promise<void>;
};

export default function BookForm({ initial, userName, userEmail, submitLabel, onSubmit }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(initial?.image || "");
  const [busy, setBusy] = useState(false);

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const copies = Number(fd.get("totalCopies"));
    if (!file && !initial?.image) return toast.error("Please choose a cover image for the book");
    if (!Number.isInteger(copies) || copies < 1) return toast.error("Total copies must be 1 or more");

    setBusy(true);
    try {
      const image = file ? await uploadImage(file) : (initial?.image as string);
      await onSubmit({
        title: String(fd.get("title")).trim(),
        author: String(fd.get("author")).trim(),
        category: String(fd.get("category")),
        description: String(fd.get("description")).trim(),
        image,
        totalCopies: copies,
      });
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handle} className="grid gap-5 md:grid-cols-2">
      <div>
        <label className="label" htmlFor="title">Book Title</label>
        <input id="title" name="title" required defaultValue={initial?.title} className="input" placeholder="The Silent Garden" />
      </div>
      <div>
        <label className="label" htmlFor="author">Author Name</label>
        <input id="author" name="author" required defaultValue={initial?.author} className="input" placeholder="Author name" />
      </div>
      <div>
        <label className="label" htmlFor="category">Category</label>
        <select id="category" name="category" required defaultValue={initial?.category || "Fiction"} className="input">
          {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="totalCopies">Total Copies</label>
        <input id="totalCopies" name="totalCopies" type="number" min={1} step={1} required defaultValue={initial?.totalCopies ?? 1} className="input" />
      </div>

      <div className="md:col-span-2">
        <label className="label">Book Image</label>
        <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-line bg-surface2 p-4 transition hover:border-gold">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Book cover preview" className="h-24 w-[72px] rounded-lg object-cover" />
          ) : (
            <span className="grid h-24 w-[72px] place-items-center rounded-lg bg-surface text-muted"><ImagePlus /></span>
          )}
          <span className="text-sm text-muted">{file ? file.name : "Click to choose a cover image (JPG, PNG, WEBP)"}</span>
          <input
            type="file" accept="image/*" className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
            }}
          />
        </label>
      </div>

      <div className="md:col-span-2">
        <label className="label" htmlFor="description">Short Description</label>
        <textarea id="description" name="description" required rows={4} defaultValue={initial?.description} className="input resize-none" placeholder="What is this book about?" />
      </div>

      <div>
        <label className="label">Your Name</label>
        <input readOnly value={userName} className="input" />
      </div>
      <div>
        <label className="label">Your Email</label>
        <input readOnly value={userEmail} className="input" />
      </div>

      <div className="md:col-span-2">
        <button type="submit" disabled={busy} className="btn btn-primary w-full md:w-auto">{busy ? "Saving..." : submitLabel}</button>
      </div>
    </form>
  );
}