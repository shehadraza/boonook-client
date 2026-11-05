"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useTitle } from "@/hooks/useTitle";
import { formatDate } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";

export default function ProfilePage() {
  useTitle("BookNook | My Profile");
  const { data: session } = authClient.useSession();
  const user = session?.user;
  if (!user) return null;

  return (
    <section className="section">
      <div className="container-x max-w-xl">
        <div className="card p-8 text-center">
          <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-gold">
            <Avatar key={user.image ?? "none"} src={user.image} name={user.name} className="text-4xl" />
          </div>
          <h1 className="section-title mt-5 !text-3xl">{user.name}</h1>
          <p className="text-muted">{user.email}</p>
          <p className="mt-2 text-sm text-muted">Member since {formatDate(String(user.createdAt))}</p>
          <div className="mt-7 flex justify-center gap-3">
            <Link href="/my-books" className="btn btn-primary">My Books</Link>
            <Link href="/my-borrows" className="btn btn-ghost">My Borrows</Link>
          </div>
        </div>
      </div>
    </section>
  );
}