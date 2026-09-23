import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { compressLogoDataUrl } from "@/lib/game/logo";
import { buildAulaUrl, copyText, shareFromCustomize } from "@/lib/persistence/share";
import type { Customize } from "@/types/game";

type Variant = "cover" | "sheet" | "row";

export function CopyAulaButton({
  customize,
  name,
  variant = "sheet",
  intent = "enlace",
}: {
  customize: Customize;
  name?: string;
  variant?: Variant;
  intent?: "enlace" | "presentacion";
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "partial" | "empty" | "needLogo" | "fail">("idle");
  const [url, setUrl] = useState("");

  async function onCopy() {
    if (customize.logoMode === "custom" && !customize.logoDataUrl) {
      setUrl("");
      setStatus("needLogo");
      window.setTimeout(() => setStatus("idle"), 3200);
      return;
    }
    let logoForShare: string | null = null;
    if (customize.logoMode === "custom" && customize.logoDataUrl) {
      logoForShare = await compressLogoDataUrl(customize.logoDataUrl);
    }
    const share = shareFromCustomize(customize, name, logoForShare);
    if (!share) {
      setUrl("");
      setStatus("empty");
      window.setTimeout(() => setStatus("idle"), 2800);
      return;
    }
    const base = `${window.location.origin}${window.location.pathname}`;
    const nextUrl = buildAulaUrl(base, share);
    const ok = await copyText(nextUrl);
    const droppedLogo = customize.logoMode === "custom" && Boolean(customize.logoDataUrl) && !logoForShare;
    setUrl(intent === "presentacion" ? nextUrl : "");
    setStatus(ok ? (droppedLogo ? "partial" : "copied") : "fail");
    if (!ok) window.setTimeout(() => setStatus("idle"), 3200);
  }

  const presentacion = intent === "presentacion";
  const label =
    status === "copied"
      ? presentacion
        ? "Presentación copiada"
        : "Enlace copiado"
      : status === "partial"
        ? "Copiada sin el logo"
        : status === "needLogo"
          ? "Sube un logo primero"
          : status === "empty"
            ? "Falta curso o marca"
            : status === "fail"
              ? "No se pudo copiar"
              : variant === "row"
                ? "Copiar enlace"
                : presentacion
                  ? "Generar presentación"
                  : "Copiar enlace del aula";

  const Icon = status === "copied" || status === "partial" ? Check : Link2;
  const className =
    variant === "cover"
      ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-paper/15 px-4 text-sm font-semibold text-cream backdrop-blur-sm transition hover:bg-paper/25"
      : variant === "row"
        ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-paper px-4 font-bold text-indigo shadow-[inset_0_0_0_1px_var(--color-line)]"
        : "inline-flex min-h-14 items-center justify-center gap-2 self-start rounded-xl bg-indigo px-6 text-base font-bold text-cream";

  return (
    <>
      <button type="button" onClick={() => void onCopy()} className={className}>
        <Icon className="size-4 shrink-0" aria-hidden />
        {label}
      </button>
      {presentacion && url ? (
        <label className="basis-full space-y-2">
          <span className="text-sm font-bold text-indigo">Enlace de la presentación</span>
          <input
            readOnly
            value={url}
            onFocus={(e) => e.currentTarget.select()}
            className="min-h-14 w-full rounded-xl border border-line bg-paper px-4 text-sm text-indigo"
          />
        </label>
      ) : null}
    </>
  );
}
