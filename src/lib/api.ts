import { authClient } from "./auth-client";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

  const res = await fetch(`${API_URL}${path}`, { ...rest, headers, cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Request failed");
  return json as T;
}