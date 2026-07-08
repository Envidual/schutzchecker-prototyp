import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Header } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { FooterNav } from "../components/FooterNav";
import { JaNeinToggle } from "../components/JaNeinToggle";
import { LoadingCard } from "../components/LoadingCard";
import { Step, type StepState } from "../components/Stepper";
import { useFlow, type JaNein } from "../state/FlowContext";
import { TARIFE, formatPrice } from "./TarifScreen";

export function AbschlussScreen() {
  const navigate = useNavigate();
  const { progress, tarif } = useFlow();
  const selectedTarif = TARIFE.find((t) => t.id === tarif);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(1);

  const [protokollHeruntergeladen, setProtokollHeruntergeladen] = useState(false);
  const [protokollPapierform, setProtokollPapierform] = useState<JaNein | undefined>();
  const step1Done = protokollHeruntergeladen && !!protokollPapierform;

  const [unterlagenHeruntergeladen, setUnterlagenHeruntergeladen] = useState(false);
  const [verzichtPapierform, setVerzichtPapierform] = useState(false);
  const step2Done = unterlagenHeruntergeladen && verzichtPapierform;

  const [widerrufEinwilligung, setWiderrufEinwilligung] = useState(false);
  const step3Done = widerrufEinwilligung;

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (activeStep === 1 && step1Done) setActiveStep(2);
  }, [activeStep, step1Done]);

  useEffect(() => {
    if (activeStep === 2 && step2Done) setActiveStep(3);
  }, [activeStep, step2Done]);

  useEffect(() => {
    if (activeStep === 3 && step3Done) setActiveStep(4);
  }, [activeStep, step3Done]);

  const stepState = (n: number, done: boolean): StepState =>
    activeStep === n ? "active" : done ? "done" : "upcoming";

  const allStepsDone = step1Done && step2Done && step3Done;

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
          Schließen Sie Ihren Antrag ab
        </h2>

        <div className="bg-white rounded-md p-5">
          <Step number={1} title="Beratungsprotokoll" state={stepState(1, step1Done)}>
            <p className="text-[14px] text-ink-strong">Bitte laden Sie das Beratungsprotokoll herunter.</p>
            <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-teal text-teal font-semibold text-[14px] py-3">
              Beratungsprotokoll herunterladen <Download size={16} />
            </button>

            <div className="h-px bg-border w-full" />

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={protokollHeruntergeladen}
                onChange={(e) => setProtokollHeruntergeladen(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-teal"
              />
              <p className="text-[13px] text-muted">Ich bestätige, dass ich das Beratungsprotokoll heruntergeladen habe</p>
            </label>

            <div className="h-px bg-border w-full" />

            <p className="text-[14px] text-ink-strong">
              Möchten Sie die von Ihnen heruntergeladene Beratungsdokumentation zusätzlich in Papierform per Post
              erhalten?
            </p>
            <JaNeinToggle value={protokollPapierform} onChange={setProtokollPapierform} />
          </Step>

          <Step number={2} title="Versicherungsinformationen" state={stepState(2, step2Done)}>
            <p className="text-[13px] text-muted">
              Bitte laden Sie die die Versichererinformationen, die Produktinformationen, das Merkblatt zur
              vorvertraglichen Anzeigepflicht, die Versicherungsbedingungen, die Datenschutzinformationen sowie eine
              Übersicht unserer Antragsfragen und Ihrer Antworten herunter. Bitte bestätigen Sie das Herunterladen der
              Unterlagen und erklären sich durch das Setzen des Häkchens mit deren Inhalt einverstanden.
            </p>
            <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-teal text-teal font-semibold text-[14px] py-3">
              Dokumente herunterladen <Download size={16} />
            </button>

            <div className="h-px bg-border w-full" />

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={unterlagenHeruntergeladen}
                onChange={(e) => setUnterlagenHeruntergeladen(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-teal"
              />
              <p className="text-[13px] text-muted">
                Ich bestätige, dass ich die Unterlagen heruntergeladen habe und mit deren Inhalt einverstanden bin.
              </p>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={verzichtPapierform}
                onChange={(e) => setVerzichtPapierform(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-teal"
              />
              <p className="text-[13px] text-muted">Ich verzichte auf den Erhalt der Versichererinformationen in Papierform.</p>
            </label>
          </Step>

          <Step number={3} title="Einwilligung zum Widerrufsrecht" state={stepState(3, step3Done)}>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={widerrufEinwilligung}
                onChange={(e) => setWiderrufEinwilligung(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-teal"
              />
              <p className="text-[13px] text-muted">
                Ich erkläre mein ausdrückliches Einverständnis, dass der Versicherungsschutz zum beantragten Zeitpunkt
                und damit ggf. vor Ende der Widerrufsfrist beginnt. Im Fall des Widerrufs kann ich dann nur den Teil
                des Beitrags verlangen, der auf die Zeit nach Zugang des Widerrufs entfällt.
              </p>
            </label>
          </Step>

          <Step number={4} title="Elementar-Abdeckung online abschließen" state={stepState(4, false)} isLast>
            <p className="text-[13px] text-muted">
              Mit dem Klick auf „Jetzt kostenpflichtig abschließen" bestätige ich die Richtigkeit meiner Angaben und
              stimme der elektronischen Weiterleitung meines Antrags an das Versicherungsunternehmen zu. Damit wird
              eine Elementar-Abdeckung beantragt - bestehende Wohngebäudeversicherungen bleiben unverändert erhalten.
            </p>
            <p className="text-[13px] text-muted">
              Falls Sie es sich später anders überlegen, kein Problem - Sie haben ein 14-tägiges Widerrufsrecht.
            </p>
          </Step>
        </div>
      </div>

      <FooterNav
        onBack={() => navigate("/antrag")}
        onNext={() => navigate("/danke")}
        nextLabel="Abschließen"
        nextDisabled={!allStepsDone}
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
