"use client";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    if (next === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try { localStorage.setItem("booknook-theme", next); } catch {}
  }
  return (
    <div className="d-tooltip d-tooltip-bottom" data-tip="Change theme">
      <button onClick={toggle} aria-label="Toggle theme" className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition hover:bg-surface2">
        <Sun size={18} className="show-dark" />
        <Moon size={18} className="show-light" />
      </button>
    </div>
  );
}