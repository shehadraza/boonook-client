"use client";
import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Eye, EyeOff, X } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useTitle } from "@/hooks/useTitle";
import AuthShell from "@/components/auth/AuthShell";
import GoogleButton from "@/components/auth/GoogleButton";
import Spinner from "@/components/ui/Spinner";

function RegisterForm() {
  useTitle("BookNook | Register");
  const router = useRouter();
  const params = useSearchParams();
  const raw = params.get("redirect") || "";
  const redirect = raw.startsWith("/") && !raw.startsWith("//") ? raw : "";
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const rules = [
    { label: "At least 6 characters", ok: pw.length >= 6 },
    { label: "One uppercase letter", ok: /[A-Z]/.test(pw) },
    { label: "One lowercase letter", ok: /[a-z]/.test(pw) },
  ];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const failed = rules.find((r) => !r.ok);
    if (failed) {
      const msg = `Password needs: ${failed.label.toLowerCase()}`;
      setError(msg);
      toast.error(msg);
      return;
    }
    const fd = new FormData(e.currentTarget);
    const photo = String(fd.get("photo") || "").trim();
    setBusy(true);
    const { error: err } = await authClient.signUp.email({
      name: String(fd.get("name")),
      email: String(fd.get("email")),
      password: pw,
      image: photo || undefined,
    });
    setBusy(false);
    if (err) {
      const msg = err.message || "Registration failed";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("Account created! Please login.");
    router.push(redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : "/login");
  }

  return (
    <AuthShell title="Join BookNook" subtitle="Create an account and start sharing books.">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input id="name" name="name" required className="input" placeholder="Your full name" />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="input" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label" htmlFor="photo">Photo URL</label>
          <input id="photo" name="photo" type="url" className="input" placeholder="https://i.ibb.co/your-photo.jpg" />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <div className="relative">
            <input id="password" type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} required className="input !pr-12" placeholder="Create a password" />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label="Show or hide password" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <ul className="mt-3 space-y-1 text-xs">
            {rules.map((r) => (
              <li key={r.label} className={`flex items-center gap-2 ${r.ok ? "text-gold" : "text-muted"}`}>
                {r.ok ? <Check size={14} /> : <X size={14} />} {r.label}
              </li>
            ))}
          </ul>
        </div>
        {error && <p className="rounded-lg border border-[#e5586b]/40 bg-[#e5586b]/10 px-3 py-2 text-sm text-[#e5586b]">{error}</p>}
        <button type="submit" disabled={busy} className="btn btn-primary w-full">{busy ? "Creating account..." : "Register"}</button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" /></div>
      <GoogleButton callbackURL="/" />
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account? <Link href="/login" className="font-semibold text-gold hover:underline">Login</Link>
      </p>
    </AuthShell>
  );
}

export default function RegisterPage() {
  return (<Suspense fallback={<Spinner />}><RegisterForm /></Suspense>);
}