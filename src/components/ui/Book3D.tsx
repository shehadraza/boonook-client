import type { CSSProperties } from "react";

type Props = { title: string; subtitle?: string; c1?: string; c2?: string; className?: string };

export default function Book3D({ title, subtitle, c1 = "#2b4a7c", c2 = "#0a1226", className = "" }: Props) {
  return (
    <div className={`book-wrap relative ${className}`} aria-hidden>
      <div className="scene">
        <div className="book3d" style={{ "--c1": c1, "--c2": c2 } as CSSProperties}>
          <div className="face front"><i /><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}<i /></div>
          <div className="face back" />
          <div className="face spine" />
          <div className="face pages" />
          <div className="face top" />
          <div className="face bottom" />
        </div>
      </div>
      <div className="book-shadow" style={{ left: 15 }} />
    </div>
  );
}