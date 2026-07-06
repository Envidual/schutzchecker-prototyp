import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Phone, CheckCircle2 } from "lucide-react";
import { Header } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { FooterNav } from "../components/FooterNav";
import { useFlow } from "../state/FlowContext";

type ContactMethod = "email" | "phone";

export function KontaktScreen() {
  const navigate = useNavigate();
  const { progress } = useFlow();
  const [method, setMethod] = useState<ContactMethod>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const value = method === "email" ? email : phone;
  const canSubmit = !!value;
  const valueError = attempted && !value;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Elementargefahren" />
      <ProgressBar value={progress(3)} />

      {submitted ? (
        <div className="flex-1 bg-page px-4 py-12 flex flex-col items-center gap-5 text-center">
          <div className="size-16 rounded-full bg-teal flex items-center justify-center">
            <CheckCircle2 size={34} className="text-white" />
          </div>
          <h2 className="font-headline font-bold text-[22px] text-ink">Vielen Dank!</h2>
          <p className="text-[14px] text-muted max-w-[300px]">
            Ihr Betreuer meldet sich in Kürze {method === "email" ? "per E-Mail" : "telefonisch"} bei Ihnen, um die
            weiteren Schritte gemeinsam mit Ihnen zu besprechen.
          </p>
        </div>
      ) : (
        <div className="flex-1 bg-page px-4 py-10 flex flex-col gap-5">
          <h2 className="font-headline font-bold text-[18px] text-ink leading-[1.3]">
            Ihr Betreuer meldet sich gerne bei Ihnen
          </h2>

          <div className="bg-white rounded-md p-5 flex flex-col gap-4">
            <p className="font-semibold text-[14px] text-ink-strong">Wie möchten Sie kontaktiert werden?</p>

            <div className="flex flex-col gap-3">
              <ContactOption
                icon={<Mail size={18} className="text-ink-strong" />}
                label="per E-Mail"
                selected={method === "email"}
                onClick={() => setMethod("email")}
              />
              <ContactOption
                icon={<Phone size={18} className="text-ink-strong" />}
                label="per Telefon"
                selected={method === "phone"}
                onClick={() => setMethod("phone")}
              />
            </div>

            <label className="flex flex-col gap-2">
              <span className={`font-semibold text-[14px] ${valueError ? "text-error" : "text-ink-strong"}`}>
                {method === "email" ? "E-Mail" : "Telefon"}
              </span>
              {method === "email" ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-lg border bg-white px-3 py-3 text-[14px] ${
                    valueError ? "border-error" : "border-border"
                  }`}
                />
              ) : (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full rounded-lg border bg-white px-3 py-3 text-[14px] ${
                    valueError ? "border-error" : "border-border"
                  }`}
                />
              )}
            </label>
          </div>
        </div>
      )}

      {submitted ? (
        <FooterNav showBack={false} nextLabel="Zurück zur Startseite" onNext={() => navigate("/")} />
      ) : (
        <FooterNav
          onBack={() => navigate("/fragen")}
          onNext={handleSubmit}
          nextLabel="Absenden"
          nextDisabled={!canSubmit}
          onBlocked={() => setAttempted(true)}
        />
      )}
    </div>
  );
}

function ContactOption({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg border border-border px-4 py-3.5 text-left"
    >
      <span
        className={`size-5 shrink-0 rounded-full border-2 flex items-center justify-center ${
          selected ? "border-teal" : "border-border"
        }`}
      >
        {selected && <span className="size-2.5 rounded-full bg-teal" />}
      </span>
      {icon}
      <span className="text-[14px] font-medium text-ink-strong">{label}</span>
    </button>
  );
}
