import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Check, X, Star } from "lucide-react";
import { Header } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { FooterNav } from "../components/FooterNav";
import { useFlow, type TarifId } from "../state/FlowContext";

export interface TarifPlan {
  id: TarifId;
  label: string;
  stars: number;
  priceMonthly: number;
  selbstbehalt: string;
  ergaenzungsschutz: boolean;
  recommended?: boolean;
}

export const TARIFE: TarifPlan[] = [
  { id: "basis", label: "Basis", stars: 1, priceMonthly: 52.19, selbstbehalt: "10.000 €", ergaenzungsschutz: false },
  {
    id: "empfehlung",
    label: "Empfehlung",
    stars: 2,
    priceMonthly: 69.47,
    selbstbehalt: "500 €",
    ergaenzungsschutz: true,
    recommended: true,
  },
  { id: "premium", label: "Premium", stars: 3, priceMonthly: 71.21, selbstbehalt: "ohne Selbstbehalt", ergaenzungsschutz: true },
];

export function formatPrice(value: number) {
  return value.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

const ELEMENTAR_FEATURES = [
  "Überschwemmung durch Hochwasser",
  "Überschwemmung durch Starkregen",
  "Rückstau von Wasser",
  "Schneedruck",
  "Lawinen",
  "Erdfall/Erdrutsch",
  "Erweiterte Nässeschäden",
  "Erdbeben",
  "Vulkanausbruch",
];

const ERGAENZUNG_FEATURES = [
  "Garten-/Geräteschuppen",
  "Carports, Gewächshäuser",
  "Zisternen (Regenwasser-Nutzungsanlagen)",
  "Kleinkläranlagen",
  "Schwimmbecken, Außenwhirlpools und Garten-/Schwimmteiche",
  "Sonstige Grundstücksbestandteile",
];

function StarRow({ count, inverted }: { count: number; inverted?: boolean }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <Star
          key={i}
          size={14}
          className={
            i <= count
              ? inverted
                ? "text-white fill-white"
                : "text-amber-400 fill-amber-400"
              : inverted
                ? "text-white/40 fill-transparent"
                : "text-border fill-transparent"
          }
        />
      ))}
    </div>
  );
}

export function TarifScreen() {
  const navigate = useNavigate();
  const { tarif, setTarif, progress } = useFlow();
  const [billing, setBilling] = useState<"monatlich" | "jaehrlich">("monatlich");
  const selectedTarif = TARIFE.find((t) => t.id === tarif)!;

  const priceFor = (plan: TarifPlan) => (billing === "monatlich" ? plan.priceMonthly : plan.priceMonthly * 12);

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Elementargefahren" />
      <ProgressBar value={progress(4)} />

      <div className="flex-1 bg-page px-4 py-10 flex flex-col gap-5">
        <h2 className="font-headline font-bold text-[18px] text-ink leading-[1.3]">
          Bitte wählen Sie Ihre gewünschte Variante
        </h2>

        <div className="flex rounded-lg overflow-hidden border-2 border-[#0F172A] self-start">
          {(["monatlich", "jaehrlich"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className={`px-4 py-2 text-[13px] font-semibold transition ${
                billing === b ? "bg-[#0F172A] text-white" : "bg-white text-[#0F172A]"
              }`}
            >
              {b === "monatlich" ? "Monatlich" : "Jährlich"}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-md overflow-hidden">
          <div className="grid grid-cols-3">
            {TARIFE.map((plan) => {
              const selected = tarif === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setTarif(plan.id)}
                  className={`relative flex flex-col items-center gap-1 py-5 px-1 ${
                    selected ? "bg-[#0F172A] text-white" : "bg-white text-ink-strong"
                  }`}
                >
                  {plan.recommended && (
                    <span className="absolute -top-0.5 inset-x-0 mx-auto w-fit bg-teal-tint text-teal text-[9px] font-semibold rounded-full px-2 py-0.5 whitespace-nowrap">
                      Empfehlung
                    </span>
                  )}
                  <div className="mt-3">
                    <StarRow count={plan.stars} inverted={selected} />
                  </div>
                  <span className="font-headline font-bold text-[15px] mt-1">{formatPrice(priceFor(plan))}</span>
                  <span className={`text-[10px] text-center ${selected ? "text-white/80" : "text-muted"}`}>
                    {billing === "monatlich" ? "monatlicher Beitrag" : "jährlicher Beitrag"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-border px-5 py-3 flex items-center justify-between">
            <p className="text-[13px] text-muted">Selbstbehalt</p>
            <p className="text-[13px] font-semibold text-ink-strong">{selectedTarif.selbstbehalt}</p>
          </div>

          <div className="border-t border-border px-5 py-4">
            <p className="font-bold text-[13px] text-ink-strong">Elementargefahren</p>
          </div>
          <div className="flex flex-col">
            {ELEMENTAR_FEATURES.map((f) => (
              <div key={f} className="flex gap-3 items-start px-5 py-3 border-t border-border">
                <Check size={16} className="text-teal shrink-0 mt-0.5" />
                <p className="text-[13px] text-ink-strong">{f}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border px-5 py-4">
            <p className="font-bold text-[13px] text-ink-strong">Ergänzungsschutz Grundstück</p>
          </div>
          <div className="flex flex-col">
            {ERGAENZUNG_FEATURES.map((f) => (
              <div key={f} className="flex gap-3 items-start px-5 py-3 border-t border-border">
                {selectedTarif.ergaenzungsschutz ? (
                  <Check size={16} className="text-teal shrink-0 mt-0.5" />
                ) : (
                  <X size={16} className="text-muted shrink-0 mt-0.5" />
                )}
                <p className={`text-[13px] ${selectedTarif.ergaenzungsschutz ? "text-ink-strong" : "text-muted"}`}>
                  {f}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterNav
        onBack={() => navigate("/fragen")}
        onNext={() => navigate("/antrag")}
        leftContent={
          <div>
            <p className="font-headline font-bold text-[26px] text-success leading-tight">
              {formatPrice(priceFor(selectedTarif))}
            </p>
            <p className="text-[13px] text-ink-strong">
              {billing === "monatlich" ? "Ihr monatlicher Beitrag" : "Ihr jährlicher Beitrag"}
            </p>
          </div>
        }
      />
    </div>
  );
}
