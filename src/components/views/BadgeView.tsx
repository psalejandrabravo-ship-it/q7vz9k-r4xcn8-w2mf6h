import { worldById } from "@/data";
import { useGameStore } from "@/store/game-store";

export function BadgeView() {
  const worldId = useGameStore((s) => s.worldId);
  const goMap = useGameStore((s) => s.goMap);
  const openWorld = useGameStore((s) => s.openWorld);
  const badges = useGameStore((s) => s.badges);
  const setScreen = useGameStore((s) => s.setScreen);
  const world = worldId ? worldById[worldId] : null;
  if (!world) return null;

  const order: Array<"m1" | "m2" | "m3" | "m4"> = ["m1", "m2", "m3", "m4"];
  const next = order[order.indexOf(world.id) + 1];
  const allBadges = badges.length === 4;

  return (
    <section className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-cream px-6 py-10 text-center text-ink">
      <p className="text-lg font-semibold text-muted">El grupo obtuvo</p>
      <h1 className="text-4xl font-extrabold text-indigo">{world.badgeName}</h1>
      <img
        src={world.badgeSrc}
        alt={`Insignia ${world.badgeName}`}
        className="size-56 object-contain mix-blend-multiply md:size-72"
      />
      <p className="max-w-xl text-xl">
        Completaron {world.name}. No es una competencia: es un cuidado que hicieron juntos.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={goMap}
          className="min-h-14 rounded-xl bg-indigo px-8 text-lg font-extrabold text-cream"
        >
          Volver al mapa
        </button>
        {next ? (
          <button
            type="button"
            onClick={() => openWorld(next)}
            className="min-h-14 rounded-xl bg-coral px-8 text-lg font-extrabold text-paper"
          >
            Siguiente mundo
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => openWorld(world.id)}
          className="min-h-14 rounded-xl px-8 text-lg font-semibold text-indigo underline"
        >
          Repetir este mundo
        </button>
        {allBadges ? (
          <button
            type="button"
            onClick={() => setScreen("certificate")}
            className="min-h-14 rounded-xl bg-gold px-8 text-lg font-extrabold text-ink"
          >
            Certificado
          </button>
        ) : null}
      </div>
    </section>
  );
}
