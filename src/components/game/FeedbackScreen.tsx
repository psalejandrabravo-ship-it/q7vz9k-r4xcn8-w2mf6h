import { useEffect, useRef, type ReactNode } from "react";
import { Pause, Settings, Star, Volume2 } from "lucide-react";
import { FullscreenButton } from "@/components/game/FullscreenButton";
import { SITUACIONES, TOTAL_SITUACIONES } from "@/data";
import { cn } from "@/lib/utils";
import type { Option, Situacion } from "@/types/game";

export function FeedbackScreen({
  sit,
  chosen,
  correct,
  completed,
  motion,
  onContinue,
  onSpeak,
  onSettings,
  onPause,
}: {
  sit: Situacion;
  chosen: Option;
  correct: boolean;
  completed: number[];
  motion: boolean;
  onContinue: () => void;
  onSpeak: () => void;
  onSettings: () => void;
  onPause: () => void;
}) {
  const nextRef = useRef<HTMLButtonElement>(null);
  const tone = correct ? "excelente" : "mejorable";

  useEffect(() => {
    nextRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Enter" || event.key === "Escape") onContinue();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onContinue]);

  return (
    <section className={cn("stage-feedback", motion ? "" : "no-motion")}>
      <header className="feedback-bar">
        <ol className="feedback-stars" aria-label="Progreso">
          {SITUACIONES.map((item, i) => {
            const on = completed.includes(item.id) || i === sit.id - 1;
            return (
              <li key={item.id}>
                <Star
                  className={cn("size-4 md:size-5", on ? "fill-gold text-gold" : "text-cream/30")}
                  aria-hidden
                />
              </li>
            );
          })}
        </ol>
        <p className="feedback-bar-label">
          Situación {sit.id} de {TOTAL_SITUACIONES}
        </p>
        <div className="ml-auto flex items-center gap-1">
          <button type="button" onClick={onSpeak} className="h-10 shrink-0 px-1 text-cream" aria-label="Escuchar narración">
            <Volume2 className="size-5" />
          </button>
          <FullscreenButton light />
          <button type="button" onClick={onSettings} className="h-10 shrink-0 px-1 text-cream" aria-label="Configuración">
            <Settings className="size-5" />
          </button>
          <button type="button" onClick={onPause} className="h-10 shrink-0 px-1 text-cream" aria-label="Pausa">
            <Pause className="size-5" />
          </button>
        </div>
      </header>

      <div className="feedback-body">
        <figure className="feedback-scene">
          <img src={sit.ilustracion} alt={sit.ilustracionAlt} className="feedback-scene-img" />
        </figure>

        <article className={cn("feedback-card", tone === "excelente" ? "is-excelente" : "is-mejorable")}>
          <div className="feedback-card-header">
            <span className="feedback-emoji" aria-hidden>
              {correct ? "🌟" : "🤔"}
            </span>
            <h2 className="feedback-card-title">{chosen.feedback}</h2>
          </div>
          <p className="feedback-card-text">
            <EmphasisText text={chosen.explicacion} />
          </p>
          <button ref={nextRef} type="button" className="feedback-continue" onClick={onContinue}>
            Continuar
          </button>
        </article>
      </div>
    </section>
  );
}

function EmphasisText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const re = /([A-ZÁÉÍÓÚÜÑ]{2,}(?:\s+[A-ZÁÉÍÓÚÜÑ]{2,})*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(<strong key={match.index}>{match[0]}</strong>);
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
