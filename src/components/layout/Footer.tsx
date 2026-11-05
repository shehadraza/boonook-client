import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const FbIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.9s-1.4-.2-2.7-.2c-2.8 0-4.5 1.6-4.5 4.6v2.2H6.9v3.3h2.8V22z" /></svg>
);
const GhIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" /></svg>
);

export default function Footer() {
  const social = [
    { label: "X", href: "https://x.com", icon: <XIcon /> },
    { label: "Facebook", href: "https://facebook.com", icon: <FbIcon /> },
    { label: "GitHub", href: "https://github.com", icon: <GhIcon /> },
  ];
  return (
    <footer className="mt-10 border-t border-line bg-surface/60">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">A cosy little library on the web. Add a book, borrow a book, return a book.</p>
          <div className="mt-5 flex gap-3">
            {social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:-translate-y-1 hover:border-gold hover:text-gold">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-lg font-bold">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li><Link href="/books" className="hover:text-ink">All Books</Link></li>
            <li><Link href="/add-book" className="hover:text-ink">Add Book</Link></li>
            <li><Link href="/my-borrows" className="hover:text-ink">My Borrows</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg font-bold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2"><Mail size={16} className="text-gold" /> hello@booknook.com</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-gold" /> +880 1700-000000</li>
            <li className="flex items-center gap-2"><MapPin size={16} className="text-gold" /> 12 Reader Street, Booktown</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-sm text-muted">© 2026 BookNook. All rights reserved.</div>
    </footer>
  );
}