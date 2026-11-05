"use client";
import { useCallback, useEffect, useState } from "react";
import { apiFetch, errMsg } from "@/lib/api";

type State<T> = { key: string; data: T | null; error: string | null };

export function useApi<T>(path: string | null, auth = false) {
  const [state, setState] = useState<State<T> | null>(null);

  useEffect(() => {
    if (!path) return;
    let off = false;
    apiFetch<T>(path, { auth })
      .then((data) => !off && setState({ key: path, data, error: null }))
      .catch((e) => !off && setState({ key: path, data: null, error: errMsg(e) }));
    return () => { off = true; };
  }, [path, auth]);

  const mutate = useCallback((fn: (d: T) => T) => {
    setState((s) => (s && s.data ? { ...s, data: fn(s.data) } : s));
  }, []);

  const fresh = state?.key === path;
  return { data: fresh ? state.data : null, error: fresh ? state.error : null, loading: !!path && !fresh, mutate };
}