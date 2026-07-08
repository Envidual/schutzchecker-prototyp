import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useFlow, type JaNein } from "../state/FlowContext";
import { JaNeinToggle } from "../components/JaNeinToggle";
import { MissingFieldsOverlay } from "../components/MissingFieldsOverlay";
import { NoticeCallout } from "../components/NoticeCallout";

const BAUART_OPTIONS = ["Mauerwerk/Beton (Stein)", "Sand/Naturstein", "Mauerwerk/Beton (Beton)", "Kein Wert trifft zu"];
const DACH_OPTIONS = [
  "Ziegeldach",
  "Begrünung",
  "Dachpappe",
  "Faserzementwellplatten",
  "Folie",
  "Kies",
  "Kupfer- oder Zinkblech",
  "Profil- oder Trapezblech",
  "Sandwichelemente",
  "Schiefer",
  "Kein Wert trifft zu",
];

export function GebaeudeDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { buildings, setBuilding } = useFlow();
  const building = buildings.find((b) => b.id === id);

  const [angabenKorrekt, setAngabenKorrekt] = useState<JaNein | undefined>(building?.angabenKorrekt);
  const [bauart, setBauart] = useState(building?.bauart ?? "");
  const [dach, setDach] = useState(building?.dacheindeckung ?? "");
  const [showOverlay, setShowOverlay] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    setAngabenKorrekt(building?.angabenKorrekt);
    setBauart(building?.bauart ?? "");
    setDach(building?.dacheindeckung ?? "");
    setAttempted(false);
  }, [id]);

  if (!building) return null;

  const canSave = !!angabenKorrekt && !!bauart && !!dach;
  const angabenError = attempted && !angabenKorrekt;
  const bauartError = attempted && !bauart;
  const dachError = attempted && !dach;

  const nextBuilding = buildings[buildings.findIndex((b) => b.id === building.id) + 1];

  const handleSave = () => {
    if (!canSave) {
      setAttempted(true);
      setShowOverlay(true);
      return;
    }
    setBuilding(building.id, { done: true, angabenKorrekt, bauart, dacheindeckung: dach });
    navigate(nextBuilding ? `/gebaeude/${nextBuilding.id}` : "/gebaeude");
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-page px-4 pt-5 pb-6 flex flex-col gap-5">
        <button
          onClick={() => navigate("/gebaeude")}
          className="flex items-center gap-1 text-muted text-[14px] w-fit"
        >
          <ArrowLeft size={16} /> Zur Übersicht
        </button>
        <div>
          <h1 className="font-headline font-bold text-[26px] text-ink">{building.name}</h1>
          <p className="text-[13px] text-muted mt-1">{building.address}</p>
        </div>

        <div className="h-px bg-border w-full" />

        <div className="grid grid-cols-2 gap-y-4 gap-x-4">
          <Field label="Gebäudeart" value={building.gebaeudeart} />
          <Field label="Ergänzung zum Gebäude" value={building.ergaenzung} />
          <Field label="Gebäudenutzung" value={building.nutzung} />
          <Field label="Baujahr" value={building.baujahr} />
          <Field label="Entkernung" value={building.entkernung} />
        </div>
      </div>

      <div className="flex-1 bg-page px-4 pb-28 flex flex-col gap-6">
        <div className="h-px bg-border w-full" />
        <h2 className="font-headline font-bold text-[17px] text-ink">Hinterlegte Angaben zum Gebäude</h2>
        <div className="bg-white rounded-md p-5 flex flex-col gap-4">
          <p className={`font-semibold text-[14px] ${angabenError ? "text-error" : "text-ink-strong"}`}>
            Sind diese Angaben zu diesem Gebäude korrekt?
          </p>
          <JaNeinToggle value={angabenKorrekt} onChange={setAngabenKorrekt} error={angabenError} />
          {angabenKorrekt === "nein" && (
            <NoticeCallout>
              Wenn die hinterlegten Angaben nicht mehr korrekt sind, müssen Änderungen am bestehenden Vertrag
              vorgenommen werden. Lassen Sie sich gerne von Ihrem Betreuer beraten:
            </NoticeCallout>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-headline font-bold text-[17px] text-ink">Bauartklassen</h2>
          <p className="text-[13px] text-muted">
            Die Bauartklasse klassifiziert Ihr Gebäude anhand der verwendeten Bauart und Dacheindeckung. Die
            Bauartklasse definiert, wie feuerfest Ihr Gebäude ist.
          </p>
        </div>

        <div className="bg-white rounded-md p-5 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className={`text-[13px] font-medium ${bauartError ? "text-error" : "text-ink-strong"}`}>
              Wie ist die Bauart ihres Gebäudes?
            </span>
            <div className="relative">
              <select
                value={bauart}
                onChange={(e) => setBauart(e.target.value)}
                className={`w-full appearance-none rounded-lg border bg-white px-3 py-3 text-[14px] text-ink-strong ${
                  bauartError ? "border-error" : "border-border"
                }`}
              >
                <option value="" disabled>
                  Auswählen
                </option>
                {BAUART_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className={`text-[13px] font-medium ${dachError ? "text-error" : "text-ink-strong"}`}>
              Beschreiben Sie die Dacheindeckung
            </span>
            <div className="relative">
              <select
                value={dach}
                onChange={(e) => setDach(e.target.value)}
                className={`w-full appearance-none rounded-lg border bg-white px-3 py-3 text-[14px] text-ink-strong ${
                  dachError ? "border-error" : "border-border"
                }`}
              >
                <option value="" disabled>
                  Auswählen
                </option>
                {DACH_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          </label>
        </div>
      </div>

      <div className="sticky bottom-0 z-20 bg-white border-t border-border px-4 py-4 flex justify-end">
        <button
          onClick={handleSave}
          className="rounded-lg bg-teal text-white font-semibold text-[15px] px-8 py-3 active:scale-[0.98] transition flex items-center gap-2"
        >
          {nextBuilding ? `Weiter zu ${nextBuilding.name}` : "Weiter zur Gebäudeübersicht"}
          <ArrowRight size={18} />
        </button>
      </div>

      <MissingFieldsOverlay open={showOverlay} onClose={() => setShowOverlay(false)} />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[12px] text-muted">{label}</p>
      <p className="text-[14px] font-semibold text-ink-strong mt-0.5">{value}</p>
    </div>
  );
}
