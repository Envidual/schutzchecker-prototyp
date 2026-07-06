import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Header } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { FooterNav } from "../components/FooterNav";
import { JaNeinToggle } from "../components/JaNeinToggle";
import { Step, type StepState } from "../components/Stepper";
import { LoadingCard } from "../components/LoadingCard";
import { useFlow, type JaNein } from "../state/FlowContext";
import { TARIFE, formatPrice } from "./TarifScreen";

const VERSICHERER_OPTIONS = [
  "Allianz",
  "AXA",
  "ERGO",
  "Generali",
  "HUK-COBURG",
  "R+V Versicherung",
  "Zurich",
  "VGH Versicherungen",
  "Württembergische Versicherung",
  "Sonstige",
];

function vorversicherungDone(antrag: {
  vorversicherung?: JaNein;
  vorversicherungName?: string;
  vorversicherungNummer?: string;
  vorversicherungBeendet?: JaNein;
}) {
  if (!antrag.vorversicherung) return false;
  if (antrag.vorversicherung === "nein") return true;
  return !!antrag.vorversicherungName && !!antrag.vorversicherungNummer && !!antrag.vorversicherungBeendet;
}

function initialStep(antrag: {
  versicherungsnehmerKorrekt?: JaNein;
  schriftverkehrAnAnschrift?: JaNein;
  email: string;
  iban: string;
  sepaZustimmung: boolean;
  vorversicherung?: JaNein;
  vorversicherungName?: string;
  vorversicherungNummer?: string;
  vorversicherungBeendet?: JaNein;
}) {
  if (!antrag.versicherungsnehmerKorrekt) return 1;
  if (!antrag.schriftverkehrAnAnschrift) return 2;
  if (!(antrag.email && antrag.iban && antrag.sepaZustimmung)) return 3;
  if (!vorversicherungDone(antrag)) return 4;
  return 5;
}

export function AntragScreen() {
  const navigate = useNavigate();
  const { antrag, setAntrag, tarif, progress } = useFlow();
  const selectedTarif = TARIFE.find((t) => t.id === tarif);
  const [attempted, setAttempted] = useState(false);
  const [activeStep, setActiveStep] = useState(() => initialStep(antrag));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timeout);
  }, []);

  const step1Done = !!antrag.versicherungsnehmerKorrekt;
  const step2Done = !!antrag.schriftverkehrAnAnschrift;
  const step3Done = !!antrag.email && !!antrag.iban && antrag.sepaZustimmung;
  const step4Done = vorversicherungDone(antrag);

  useEffect(() => {
    if (activeStep === 3 && step3Done) setActiveStep(4);
  }, [activeStep, step3Done]);

  useEffect(() => {
    if (activeStep === 4 && step4Done) setActiveStep(5);
  }, [activeStep, step4Done]);

  const stepState = (n: number, done: boolean): StepState =>
    activeStep === n ? "active" : done ? "done" : "upcoming";

  const canSubmit = step1Done && step2Done && step3Done && step4Done && !!antrag.versicherungsbeginn;

  const emailError = attempted && !antrag.email;
  const ibanError = attempted && !antrag.iban;
  const sepaError = attempted && !antrag.sepaZustimmung;
  const versicherungsbeginnError = attempted && !antrag.versicherungsbeginn;

  if (loading) {
    return (
      <div className="flex flex-col min-h-full">
        <Header title="Elementargefahren" />
        <ProgressBar value={progress(5)} />
        <div className="flex-1 bg-page px-4 py-12 flex flex-col items-center">
          <LoadingCard />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Elementargefahren" />
      <ProgressBar value={progress(5)} />

      <div className="flex-1 bg-page px-4 py-8 flex flex-col gap-6">
        <h2 className="font-headline font-bold text-[18px] text-ink leading-[1.3]">
          Bitte prüfen und ergänzen Sie die Angaben zu Ihrem Antrag
        </h2>

        <div className="grid grid-cols-2 gap-y-4 gap-x-4">
          <Field label="Vor- und Nachname" value="Max Mustermann" />
          <Field label="Geburtsdatum" value="20.04.1980" />
          <Field label="Anschrift" value="Knorrstr. 2, 80807 München" span />
        </div>

        <div className="h-px bg-border w-full" />

        <Step
          number={1}
          title="Versicherungsnehmer"
          state={stepState(1, step1Done)}
          onHeaderClick={() => setActiveStep(1)}
        >
          <div className="bg-white rounded-md p-5 flex flex-col gap-3">
            <p
              className={`font-semibold text-[14px] ${
                attempted && !antrag.versicherungsnehmerKorrekt ? "text-error" : "text-ink-strong"
              }`}
            >
              Sind alle Daten zum Versicherungsnehmer korrekt und sind Sie selbst der Versicherungsnehmer?
            </p>
            <JaNeinToggle
              value={antrag.versicherungsnehmerKorrekt}
              onChange={(v) => {
                setAntrag({ versicherungsnehmerKorrekt: v });
                setActiveStep(2);
              }}
              error={attempted && !antrag.versicherungsnehmerKorrekt}
            />
          </div>
        </Step>

        <Step
          number={2}
          title="Schriftverkehr"
          state={stepState(2, step2Done)}
          onHeaderClick={() => setActiveStep(2)}
        >
          <div className="bg-white rounded-md p-5 flex flex-col gap-3">
            <p
              className={`font-semibold text-[14px] ${
                attempted && !antrag.schriftverkehrAnAnschrift ? "text-error" : "text-ink-strong"
              }`}
            >
              Darf der postalische Schriftverkehr an die Anschrift des Versicherungsnehmers gesendet werden?
            </p>
            <JaNeinToggle
              value={antrag.schriftverkehrAnAnschrift}
              onChange={(v) => {
                setAntrag({ schriftverkehrAnAnschrift: v });
                setActiveStep(3);
              }}
              error={attempted && !antrag.schriftverkehrAnAnschrift}
            />
          </div>
        </Step>

        <Step
          number={3}
          title="Kontakt- und Bankdaten"
          state={stepState(3, step3Done)}
          onHeaderClick={() => setActiveStep(3)}
        >
          <div className="bg-white rounded-md p-5">
            <label className="flex flex-col gap-2">
              <span className={`font-semibold text-[14px] ${emailError ? "text-error" : "text-ink-strong"}`}>
                E-Mail Adresse
              </span>
              <input
                type="email"
                placeholder="E-Mail Adresse eingeben"
                value={antrag.email}
                onChange={(e) => setAntrag({ email: e.target.value })}
                className={`w-full rounded-lg border bg-white px-3 py-3 text-[14px] ${
                  emailError ? "border-error" : "border-border"
                }`}
              />
            </label>
          </div>

          <div className="bg-white rounded-md p-5 flex flex-col gap-3">
            <h3 className="font-headline font-bold text-[16px] text-ink">Ihre Bankdaten</h3>
            <label className="flex flex-col gap-2">
              <span className={`font-semibold text-[14px] ${ibanError ? "text-error" : "text-ink-strong"}`}>
                IBAN
              </span>
              <input
                type="text"
                placeholder="DE00 0000 0000 0000 0000 00"
                value={antrag.iban}
                onChange={(e) => setAntrag({ iban: e.target.value })}
                className={`w-full rounded-lg border bg-white px-3 py-3 text-[14px] ${
                  ibanError ? "border-error" : "border-border"
                }`}
              />
            </label>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={antrag.sepaZustimmung}
                onChange={(e) => setAntrag({ sepaZustimmung: e.target.checked })}
                className={`mt-0.5 size-4 shrink-0 accent-teal ${
                  sepaError ? "outline outline-2 outline-error rounded-sm" : ""
                }`}
              />
              <p className={`text-[12px] ${sepaError ? "text-error" : "text-muted"}`}>
                Ich ermächtige die Versicherungskammer Bayern (Gläubiger-ID DE98VKB00000151417), die ausgewiesenen
                Beiträge von der oben genannten IBAN mittels SEPA-Lastschrift einzuziehen. Zugleich weise ich mein
                Kreditinstitut an, die von der Versicherungskammer Bayern auf mein Konto gezogenen Lastschriften
                einzulösen.
              </p>
            </label>
          </div>
        </Step>

        <Step
          number={4}
          title="Vorversicherung"
          state={stepState(4, step4Done)}
          onHeaderClick={() => setActiveStep(4)}
        >
          <div className="bg-white rounded-md p-5 flex flex-col gap-3">
            <p
              className={`font-semibold text-[14px] ${
                attempted && !antrag.vorversicherung ? "text-error" : "text-ink-strong"
              }`}
            >
              Bestand oder besteht seit den letzten 5 Jahren eine Vorversicherung?
            </p>
            <JaNeinToggle
              value={antrag.vorversicherung}
              onChange={(v) => setAntrag({ vorversicherung: v })}
              error={attempted && !antrag.vorversicherung}
            />
          </div>

          {antrag.vorversicherung === "ja" && (
            <div className="bg-white rounded-md p-5 flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span
                  className={`text-[13px] font-medium ${
                    attempted && !antrag.vorversicherungName ? "text-error" : "text-ink-strong"
                  }`}
                >
                  Versicherer der Vorversicherung *
                </span>
                <div className="relative">
                  <select
                    value={antrag.vorversicherungName ?? ""}
                    onChange={(e) => setAntrag({ vorversicherungName: e.target.value })}
                    className={`w-full appearance-none rounded-lg border bg-white px-3 py-3 text-[14px] text-ink-strong ${
                      attempted && !antrag.vorversicherungName ? "border-error" : "border-border"
                    }`}
                  >
                    <option value="" disabled>
                      Auswählen
                    </option>
                    {VERSICHERER_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span
                  className={`text-[13px] font-medium ${
                    attempted && !antrag.vorversicherungNummer ? "text-error" : "text-ink-strong"
                  }`}
                >
                  Versicherungsnummer der Vorversicherung *
                </span>
                <input
                  type="text"
                  value={antrag.vorversicherungNummer ?? ""}
                  onChange={(e) => setAntrag({ vorversicherungNummer: e.target.value })}
                  className={`w-full rounded-lg border bg-white px-3 py-3 text-[14px] ${
                    attempted && !antrag.vorversicherungNummer ? "border-error" : "border-border"
                  }`}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[13px] font-medium text-ink-strong">Wurde die Vorversicherung beendet?</span>
                <div className="relative">
                  <select
                    value={antrag.vorversicherungBeendet ?? ""}
                    onChange={(e) => setAntrag({ vorversicherungBeendet: e.target.value as JaNein })}
                    className="w-full appearance-none rounded-lg border border-border bg-white px-3 py-3 text-[14px] text-ink-strong"
                  >
                    <option value="" disabled>
                      Auswählen
                    </option>
                    <option value="ja">Ja</option>
                    <option value="nein">Nein</option>
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                </div>
              </label>

              <p className="text-[11px] text-muted">
                * Quelle der Werteliste: BaFin Unternehmensdatenbank / BaFin Beschwerdestatistik / GDV VU-Nummern.
                Projektlokaler Auszug für den Schutzchecker-Prototyp; die VU-Nr. entspricht der BaFin-Reg.-Nr. im
                VU-Verzeichnis.
              </p>
            </div>
          )}
        </Step>

        <Step
          number={5}
          title="Versicherungsbeginn"
          state={stepState(5, !!antrag.versicherungsbeginn)}
          isLast
          onHeaderClick={() => setActiveStep(5)}
        >
          <div className="bg-white rounded-md p-5">
            <label className="flex flex-col gap-2">
              <span
                className={`font-semibold text-[14px] ${versicherungsbeginnError ? "text-error" : "text-ink-strong"}`}
              >
                Versicherungsstart
              </span>
              <input
                type="date"
                value={antrag.versicherungsbeginn}
                onChange={(e) => setAntrag({ versicherungsbeginn: e.target.value })}
                className={`w-full rounded-lg border bg-white px-3 py-3 text-[14px] text-ink-strong ${
                  versicherungsbeginnError ? "border-error" : "border-border"
                }`}
              />
            </label>
          </div>
        </Step>
      </div>

      <FooterNav
        onBack={() => navigate("/tarif")}
        onNext={() => navigate("/danke")}
        nextLabel="Absenden"
        nextDisabled={!canSubmit}
        onBlocked={() => setAttempted(true)}
        leftContent={
          <div>
            <p className="font-headline font-bold text-[26px] text-success leading-tight">
              {selectedTarif && formatPrice(selectedTarif.priceMonthly)}
            </p>
            <p className="text-[13px] text-ink-strong">Ihr Beitrag</p>
          </div>
        }
      />
    </div>
  );
}

function Field({ label, value, span }: { label: string; value: string; span?: boolean }) {
  return (
    <div className={span ? "col-span-2" : ""}>
      <p className="text-[12px] text-muted">{label}</p>
      <p className="text-[14px] font-semibold text-ink-strong mt-0.5">{value}</p>
    </div>
  );
}
