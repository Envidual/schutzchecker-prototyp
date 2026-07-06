import { Check } from "lucide-react";
import type { ReactNode } from "react";

export type StepState = "active" | "done" | "upcoming";

function StepCircle({ state, number }: { state: StepState; number: number }) {
  if (state === "done") {
    return (
      <div className="size-10 shrink-0 rounded-full bg-teal flex items-center justify-center">
        <Check size={18} className="text-white" />
      </div>
    );
  }
  return (
    <div
      className={`size-10 shrink-0 rounded-full border-[3px] flex items-center justify-center ${
        state === "active" ? "border-teal" : "border-border"
      }`}
    >
      <span className={`font-extrabold text-[16px] ${state === "active" ? "text-teal" : "text-muted"}`}>
        {number}
      </span>
    </div>
  );
}

export function Step({
  number,
  title,
  state,
  isLast,
  onHeaderClick,
  children,
}: {
  number: number;
  title: string;
  state: StepState;
  isLast?: boolean;
  onHeaderClick?: () => void;
  children?: ReactNode;
}) {
  const clickable = state === "done" && !!onHeaderClick;
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <StepCircle state={state} number={number} />
        {!isLast && <div className="w-[3px] flex-1 min-h-[12px] bg-teal" />}
      </div>
      <div className={`flex-1 flex flex-col gap-4 ${isLast ? "" : "pb-6"}`}>
        <h2
          onClick={clickable ? onHeaderClick : undefined}
          className={`font-headline font-bold text-[17px] ${state === "upcoming" ? "text-muted" : "text-ink"} ${
            clickable ? "cursor-pointer" : ""
          }`}
        >
          {title}
        </h2>
        {state === "active" && children}
      </div>
    </div>
  );
}
