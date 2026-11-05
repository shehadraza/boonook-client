"use client";
import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useTitle } from "@/hooks/useTitle";
import AuthShell from "@/components/auth/AuthShell";
import GoogleButton from "@/components/auth/GoogleButton";
import Spinner from "@/components/ui/Spinner";

function LoginForm() {
  useTitle("BookNook | Login");
  const router = useRouter();
  const params = useSearchParams();
  const raw = params.get("redirect") || "/";
  const redirect = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const { error: err } = await authClient.signIn.email({ email: String(fd.get("email")), password: String(fd.get("password")) });
    setBusy(false);
    if (err) {
      const msg = err.message || "Invalid email or password";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("Welcome back to BookNook!");
    router.push(redirect);
    router.refresh();
  }

  return (
    <AuthShell title="Welcome back" subtitle="Login to borrow, add and manage your books.">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="input" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <div className="relative">
            <input id="password" name="password" type={show ? "text" : "password"} required className="input !pr-12" placeholder="Your password" />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label="Show or hide password" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div className="text-right">
          <button type="button" onClick={() => toast("Password reset is coming soon", { icon: "🔑" })} className="text-sm text-gold hover:underline">Forget Password?</button>
        </div>
        {error && <p className="rounded-lg border border-[#e5586b]/40 bg-[#e5586b]/10 px-3 py-2 text-sm text-[#e5586b]">{error}</p>}
        <button type="submit" disabled={busy} className="btn btn-primary w-full">{busy ? "Logging in..." : "Login"}</button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" /></div>
      <GoogleButton callbackURL={redirect} />
      <p className="mt-6 text-center text-sm text-muted">
        New to BookNook?{" "}
        <Link href={redirect === "/" ? "/register" : `/register?redirect=${encodeURIComponent(redirect)}`} className="font-semibold text-gold hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (<Suspense fallback={<Spinner />}><LoginForm /></Suspense>);
}