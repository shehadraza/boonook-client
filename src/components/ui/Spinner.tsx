export default function Spinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center gap-5" role="status">
      <div className="spinner-book" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}