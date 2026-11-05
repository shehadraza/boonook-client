"use client";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: { background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--line)", borderRadius: "14px" },
        success: { iconTheme: { primary: "#ff8a3d", secondary: "#0d1730" } },
        error: { iconTheme: { primary: "#e5586b", secondary: "#0d1730" } },
      }}
    />
  );
}