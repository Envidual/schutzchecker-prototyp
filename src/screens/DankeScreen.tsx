import { CheckCircle2 } from "lucide-react";
import { Header } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { useFlow, type JaNein } from "../state/FlowContext";
import { QUESTIONS } from "./FragenScreen";
import { TARIFE, formatPrice } from "./TarifScreen";

function janeinLabel(v?: JaNein) {
  return v === "ja" ? "Ja" : v === "nein" ? "Nein" : "–";
}

function formatDate(value: string) {
  if (!value) return "–";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-md p-5 flex flex-col gap-3 w-full text-left">
      <h3 className="font-headline font-bold text-[15px] text-ink">{title}</h3>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className="text-[13px] text-muted">{label}</p>
      <p className="text-[13px] font-semibold text-ink-strong text-right">{value}</p>
    </div>
  );
}

export function DankeScreen() {
  const { buildings, fragen, tarif, antrag, progress } = useFlow();
  const selectedTarif = TARIFE.find((t) => t.id === tarif);

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Elementargefahren" />
      <ProgressBar value={progress(5)} />

      <div className="flex-1 bg-page px-4 py-12 flex flex-col items-center gap-5 text-center">
        <div className="size-16 rounded-full bg-teal flex items-center justify-center">
          <CheckCircle2 size={34} className="text-white" />
        </div>
        <h2 className="font-headline font-bold text-[22px] text-ink">Vielen Dank für Ihren Antrag!</h2>
        <p className="text-[14px] text-muted max-w-[300px]">
          Wir haben Ihren Antrag auf Ergänzung des Elementarschutzes im Tarif{" "}
          <span className="font-semibold text-ink-strong">{selectedTarif?.label}</span> erhalten und werden ihn
          zeitnah bearbeiten. Eine Bestätigung erhalten Sie per E-Mail.
        </p>

        <div className="w-full flex flex-col gap-4 mt-4">
          <h3 className="font-headline font-bold text-[17px] text-ink text-left">Ihre Zusammenfassung</h3>

          <SummaryCard title="Gebäude">
            {buildings.map((b, i) => (
              <div key={b.id} className="flex flex-col gap-2">
                <SummaryRow label={b.name} value={b.address} />
                <SummaryRow label="Bauart" value={b.bauart ?? "–"} />
                <SummaryRow label="Dacheindeckung" value={b.dacheindeckung ?? "–"} />
                {i < buildings.length - 1 && <div className="h-px bg-border w-full my-1" />}
              </div>
            ))}
          </SummaryCard>

          <SummaryCard title="Beitragsrelevante Fragen">
            {QUESTIONS.map((q) => (
              <SummaryRow key={q.key} label={q.label} value={janeinLabel(fragen[q.key])} />
            ))}
          </SummaryCard>

          <SummaryCard title="Tarif">
            <SummaryRow
              label="Gewählter Tarif"
              value={selectedTarif ? `${selectedTarif.label} (${formatPrice(selectedTarif.priceMonthly)}/Monat)` : "–"}
            />
          </SummaryCard>

          <SummaryCard title="Ihre Angaben">
            <SummaryRow label="E-Mail" value={antrag.email || "–"} />
            <SummaryRow label="IBAN" value={antrag.iban || "–"} />
            <SummaryRow label="Versicherungsbeginn" value={formatDate(antrag.versicherungsbeginn)} />
          </SummaryCard>
        </div>
      </div>
    </div>
  );
}
