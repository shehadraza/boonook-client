"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Atom, Castle, Landmark, Library, Sparkles } from "lucide-react";
import Reveal from "../ui/Reveal";

const cats = [
  { name: "Fiction", icon: Sparkles, text: "Novels and tales" },
  { name: "Science", icon: Atom, text: "Ideas that explain the world" },
  { name: "History", icon: Landmark, text: "Stories of the past" },
  { name: "Kids", icon: Castle, text: "Picture books and fun" },
  { name: "Others", icon: Library, text: "Everything in between" },
];

export default function TopCategories() {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <h2 className="section-title">Top Categories</h2>
          <p className="section-sub">Jump straight to the shelf that matches your mood.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cats.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08} className="h-full">
              <motion.div whileHover={{ y: -10, rotateX: 8 }} style={{ transformPerspective: 800 }} className="h-full">
                <Link href={`/books?category=${c.name}`} className="card flex h-full flex-col items-center p-6 text-center transition hover:border-gold">
                  <c.icon size={34} className="text-gold" />
                  <h3 className="mt-4 font-display text-xl font-bold">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted">{c.text}</p>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}