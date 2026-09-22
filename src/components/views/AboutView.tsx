import { Logo } from "@/components/brand/Logo";
import { useGameStore } from "@/store/game-store";

export function AboutView() {
  const setScreen = useGameStore((s) => s.setScreen);

  return (
    <section className="sheet-view px-6 py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <Logo />
        <h1 className="text-3xl font-extrabold text-indigo">Acerca de</h1>
        <p className="text-lg leading-relaxed">
          <strong>El viaje de los corazones</strong> es un recorrido de 12 situaciones socioemocionales para
          educación parvularia. Lo guía la persona educadora, proyectado en la sala.
        </p>
        <p className="text-lg leading-relaxed text-muted">
          Un proyecto de MIRARIM. No se piden ni se envían nombres de niñas o niños. Colegio, curso, docente y
          logo quedan solo en este dispositivo.
        </p>
        <button
          type="button"
          onClick={() => setScreen("cover")}
          className="min-h-14 self-start rounded-xl bg-indigo px-8 text-lg font-bold text-cream"
        >
          Volver
        </button>
      </div>
    </section>
  );
}
