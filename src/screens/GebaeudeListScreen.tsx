import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { ProgressBar } from "../components/ProgressBar";
import { FooterNav } from "../components/FooterNav";
import { useFlow } from "../state/FlowContext";

export function GebaeudeListScreen() {
  const navigate = useNavigate();
  const { buildings, progress } = useFlow();
  const [attempted, setAttempted] = useState(false);
  const allDone = buildings.every((b) => b.done);

  return (
    <div className="flex flex-col min-h-full">
      <ProgressBar value={progress(2)} />

      <div className="flex-1 bg-page px-4 py-10 flex flex-col gap-5">
        <h2 className="font-headline font-bold text-[18px] text-ink">Wählen Sie ein Gebäude, um fortzufahren</h2>

        <div className="flex flex-col gap-3">
          {buildings.map((b) => {
            const error = attempted && !b.done;
            return (
              <div
                key={b.id}
                className={`bg-white rounded-md p-4 flex items-center justify-between gap-3 border-2 transition ${
                  error ? "border-error" : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {b.done && <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />}
                  <div className="min-w-0">
                    <p className={`font-semibold text-[14px] truncate ${error ? "text-error" : "text-ink-strong"}`}>
                      {b.name}
                    </p>
                    <p className={`text-[12px] truncate ${error ? "text-error/80" : "text-muted"}`}>{b.address}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/gebaeude/${b.id}`)}
                  className={`shrink-0 rounded-lg px-4 py-2 text-[14px] font-semibold ${
                    b.done ? "border-2 border-teal text-teal" : "bg-teal text-white"
                  }`}
                >
                  {b.done ? "Ansehen" : "Starten"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <FooterNav
        onBack={() => navigate("/")}
        onNext={() => navigate("/fragen")}
        nextDisabled={!allDone}
        onBlocked={() => setAttempted(true)}
      />
    </div>
  );
}
