import type { ReactNode } from "react";

export type StepState = "active" | "done" | "upcoming";

function StepCircle({ state, number }: { state: StepState; number: number }) {
  return (
    <div
      className={`size-10 shrink-0 rounded-full border-[3px] flex items-center justify-center ${
        state === "done" ? "bg-teal border-teal" : state === "active" ? "border-teal" : "border-border"
      }`}
    >
      <span
        className={`font-extrabold text-[16px] ${
          state === "done" ? "text-white" : state === "active" ? "text-teal" : "text-muted"
        }`}
      >
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
  children,
}: {
  number: number;
  title: string;
  state: StepState;
  isLast?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <StepCircle state={state} number={number} />
        {!isLast && <div className="w-[3px] flex-1 min-h-[12px] bg-teal" />}
      </div>
      <div className={`flex-1 flex flex-col gap-4 ${isLast ? "" : "pb-6"}`}>
        <h2 className={`font-headline font-bold text-[17px] ${state === "upcoming" ? "text-muted" : "text-ink"}`}>
          {title}
        </h2>
        {state !== "upcoming" && children}
      </div>
    </div>
  );
}
