import { Logo } from "@/components/brand/Logo";
import { worlds } from "@/data";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game-store";

export function MapView() {
  const completed = useGameStore((s) => s.completed);
  const badges = useGameStore((s) => s.badges);
  const openWorld = useGameStore((s) => s.openWorld);
  const setScreen = useGameStore((s) => s.setScreen);
  const openSettings = useGameStore((s) => s.openSettings);
  const allDone = worlds.every((w) => w.situations.every((s) => completed.includes(s.id)));

  return (
    <section className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-cream text-ink">
      <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-line bg-paper px-4">
        <Logo className="h-6" />
        <div className="flex gap-2">
          <button type="button" onClick={openSettings} className="h-9 rounded-lg px-3 text-sm font-semibold text-indigo">
            Configuración
          </button>
          <button type="button" onClick={() => setScreen("cover")} className="h-9 rounded-lg px-3 text-sm font-semibold text-indigo">
            Inicio
          </button>
        </div>
      </header>
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-2 px-4 py-3">
        <h1 className="shrink-0 text-center text-xl font-extrabold text-indigo md:text-2xl">Elige un mundo</h1>
        <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-3">
          {worlds.map((world) => {
            const done = world.situations.filter((s) => completed.includes(s.id)).length;
            return (
              <button
                key={world.id}
                type="button"
                onClick={() => openWorld(world.id)}
                className="group flex min-h-0 flex-col overflow-hidden rounded-xl bg-paper text-left shadow-lg"
              >
                <img src={world.coverSrc} alt="" className="min-h-0 w-full flex-1 object-cover transition duration-200 group-hover:brightness-105" />
                <div className="flex shrink-0 items-center justify-between gap-2 px-3 py-2">
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-extrabold text-indigo md:text-lg">{world.name}</h2>
                    <div className="mt-1 flex gap-1.5" aria-label={`${done} de ${world.situations.length}`}>
                      {world.situations.map((s, i) => (
                        <span key={s.id} className={cn("size-2 rounded-full md:size-2.5", i < done ? "bg-coral" : "bg-indigo/20")} />
                      ))}
                    </div>
                  </div>
                  {badges.includes(world.id) ? (
                    <span className="shrink-0 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-ink">Insignia</span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
        {allDone ? (
          <button
            type="button"
            onClick={() => setScreen("certificate")}
            className="mx-auto h-11 shrink-0 rounded-xl bg-gold px-8 text-base font-extrabold text-ink"
          >
            Ver certificado del curso
          </button>
        ) : null}
      </div>
    </section>
  );
}
