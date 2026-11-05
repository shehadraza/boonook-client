"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Spinner from "@/components/ui/Spinner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    // Redirect only after the session check has finished, so a reload keeps you on the page
    if (!isPending && !session) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [isPending, session, pathname, router]);

  if (isPending || !session) return <Spinner label="Checking your session..." />;
  return <>{children}</>;
}