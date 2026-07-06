import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  AlertTriangle,
  Equal,
  CloudRain,
  CheckCircle2,
  Plus,
  Minus,
  Umbrella,
  ShieldCheck,
  MapPin,
  Award,
  Lock,
  Flame,
  Droplet,
  Sparkles,
} from "lucide-react";
import { Header } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { RiskFooterBar } from "../components/RiskFooterBar";
import { FloodHouseIcon } from "../components/icons/FloodHouseIcon";
import { useFlow } from "../state/FlowContext";

function StepHeading({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-center w-full">
      <div className="size-10 shrink-0 rounded-full border-[3px] border-teal flex items-center justify-center">
        <span className="font-extrabold text-teal text-[16px]">{n}</span>
      </div>
      <h2 className="font-headline font-bold text-[18px] leading-[1.2] text-ink">{children}</h2>
    </div>
  );
}

const coverageRows = [
  {
    icon: <Home size={20} className="text-teal" />,
    tint: "bg-blue-tint",
    title: "Ihre Wohngebäudeversicherung",
    subtitle: "Haben sie bereits",
    tone: "default" as const,
  },
  {
    icon: (
      <div className="relative">
        <FloodHouseIcon size={20} className="text-error" />
        <span className="absolute -right-1.5 -bottom-1.5 bg-error rounded-full size-3.5 flex items-center justify-center">
          <AlertTriangle size={9} className="text-white" fill="white" />
        </span>
      </div>
    ),
    tint: "bg-error-tint",
    title: "Elementarversicherung",
    subtitle: "Fehlt Ihnen aktuell!",
    tone: "error" as const,
  },
  {
    icon: <Equal size={20} className="text-teal" />,
    tint: "bg-blue-tint",
    title: "Schutz für Ihre Immobilie",
    subtitle: "Perfekt abgesichert für ihre Bedürfnisse",
    tone: "default" as const,
  },
];

const risks = [
  { icon: <Droplet size={18} className="text-teal" />, label: "Überschwemmung durch Hochwasser", pct: 25 },
  { icon: <CloudRain size={18} className="text-teal" />, label: "Überschwemmung durch Starkregen", pct: 70 },
];

const coveredExtra = [
  "Rückstau in wasserführenden Systemen",
  "Schneedruck oder Lawinen",
  "Erdbeben, Erdfall oder Erdrutsch",
  "Vulkanausbruch",
];

const buildingCoverage = [
  { icon: <Flame size={18} className="text-teal" />, label: "Feuer", detail: "Brand, Blitzschlag, Explosion, Implosion." },
  { icon: <Droplet size={18} className="text-teal" />, label: "Leitungswasser", detail: "Schäden durch bestimmungswidrig austretendes Leitungswasser." },
  { icon: <Flame size={18} className="text-teal" />, label: "Feuer", detail: "Sturm und Hagel ab Windstärke 8." },
  { icon: <Sparkles size={18} className="text-teal" />, label: "Sondergefahren", detail: "Weitere individuell mitversicherte Gefahren." },
];

const reasons = [
  {
    icon: <Umbrella size={26} className="text-white" />,
    title: "Wir wissen wovon wir reden.",
    text: "Über 200 Jahre Versicherungserfahrung seit 1811.",
  },
  {
    icon: <ShieldCheck size={26} className="text-white" />,
    title: "Wir halten unser Versprechen.",
    text: "Regulierte Schäden in der Kompositversicherung im Wert von 7 Mio. € täglich.",
  },
  {
    icon: <MapPin size={26} className="text-white" />,
    title: "Wir sind in Ihrer Nähe.",
    text: "Über 4.000 Beratungsstellen in Bayern.",
  },
  {
    icon: <Award size={26} className="text-white" />,
    title: "Wir sind ausgezeichnet.",
    text: "Exzellenter Service – von unseren Kunden bestätigt.",
  },
];

export function IntroScreen() {
  const navigate = useNavigate();
  const { progress } = useFlow();
  const [openRow, setOpenRow] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Elementargefahren" />
      <ProgressBar value={progress(1)} />

      <div className="flex-1 bg-page px-4 py-10 flex flex-col gap-10">
        {/* Step 1 */}
        <div className="flex flex-col gap-5 w-full">
          <StepHeading n={1}>
            Das Wetter wird extremer. Ihr Schutz hat noch eine Lücke
          </StepHeading>
          <div className="bg-white w-full rounded-sm p-6 flex flex-col gap-4">
            {coverageRows.map((row, i) => (
              <div key={row.title}>
                <div className="flex gap-4 items-center w-full">
                  <div className={`size-10 shrink-0 rounded-full flex items-center justify-center ${row.tint}`}>
                    {row.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p
                      className={`text-[14px] font-semibold ${
                        row.tone === "error" ? "text-error" : "text-navy"
                      }`}
                    >
                      {row.title}
                    </p>
                    <p className={`text-[12px] ${row.tone === "error" ? "text-error" : "text-muted"}`}>
                      {row.subtitle}
                    </p>
                  </div>
                </div>
                {i < coverageRows.length - 1 && <div className="h-px bg-border w-full mt-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col gap-5 w-full">
          <StepHeading n={2}>Elementargefahren für Ihre Immobilie</StepHeading>
          <div className="bg-white w-full rounded-sm p-6 flex flex-col gap-10">
            <div className="flex flex-col gap-5 w-full">
              {risks.map((r) => (
                <div key={r.label} className="flex flex-col gap-3 w-full">
                  <div className="flex gap-2 items-center">
                    <div className="bg-teal-tint rounded-full p-1 flex items-center justify-center">{r.icon}</div>
                    <p className="text-[14px] font-medium text-black">{r.label}</p>
                  </div>
                  <div className="h-2 rounded-full bg-track overflow-hidden w-full">
                    <div className="h-full rounded-full bg-error" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <p className="font-bold text-[14px] text-ink-strong">Weiter abgedeckte Elementargefahren</p>
              <div className="flex flex-col gap-4 w-full">
                {coveredExtra.map((c) => (
                  <div key={c} className="flex gap-2 items-center">
                    <div className="bg-teal-tint rounded-full p-1 flex items-center justify-center">
                      <CheckCircle2 size={18} className="text-teal" />
                    </div>
                    <p className="flex-1 text-[14px] font-medium text-muted">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col gap-5 w-full">
          <StepHeading n={3}>
            Gefahren die durch eine Wohngebäudeversicherung abgesichert sind
          </StepHeading>
          <div className="bg-white w-full rounded-sm p-6">
            <div className="flex flex-col gap-2 w-full">
              {buildingCoverage.map((c, i) => (
                <div key={i} className="border border-border w-full">
                  <button
                    onClick={() => setOpenRow(openRow === i ? null : i)}
                    className="flex gap-2.5 items-center justify-center p-2.5 w-full text-left"
                  >
                    <div className="bg-teal-tint rounded-full size-10 flex items-center justify-center shrink-0">
                      {c.icon}
                    </div>
                    <p className="flex-1 font-bold text-[14px] text-ink-strong">{c.label}</p>
                    {openRow === i ? (
                      <Minus size={22} className="text-teal" />
                    ) : (
                      <Plus size={22} className="text-teal" />
                    )}
                  </button>
                  {openRow === i && (
                    <p className="px-2.5 pb-3 text-[13px] text-muted">{c.detail}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust footer */}
        <div className="flex flex-col items-center gap-8 w-full pb-4">
          <div className="flex items-center gap-1.5">
            <Lock size={13} className="text-muted" />
            <p className="text-[11px] text-muted text-center">
              Ihre Daten werden zu Ihrer Sicherheit immer SSL-verschlüsselt übertragen
            </p>
          </div>
          <h3 className="font-headline font-bold text-[20px] text-center text-ink leading-[1.25]">
            Vier gute Gründe, warum wir einer der Marktführer in Bayern und der Pfalz sind
          </h3>
          <div className="flex flex-col gap-4 w-full">
            {reasons.map((r) => (
              <div key={r.title} className="bg-white/60 rounded-xl p-6 flex flex-col items-center gap-3 text-center">
                <div className="size-14 rounded-full bg-teal flex items-center justify-center">{r.icon}</div>
                <p className="font-headline font-bold text-[15px] text-ink">{r.title}</p>
                <p className="text-[13px] text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RiskFooterBar
        riskLevel="Hohes Risiko"
        address="Lindenstraße 8, Nürnberg"
        onNext={() => navigate("/gebaeude")}
      />
    </div>
  );
}
