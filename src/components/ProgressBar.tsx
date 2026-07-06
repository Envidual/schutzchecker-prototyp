export function ProgressBar({ value }: { value: number }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <div className="sticky top-0 z-20 bg-white border-b border-border px-4 py-6">
      <div className="h-5 rounded-lg bg-track-light overflow-hidden">
        <div
          className="h-full rounded-lg bg-teal transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
