
"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import type { Book } from "@/types";

export default function BookCard({ book }: { book: Book }) {
  const [imageError, setImageError] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [9, -9]),
    { stiffness: 220, damping: 20 }
  );

  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-9, 9]),
    { stiffness: 220, damping: 20 }
  );

  const out = book.availableCopies < 1;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.article
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - r.left) / r.width - 0.5);
          y.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        className="card flex h-full flex-col overflow-hidden transition-shadow hover:shadow-2xl hover:shadow-black/50"
      >
        <div className="relative flex h-80 w-full items-center justify-center overflow-hidden bg-[#111827]">
          {!imageError && book.image ? (
            <img
              src={book.image}
              alt={`${book.title} book cover`}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#18365e] to-[#090f20] p-6 text-center">
              <div className="mb-5 h-1 w-16 rounded-full bg-[#ff9b50]" />
              <h3 className="font-display text-2xl font-bold text-white">
                {book.title}
              </h3>
              <div className="mt-5 h-px w-20 bg-[#ff9b50]" />
              <p className="mt-5 text-sm text-slate-300">
                {book.author}
              </p>
            </div>
          )}

          <span className="badge absolute left-3 top-3 backdrop-blur">
            {book.category}
          </span>

          {out && (
            <span className="absolute right-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-red-300">
              Not Available
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="line-clamp-1 font-display text-xl font-bold">
            {book.title}
          </h3>

          <p className="mt-1 line-clamp-1 text-sm text-muted">
            by {book.author}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted">
              {book.availableCopies} of {book.totalCopies} available
            </span>

            <span className="text-sm text-amber-500">
              {"★".repeat(Math.max(0, Math.min(5, book.rating || 0)))}
            </span>
          </div>

          <Link
            href={`/books/${book._id}`}
            className="btn btn-primary mt-auto w-full !py-2.5"
            style={{ marginTop: "1.25rem" }}
          >
            View Details
          </Link>
        </div>
      </motion.article>
    </motion.div>
  );
}
