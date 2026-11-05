"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, User, X } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Avatar from "@/components/ui/Avatar";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];
const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDrop(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  async function logout() {
    await authClient.signOut();
    setDrop(false);
    setMenu(false);
    toast.success("You have been logged out");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="glass sticky top-0 z-50 border-b border-line">
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${isActive(l.href) ? "text-ink" : "text-muted hover:text-ink"}`}>
              {isActive(l.href) && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full border border-line bg-surface2" />}
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isPending ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-surface2" />
          ) : user ? (
            <div className="relative" ref={dropRef}>
              <button onClick={() => setDrop((d) => !d)} aria-label="Open user menu" className="block h-10 w-10 overflow-hidden rounded-full border-2 border-gold">
                <Avatar key={user.image ?? "none"} src={user.image} name={user.name} />
              </button>
              <AnimatePresence>
                {drop && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    style={{ transformPerspective: 800, transformOrigin: "top right" }}
                    className="card absolute right-0 mt-3 w-64 p-3 shadow-2xl shadow-black/50"
                  >
                    <div className="border-b border-line px-3 pb-3">
                      <p className="font-semibold">{user.name}</p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                    </div>
                    <Link href="/profile" onClick={() => setDrop(false)} className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-surface2">
                      <User size={16} /> My Profile
                    </Link>
                    <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#e5586b] hover:bg-surface2">
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className="btn btn-ghost !py-2">Login</Link>
              <Link href="/register" className="btn btn-primary !py-2">Register</Link>
            </div>
          )}

          <button className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden" onClick={() => setMenu((m) => !m)} aria-label="Toggle menu">
            {menu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line lg:hidden">
            <div className="container-x flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMenu(false)} className={`rounded-xl px-4 py-3 text-sm font-medium ${isActive(l.href) ? "bg-surface2 text-ink" : "text-muted"}`}>
                  {l.label}
                </Link>
              ))}
              {!user && !isPending && (
                <div className="mt-2 flex gap-2">
                  <Link href="/login" onClick={() => setMenu(false)} className="btn btn-ghost flex-1">Login</Link>
                  <Link href="/register" onClick={() => setMenu(false)} className="btn btn-primary flex-1">Register</Link>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}