import { Loader2 } from "lucide-react";

export function LoadingCard() {
  return (
    <div className="bg-white rounded-md p-5 flex flex-col gap-5 w-full">
      <div className="flex items-center gap-4">
        <Loader2 size={26} className="text-ink-strong animate-spin shrink-0" />
        <div className="min-w-0">
          <p className="font-headline font-bold text-[15px] text-navy">Ihr Angebot wird vorbereitet.</p>
          <p className="text-[13px] text-muted mt-0.5">Die Vertragsunterlagen werden gerade erstellt.</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-3 rounded-full bg-teal-tint animate-pulse" style={{ width: "90%" }} />
        <div className="h-3 rounded-full bg-teal-tint animate-pulse" style={{ width: "75%" }} />
        <div className="h-3 rounded-full bg-teal-tint animate-pulse" style={{ width: "55%" }} />
      </div>
    </div>
  );
}
