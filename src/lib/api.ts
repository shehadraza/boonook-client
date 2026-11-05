import { authClient } from "./auth-client";

// Remove any trailing slash so "https://site.com/" and "https://site.com" both work
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export function errMsg(err: unknown) {
  return err instanceof Error ? err.message : "Something went wrong";
}

type Options = Omit<RequestInit, "headers"> & { auth?: boolean };

export async function apiFetch<T>(path: string, options: Options = {}): Promise<T> {
  const { auth = false, ...rest } = options;
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (auth) {
    const { data } = await authClient.token();
    if (!data?.token) throw new Error("Please log in to continue");
    headers.Authorization = `Bearer ${data.token}`;
  }

  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, { ...rest, headers, cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || `Request failed (${res.status})`);
  return json as T;
}