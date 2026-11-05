"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookMarked, BookPlus, CalendarClock, Check, Search, Undo2, UserPlus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    icon: UserPlus,
    title: "Create your account",
    text: "Register with your name, email, photo link and a password. The password needs at least 6 characters, one uppercase and one lowercase letter. You can also continue with Google.",
    href: "/register",
    cta: "Register",
  },
  {
    icon: BookPlus,
    title: "Add a book",
    text: "Open Add Book and enter the title, author, category, short description and total copies. Upload a cover image and press Add Book. Your book goes on the shelves right away.",
    href: "/add-book",
    cta: "Add a book",
  },
  {
    icon: Search,
    title: "Find a book",
    text: "Open All Books and search by title or author, or pick a category. Press View Details on any card to read the full description and see how many copies are left.",
    href: "/books",
    cta: "Browse books",
  },
  {
    icon: BookMarked,
    title: "Borrow the book",
    text: "On the details page press Borrow This Book, check your name and email, then press Confirm Borrow. One copy leaves the shelf and the book stays with you for 14 days.",
    href: "/books",
    cta: "Pick a book",
  },
  {
    icon: CalendarClock,
    title: "Track your borrows",
    text: "My Borrows lists every book you borrowed with its borrow date and return date. Check it any time to see when each book is due back.",
    href: "/my-borrows",
    cta: "My Borrows",
  },
  {
    icon: Undo2,
    title: "Return the book",
    text: "Finished reading? Press Return Book in My Borrows and confirm. The copy goes back on the shelf so the next reader can borrow it.",
    href: "/my-borrows",
    cta: "Return a book",
  },
];

const rules = [
  "You can keep a borrowed book for 14 days.",
  "You can borrow one copy of a book at a time. Borrowing the same book twice shows an error.",
  "When every copy is out, the button shows Not Available until someone returns one.",
  "You cannot borrow a book that you added yourself.",
  "Edit or delete your own books from My Books. A book cannot be deleted while copies are borrowed.",
  "Add Book, Book Details, My Books and My Borrows need a login. After you log in, we bring you back to the page you wanted.",
];

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <h2 className="section-title">How Borrowing Works</h2>
          <p className="section-sub">Three simple steps from a shelf to your hands and back again. Here is every step in detail.</p>
        </Reveal>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.1} className="h-full">
              <motion.div whileHover={{ y: -6 }} className="card flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-brand-ink">
                    <s.icon size={26} />
                  </span>
                  <span className="text-sm font-semibold text-muted">Step {i + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
                <Link href={s.href} className="btn btn-ghost mt-auto self-start !py-2" style={{ marginTop: "1.5rem" }}>{s.cta}</Link>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="card p-7">
            <h3 className="font-display text-2xl font-bold">Good to know</h3>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {rules.map((r) => (
                <li key={r} className="flex items-start gap-3 text-muted">
                  <Check size={18} className="mt-1 shrink-0 text-gold" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}