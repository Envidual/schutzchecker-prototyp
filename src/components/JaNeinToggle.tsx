import type { JaNein } from "../state/FlowContext";

interface JaNeinToggleProps {
  value?: JaNein;
  onChange: (v: JaNein) => void;
  error?: boolean;
}

export function JaNeinToggle({ value, onChange, error }: JaNeinToggleProps) {
  const accent = error && !value ? "border-error divide-error" : "border-border divide-border";
  return (
    <div className={`flex rounded-lg overflow-hidden border divide-x transition ${accent}`}>
      {(["ja", "nein"] as const).map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`flex-1 py-3 text-[15px] font-medium capitalize transition ${
            error && !value ? "text-error" : "text-ink-strong"
          } ${value === opt ? "bg-border" : "bg-white"}`}
        >
          {opt === "ja" ? "Ja" : "Nein"}
        </button>
      ))}
    </div>
  );
}
