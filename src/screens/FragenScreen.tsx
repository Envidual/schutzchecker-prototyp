import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { FooterNav } from "../components/FooterNav";
import { JaNeinToggle } from "../components/JaNeinToggle";
import { NoticeCallout } from "../components/NoticeCallout";
import { useFlow, type Fragen, type JaNein } from "../state/FlowContext";

export const QUESTIONS: { key: keyof Fragen; label: string; noticeOn?: JaNein; noticeText?: string }[] = [
  {
    key: "tarifgruppeKorrekt",
    label: "Ist die im Vertrag hinterlegte Tarifgruppe Standardtarif weiterhin korrekt?",
    noticeOn: "nein",
    noticeText:
      "Eine Änderung der Tarifgruppe hat Auswirkungen auf Ihren bestehenden Vertrag und muss im Vertrag hinterlegt werden. Lassen Sie sich gerne von Ihrem Betreuer beraten:",
  },
  {
    key: "energieanlage",
    label: "Ist eine Energieanlage vorhanden?",
    noticeOn: "ja",
    noticeText:
      "Wenn Photovoltaikanlagen oder weitere Energieanlagen gegen Elementargefahren mitversichert werden sollen, muss die Elementar-Abdeckung gesondert betrachtet werden. Lassen Sie sich gerne von Ihrem Betreuer beraten:",
  },
  {
    key: "weitereGebaeude",
    label: "Gibt es auf dem Grundstück weitere Gebäude, die gegen Elementargefahren mitversichert werden sollen?",
    noticeOn: "ja",
    noticeText:
      "Wenn auf dem Grundstück weitere Gebäude gegen Elementargefahren mitversichert werden sollen, muss die Elementar-Abdeckung gesondert betrachtet werden. Lassen Sie sich gerne von Ihrem Betreuer beraten:",
  },
  {
    key: "schadenLetzte5Jahre",
    label: "Hatten Sie in den letzten fünf Jahren einen Elementarschaden an Ihrer Immobilie?",
  },
];

export function FragenScreen() {
  const navigate = useNavigate();
  const { fragen, setFragen, progress } = useFlow();
  const [attempted, setAttempted] = useState(false);
  const allAnswered = QUESTIONS.every((q) => !!fragen[q.key]);
  const anyNoticeShown = QUESTIONS.some((q) => q.noticeOn && fragen[q.key] === q.noticeOn);

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Elementargefahren" />
      <ProgressBar value={progress(3)} />

      <div className="flex-1 bg-page px-4 py-10 flex flex-col gap-5">
        <h2 className="font-headline font-bold text-[18px] text-ink leading-[1.3]">
          Beitragsrelevante Fragen zur Elementar-Abdeckung
        </h2>

        <div className="bg-white rounded-md p-5 flex flex-col gap-6">
          {QUESTIONS.map((q, i) => {
            const error = attempted && !fragen[q.key];
            const showNotice = !!q.noticeOn && fragen[q.key] === q.noticeOn;
            return (
              <div key={q.key} className="flex flex-col gap-3">
                <p className={`font-semibold text-[14px] ${error ? "text-error" : "text-ink-strong"}`}>{q.label}</p>
                <JaNeinToggle value={fragen[q.key]} onChange={(v) => setFragen({ [q.key]: v })} error={error} />
                {showNotice && <NoticeCallout>{q.noticeText}</NoticeCallout>}
                {i < QUESTIONS.length - 1 && <div className="h-px bg-border w-full mt-1" />}
              </div>
            );
          })}
        </div>
      </div>

      <FooterNav
        onBack={() => navigate("/gebaeude")}
        onNext={() => navigate(anyNoticeShown ? "/kontakt" : "/tarif")}
        nextLabel={anyNoticeShown ? "Zum Kontaktformular" : "Weiter"}
        nextDisabled={!allAnswered}
        onBlocked={() => setAttempted(true)}
      />
    </div>
  );
}
