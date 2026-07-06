import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type JaNein = "ja" | "nein";

export interface Building {
  id: string;
  name: string;
  address: string;
  gebaeudeart: string;
  ergaenzung: string;
  nutzung: string;
  baujahr: string;
  entkernung: string;
  done: boolean;
  angabenKorrekt?: JaNein;
  bauart?: string;
  dacheindeckung?: string;
}

export interface Fragen {
  tarifgruppeKorrekt?: JaNein;
  schadenLetzte5Jahre?: JaNein;
  energieanlage?: JaNein;
  weitereGebaeude?: JaNein;
}

export type TarifId = "basis" | "empfehlung" | "premium";

export interface Antrag {
  versicherungsnehmerKorrekt?: JaNein;
  schriftverkehrAnAnschrift?: JaNein;
  email: string;
  iban: string;
  sepaZustimmung: boolean;
  vorversicherung?: JaNein;
  vorversicherungName?: string;
  vorversicherungNummer?: string;
  vorversicherungBeendet?: JaNein;
  versicherungsbeginn: string;
}

interface FlowState {
  buildings: Building[];
  setBuilding: (id: string, patch: Partial<Building>) => void;
  fragen: Fragen;
  setFragen: (patch: Partial<Fragen>) => void;
  tarif: TarifId;
  setTarif: (t: TarifId) => void;
  antrag: Antrag;
  setAntrag: (patch: Partial<Antrag>) => void;
  progress: (step: number) => number;
}

const TOTAL_STEPS = 5;

const initialBuildings: Building[] = [
  {
    id: "1",
    name: "Gebäude 1",
    address: "Georgenstraße 107, 80798 München",
    gebaeudeart: "Einfamilienhaus",
    ergaenzung: "kein Anbau",
    nutzung: "ständig bewohnt",
    baujahr: "2000",
    entkernung: "2018",
    done: false,
  },
  {
    id: "2",
    name: "Gebäude 2",
    address: "Agnesstraße 14, 80798 München",
    gebaeudeart: "Einfamilienhaus",
    ergaenzung: "kein Anbau",
    nutzung: "ständig bewohnt",
    baujahr: "2000",
    entkernung: "2018",
    done: false,
  },
];

const FlowContext = createContext<FlowState | null>(null);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [fragen, setFragenState] = useState<Fragen>({});
  const [tarif, setTarif] = useState<TarifId>("empfehlung");
  const [antrag, setAntragState] = useState<Antrag>({
    email: "",
    iban: "",
    sepaZustimmung: false,
    versicherungsbeginn: "",
  });

  const setBuilding = (id: string, patch: Partial<Building>) => {
    setBuildings((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  };

  const setFragen = (patch: Partial<Fragen>) => setFragenState((prev) => ({ ...prev, ...patch }));
  const setAntrag = (patch: Partial<Antrag>) => setAntragState((prev) => ({ ...prev, ...patch }));

  const progress = (step: number) => Math.min(step / TOTAL_STEPS, 1);

  const value = useMemo(
    () => ({ buildings, setBuilding, fragen, setFragen, tarif, setTarif, antrag, setAntrag, progress }),
    [buildings, fragen, tarif, antrag]
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlow must be used within FlowProvider");
  return ctx;
}
