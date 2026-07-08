import type { ReactNode } from "react";

export function StepHeading({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex gap-3 items-center w-full">
      <div className="size-10 shrink-0 rounded-full border-[3px] border-teal flex items-center justify-center">
        <span className="font-extrabold text-teal text-[16px]">{n}</span>
      </div>
      <h2 className="font-headline font-bold text-[18px] leading-[1.2] text-ink">{children}</h2>
    </div>
  );
}
