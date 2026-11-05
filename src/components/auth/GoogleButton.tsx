"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton({ callbackURL = "/" }: { callbackURL?: string }) {
  const [busy, setBusy] = useState(false);

  async function go() {
    setBusy(true);
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL });
    if (error) {
      toast.error(error.message || "Google sign-in failed");
      setBusy(false);
    }
  }

  return (
    <button type="button" onClick={go} disabled={busy} className="btn btn-ghost w-full">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
        <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1a6 6 0 1 1 0-12c1.9 0 3.1.8 3.8 1.5l2.6-2.5A9.5 9.5 0 0 0 12 2.5a9.5 9.5 0 1 0 0 19c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6z" />
      </svg>
      {busy ? "Redirecting..." : "Continue with Google"}
    </button>
  );
}