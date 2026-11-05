import Book3D from "@/components/ui/Book3D";

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="container-x grid min-h-[80vh] items-center gap-10 py-12 lg:grid-cols-2">
      <div className="hidden justify-center lg:flex">
        <Book3D title="BookNook" subtitle="Open the cover" className="scale-[1.35]" />
      </div>
      <div className="card mx-auto w-full max-w-md p-8">
        <h1 className="section-title !text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}