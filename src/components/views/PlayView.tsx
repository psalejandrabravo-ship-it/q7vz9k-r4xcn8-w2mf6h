import { BookOpen, Pause, Volume2, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { HeartMark } from "@/components/game/HeartMark";
import { SceneImage } from "@/components/game/SceneImage";
import { SequenceBoard } from "@/components/game/SequenceBoard";
import { worldById } from "@/data";
import { playClick } from "@/lib/audio/sfx";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game-store";

export function PlayView() {
  const worldId = useGameStore((s) => s.worldId);
  const situationIndex = useGameStore((s) => s.situationIndex);
  const phase = useGameStore((s) => s.phase);
  const lastCorrect = useGameStore((s) => s.lastCorrect);
  const sequenceSlots = useGameStore((s) => s.sequenceSlots);
  const paused = useGameStore((s) => s.paused);
  const completed = useGameStore((s) => s.completed);
  const settings = useGameStore((s) => s.settings);
  const goMap = useGameStore((s) => s.goMap);
  const togglePause = useGameStore((s) => s.togglePause);
  const choose = useGameStore((s) => s.choose);
  const placeSequence = useGameStore((s) => s.placeSequence);
  const afterFeedback = useGameStore((s) => s.afterFeedback);
  const retry = useGameStore((s) => s.retry);
  const skipToSituation = useGameStore((s) => s.skipToSituation);
  const speakCurrent = useGameStore((s) => s.speakCurrent);
  const updateSettings = useGameStore((s) => s.updateSettings);

  const world = worldId ? worldById[worldId] : null;
  const sit = world?.situations[situationIndex];
  if (!world || !sit) return null;

  const scriptOpen = settings.scriptOpen;
  const scriptText =
    phase === "feedback"
      ? lastCorrect
        ? sit.feedbackCorrect
        : sit.feedbackIncorrect
      : `${sit.narration} ${sit.optionsDescription}`;
  const optionLabel =
    sit.mechanic === "yesno"
      ? "¿Estuvo bien?"
      : sit.mechanic === "sequence"
        ? "Ordena los pasos"
        : "Elige una lámina";

  function pick(id: string) {
    playClick();
    choose(id);
  }

  const sceneList =
    phase === "feedback" && lastCorrect && sit.closingSrc
      ? [{ src: sit.closingSrc, alt: sit.closingAlt ?? "" }]
      : sit.scenes;

  return (
    <section className="play-stage text-ink">
      <aside className="play-rail">
        <div className="play-rail-nav">
          <Logo className="hidden h-5 shrink-0 xl:block" />
          <button type="button" onClick={goMap} className="h-8 shrink-0 rounded-lg bg-indigo px-3 text-sm font-bold text-cream">
            Mapa
          </button>
          <h1 className="min-w-0 flex-1 truncate text-sm font-extrabold text-indigo">{world.name}</h1>
          <div className="flex shrink-0 gap-1">
            {world.situations.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => skipToSituation(i)}
                className={cn(
                  "size-7 rounded-full text-xs font-extrabold",
                  i === situationIndex ? "ring-2 ring-coral ring-offset-1" : "",
                  completed.includes(item.id) ? "bg-coral text-paper" : "bg-indigo/15 text-indigo",
                )}
                aria-label={`${item.title}${completed.includes(item.id) ? ", completada" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => updateSettings({ scriptOpen: !scriptOpen })}
            className={cn(
              "inline-flex h-8 shrink-0 items-center gap-1 rounded-lg px-2 text-sm font-semibold",
              scriptOpen ? "bg-indigo text-cream" : "text-indigo",
            )}
          >
            <BookOpen className="size-4" />
            Guión
          </button>
          <button type="button" onClick={speakCurrent} className="h-8 shrink-0 px-1 text-indigo" aria-label="Escuchar narración">
            <Volume2 className="size-5" />
          </button>
          <button type="button" onClick={togglePause} className="h-8 shrink-0 px-1 text-indigo" aria-label="Pausa">
            <Pause className="size-5" />
          </button>
        </div>

        <div className="play-rail-copy">
          <p className="text-xs font-bold uppercase tracking-wide text-coral">{sit.title}</p>
          <p className="mt-1 text-base font-extrabold leading-snug text-indigo">{sit.narration}</p>
          <p className="mt-2 text-xs font-semibold tracking-wide text-muted">{sit.hint}</p>
          {sit.mechanic === "sequence" && sit.sequenceCards ? (
            <ul className="mt-3 space-y-1.5">
              {[...sit.sequenceCards]
                .sort((a, b) => a.id.localeCompare(b.id))
                .map((card) => (
                <li key={card.id} className="flex items-start gap-2 text-sm leading-snug text-ink">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-extrabold text-ink">
                    {card.id}
                  </span>
                  <span className="font-semibold">{card.title}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {scriptOpen ? (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-indigo/10 px-3 py-2">
              <p className="min-w-0 flex-1 text-sm leading-snug text-ink">{scriptText}</p>
              <button type="button" onClick={() => updateSettings({ scriptOpen: false })} className="shrink-0 text-indigo" aria-label="Ocultar guión">
                <X className="size-4" />
              </button>
            </div>
          ) : null}
        </div>
      </aside>

      <div className="play-square-wrap">
        <div
          className={cn(
            "play-square",
            sit.mechanic === "sequence"
              ? "is-sequence"
              : sit.mechanic === "yesno"
                ? "is-yesno"
                : sit.choices?.length === 4
                  ? "is-emotion"
                  : "is-choose",
          )}
        >
          <div className="play-scenes">
            {sceneList.map((scene) => (
              <SceneImage key={scene.src} src={scene.src} alt={scene.alt} />
            ))}
          </div>

          {sit.mechanic === "sequence" && sit.sequenceCards ? (
            <div
              className={cn(
                "flex min-h-0 flex-col overflow-hidden rounded-xl bg-indigo p-2 text-cream",
                phase === "feedback" && !lastCorrect ? "animate-shake" : "",
              )}
            >
              <p className="mb-1 shrink-0 text-center text-xs font-bold tracking-wide text-gold">{optionLabel}</p>
              {phase === "play" ? (
                <SequenceBoard
                  cards={sit.sequenceCards}
                  slots={sequenceSlots}
                  onPlace={placeSequence}
                />
              ) : (
                <FeedbackBar correct={!!lastCorrect} onNext={afterFeedback} onRetry={retry} />
              )}
            </div>
          ) : null}

          {sit.mechanic !== "sequence" && sit.choices ? (
            <div
              className={cn(
                "flex min-h-0 flex-col overflow-hidden rounded-xl bg-indigo p-2 text-cream",
                phase === "feedback" && !lastCorrect ? "animate-shake" : "",
              )}
            >
              <p className="mb-1 shrink-0 text-center text-xs font-bold tracking-wide text-gold">{optionLabel}</p>
              {phase === "play" ? (
                <div
                  className={cn(
                    "grid min-h-0 flex-1 gap-2 overflow-hidden",
                    sit.mechanic === "yesno" ? "grid-cols-2" : sit.choices.length === 4 ? "grid-cols-4" : "grid-cols-3",
                  )}
                >
                  {sit.choices.map((choice, i) =>
                    sit.mechanic === "yesno" ? (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => pick(choice.id)}
                        className={cn(
                          "rounded-lg px-3 text-lg font-extrabold leading-tight shadow-md transition hover:-translate-y-0.5 active:scale-95",
                          choice.id === "yes" ? "bg-gold text-ink" : "bg-coral text-paper",
                        )}
                      >
                        {choice.label}
                      </button>
                    ) : (
                      <button key={choice.id} type="button" onClick={() => pick(choice.id)} className="choice-card transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95">
                        {choice.src ? (
                          <span className="fit-pic">
                            <img src={choice.src} alt={choice.alt} />
                          </span>
                        ) : null}
                        <span className="choice-cap">
                          {i + 1}. {choice.label.replace(/^Lámina \d+\.\s*/, "")}
                        </span>
                      </button>
                    ),
                  )}
                </div>
              ) : (
                <FeedbackBar correct={!!lastCorrect} onNext={afterFeedback} onRetry={retry} />
              )}
            </div>
          ) : null}
        </div>
      </div>

      {paused ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo/70 p-6">
          <div className="max-w-lg rounded-xl bg-paper p-8 text-center">
            <h2 className="text-3xl font-extrabold text-indigo">Pausa para conversar</h2>
            <p className="mt-3 text-lg text-muted">El audio está detenido. Cuando quieran, continúan.</p>
            <button type="button" onClick={togglePause} className="mt-6 min-h-14 rounded-xl bg-coral px-8 text-lg font-extrabold text-paper">
              Continuar
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FeedbackBar({
  correct,
  onNext,
  onRetry,
}: {
  correct: boolean;
  onNext: () => void;
  onRetry: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 text-center">
      {correct ? (
        <HeartMark burst className="size-16 text-coral animate-pop" />
      ) : (
        <img
          src="/assets/illustrations/characters/buho.jpg"
          alt="Búho sabio invitando a pensar otra vez."
          className="size-20 rounded-full object-cover shadow-lg animate-pop"
        />
      )}
      <p className="text-xl font-extrabold text-cream">{correct ? "¡Muy bien!" : "Pensemos otra vez"}</p>
      {correct ? (
        <button type="button" onClick={onNext} className="min-h-12 rounded-xl bg-gold px-8 text-lg font-extrabold text-ink shadow-lg transition hover:scale-105">
          Siguiente
        </button>
      ) : (
        <button type="button" onClick={onRetry} className="min-h-12 rounded-xl bg-coral px-8 text-lg font-extrabold text-paper shadow-lg transition hover:scale-105">
          Intentar de nuevo
        </button>
      )}
    </div>
  );
}
