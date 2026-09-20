import { Logo } from "@/components/brand/Logo";
import { useGameStore } from "@/store/game-store";
import { unlockAudio } from "@/lib/audio/sfx";
import { warmupVoices } from "@/lib/audio/speech";

export function CoverView() {
  const setScreen = useGameStore((s) => s.setScreen);
  const openSettings = useGameStore((s) => s.openSettings);

  function start() {
    unlockAudio();
    warmupVoices();
    setScreen("map");
  }

  return (
    <section className="relative flex h-dvh max-h-dvh flex-col overflow-hidden bg-indigo text-cream">
      <img
        src="/assets/illustrations/backgrounds/portada.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo/70 via-indigo/55 to-indigo/85" />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-6 py-6 text-center md:gap-6">
        <Logo variant="white" className="h-8 shrink-0 md:h-11" />
        <div className="max-w-3xl shrink-0 space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-cream sm:text-4xl md:text-5xl">
            El viaje de los corazones
          </h1>
          <p className="text-base text-cream/90 md:text-xl">Un viaje para mirar, comprender y cuidar.</p>
        </div>
        <div className="flex w-full max-w-3xl shrink-0 flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={start}
            className="h-12 min-w-40 rounded-xl bg-coral px-8 text-lg font-extrabold text-paper shadow-lg transition hover:brightness-110 md:h-14 md:text-xl"
          >
            Comenzar
          </button>
          <button
            type="button"
            onClick={() => setScreen("howto")}
            className="h-12 min-w-40 rounded-xl bg-paper/15 px-8 text-base font-semibold text-cream backdrop-blur-sm transition hover:bg-paper/25 md:h-14 md:text-lg"
          >
            Cómo se juega
          </button>
          <button
            type="button"
            onClick={openSettings}
            className="h-12 min-w-40 rounded-xl bg-paper/10 px-8 text-base font-semibold text-cream backdrop-blur-sm transition hover:bg-paper/20 md:h-14 md:text-lg"
          >
            Configuración
          </button>
        </div>
      </div>
    </section>
  );
}
