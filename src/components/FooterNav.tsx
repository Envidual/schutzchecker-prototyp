import { useState, type ReactNode } from "react";
import { MissingFieldsOverlay } from "./MissingFieldsOverlay";

interface FooterNavProps {
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
  leftContent?: ReactNode;
  onBlocked?: () => void;
}

export function FooterNav({
  onBack,
  onNext,
  backLabel = "Zurück",
  nextLabel = "Weiter",
  nextDisabled = false,
  showBack = true,
  leftContent,
  onBlocked,
}: FooterNavProps) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleNext = () => {
    if (nextDisabled) {
      onBlocked?.();
      setShowOverlay(true);
      return;
    }
    onNext?.();
  };

  const nextButtonClass =
    "rounded-lg bg-teal text-white font-semibold text-[15px] py-3 active:scale-[0.98] transition";

  if (leftContent) {
    return (
      <>
        <div className="sticky bottom-0 z-20 bg-white border-t border-border px-4 py-4 flex items-center justify-between gap-3">
          {leftContent}
          <div className="flex gap-3 shrink-0">
            {showBack && (
              <button
                onClick={onBack}
                className="rounded-lg border-2 border-teal text-teal font-semibold text-[15px] px-6 py-3 active:scale-[0.98] transition"
              >
                {backLabel}
              </button>
            )}
            <button onClick={handleNext} className={`${nextButtonClass} px-6`}>
              {nextLabel}
            </button>
          </div>
        </div>
        <MissingFieldsOverlay open={showOverlay} onClose={() => setShowOverlay(false)} />
      </>
    );
  }

  return (
    <>
      <div className="sticky bottom-0 z-20 bg-white border-t border-border px-4 py-4 flex gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="flex-1 rounded-lg border-2 border-teal text-teal font-semibold text-[15px] py-3 active:scale-[0.98] transition"
          >
            {backLabel}
          </button>
        )}
        <button onClick={handleNext} className={`flex-1 ${nextButtonClass}`}>
          {nextLabel}
        </button>
      </div>
      <MissingFieldsOverlay open={showOverlay} onClose={() => setShowOverlay(false)} />
    </>
  );
}
