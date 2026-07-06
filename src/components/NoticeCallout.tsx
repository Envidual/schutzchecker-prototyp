import type { ReactNode } from "react";

export function NoticeCallout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-notice-bg text-notice-text text-[13px] leading-relaxed rounded-lg px-4 py-3">
      {children}{" "}
      <a href="#" onClick={(e) => e.preventDefault()} className="text-teal underline font-medium">
        zum Kontaktformular
      </a>
    </div>
  );
}
