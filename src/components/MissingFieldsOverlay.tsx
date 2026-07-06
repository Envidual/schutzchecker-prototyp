import { AlertTriangle } from "lucide-react";

interface MissingFieldsOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function MissingFieldsOverlay({ open, onClose }: MissingFieldsOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start sm:items-center">
      <div className="relative w-full max-w-[430px] h-[100dvh] sm:h-[932px]">
        <div className="absolute inset-0 bg-black/40 sm:rounded-[44px] flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 text-center max-w-[320px] shadow-xl">
            <div className="size-12 rounded-full bg-error-tint flex items-center justify-center shrink-0">
              <AlertTriangle size={24} className="text-error" />
            </div>
            <h3 className="font-headline font-bold text-[17px] text-ink">Angaben unvollständig</h3>
            <p className="text-[14px] text-muted">
              Bitte füllen Sie alle erforderlichen Felder aus, um fortzufahren.
            </p>
            <button
              onClick={onClose}
              className="mt-2 w-full rounded-lg bg-teal text-white font-semibold text-[15px] py-3 active:scale-[0.98] transition"
            >
              Verstanden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
