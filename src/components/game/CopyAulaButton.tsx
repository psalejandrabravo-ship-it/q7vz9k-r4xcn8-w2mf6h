import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { buildAulaUrl, copyText, shareFromCustomize } from "@/lib/persistence/share";
import type { Customize } from "@/types/game";

type Variant = "cover" | "sheet" | "row";

export function CopyAulaButton({
  customize,
  name,
  variant = "sheet",
}: {
  customize: Customize;
  name?: string;
  variant?: Variant;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "empty" | "fail">("idle");
  const share = shareFromCustomize(customize, name);

  async function onCopy() {
    if (!share) {
      setStatus("empty");
      window.setTimeout(() => setStatus("idle"), 2800);
      return;
    }
    const base = `${window.location.origin}${window.location.pathname}`;
    const ok = await copyText(buildAulaUrl(base, share));
    setStatus(ok ? "copied" : "fail");
    window.setTimeout(() => setStatus("idle"), 2800);
  }

  const label =
    status === "copied"
      ? "Enlace copiado"
      : status === "empty"
        ? "Falta colegio o curso"
        : status === "fail"
          ? "No se pudo copiar"
          : variant === "row"
            ? "Copiar enlace"
            : "Copiar enlace del aula";

  const Icon = status === "copied" ? Check : Link2;
  const className =
    variant === "cover"
      ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-paper/15 px-4 text-sm font-semibold text-cream backdrop-blur-sm transition hover:bg-paper/25"
      : variant === "row"
        ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-paper px-4 font-bold text-indigo shadow-[inset_0_0_0_1px_var(--color-line)]"
        : "inline-flex min-h-14 items-center justify-center gap-2 self-start rounded-xl bg-indigo px-6 text-base font-bold text-cream";

  return (
    <button type="button" onClick={() => void onCopy()} className={className}>
      <Icon className="size-4" aria-hidden />
      {label}
    </button>
  );
}
