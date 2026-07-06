import { AlertTriangle } from "lucide-react";

interface RiskFooterBarProps {
  riskLevel: string;
  address: string;
  onNext: () => void;
  nextLabel?: string;
}

export function RiskFooterBar({ riskLevel, address, onNext, nextLabel = "Weiter" }: RiskFooterBarProps) {
  return (
    <div className="sticky bottom-0 z-20 bg-white border-t border-border px-4 py-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="size-11 shrink-0 rounded-full bg-error-tint flex items-center justify-center">
          <AlertTriangle size={20} className="text-error" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-error text-[15px] leading-tight truncate">{riskLevel}</p>
          <p className="text-error/80 text-[13px] leading-tight truncate">{address}</p>
        </div>
      </div>
      <button
        onClick={onNext}
        className="shrink-0 rounded-xl bg-teal text-white font-semibold text-[15px] px-7 py-3.5 active:scale-[0.98] transition"
      >
        {nextLabel}
      </button>
    </div>
  );
}
