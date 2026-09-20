import { Logo } from "@/components/brand/Logo";
import { useGameStore } from "@/store/game-store";
import type { NarrationMode, Rhythm } from "@/types/game";

export function SettingsView() {
  const settings = useGameStore((s) => s.settings);
  const updateSettings = useGameStore((s) => s.updateSettings);
  const closeOverlay = useGameStore((s) => s.closeOverlay);
  const confirmReset = useGameStore((s) => s.confirmReset);
  const requestReset = useGameStore((s) => s.requestReset);
  const cancelReset = useGameStore((s) => s.cancelReset);
  const confirmAndReset = useGameStore((s) => s.confirmAndReset);
  const storageOk = useGameStore((s) => s.storageOk);
  const speechOk = useGameStore((s) => s.speechOk);

  return (
    <section className="min-h-dvh bg-cream px-6 py-10 text-ink">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <Logo />
        <h1 className="text-3xl font-extrabold text-indigo">Configuración</h1>

        <fieldset className="space-y-3">
          <legend className="text-lg font-bold text-indigo">Narración</legend>
          {(
            [
              ["audio", "Sin texto en pantalla (voz solo con el ícono)"],
              ["read", "Mostrar la pregunta (recomendado)"],
              ["both", "Pregunta visible y voz con el ícono"],
            ] as Array<[NarrationMode, string]>
          ).map(([value, label]) => (
            <label key={value} className="flex min-h-14 items-center gap-3 rounded-xl bg-paper px-4">
              <input
                type="radio"
                name="narration"
                checked={settings.narrationMode === value}
                onChange={() => updateSettings({ narrationMode: value })}
                className="size-5 accent-coral"
              />
              <span className="text-lg">{label}</span>
            </label>
          ))}
          {!speechOk ? (
            <p className="text-sm text-muted">
              Este navegador no tiene voz. Puedes leer el guión en pantalla.
            </p>
          ) : (
            <p className="text-sm text-muted">
              La narración no se oye sola. Pulsa el ícono de volumen durante el juego.
            </p>
          )}
        </fieldset>

        <label className="space-y-2">
          <span className="text-lg font-bold text-indigo">Volumen</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={settings.volume}
            onChange={(e) => updateSettings({ volume: Number(e.target.value) })}
            className="w-full accent-coral"
          />
        </label>

        <fieldset className="space-y-3">
          <legend className="text-lg font-bold text-indigo">Ritmo de las escenas</legend>
          {(
            [
              ["manual", "La educadora avanza"],
              [3, "Pausa automática 3 s"],
              [5, "Pausa automática 5 s"],
              [8, "Pausa automática 8 s"],
            ] as Array<[Rhythm, string]>
          ).map(([value, label]) => (
            <label key={String(value)} className="flex min-h-12 items-center gap-3 rounded-xl bg-paper px-4">
              <input
                type="radio"
                name="rhythm"
                checked={settings.rhythm === value}
                onChange={() => updateSettings({ rhythm: value })}
                className="size-5 accent-coral"
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>

        <label className="space-y-2">
          <span className="text-lg font-bold text-indigo">Nombre del curso</span>
          <input
            type="text"
            value={settings.courseName}
            onChange={(e) => updateSettings({ courseName: e.target.value })}
            placeholder="Por ejemplo: Sala amarilla"
            maxLength={80}
            className="min-h-14 w-full rounded-xl border border-line bg-paper px-4 text-lg"
          />
          <span className="block text-sm text-muted">
            No ingreses nombres ni información personal o sensible de estudiantes,
            pacientes o participantes.
          </span>
        </label>

        {!storageOk ? (
          <p className="rounded-xl bg-gold/20 px-4 py-3 text-sm">
            Este navegador no guarda el progreso al recargar.
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={closeOverlay}
            className="min-h-14 rounded-xl bg-indigo px-8 text-lg font-bold text-cream"
          >
            Guardar y volver
          </button>
          {!confirmReset ? (
            <button
              type="button"
              onClick={requestReset}
              className="min-h-14 rounded-xl px-8 text-lg font-semibold text-indigo underline"
            >
              Restablecer progreso
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3 rounded-xl bg-paper p-3">
              <p className="font-semibold">¿Borrar todo el avance y la configuración?</p>
              <button
                type="button"
                onClick={confirmAndReset}
                className="min-h-12 rounded-lg bg-coral px-4 font-bold text-paper"
              >
                Sí, borrar
              </button>
              <button type="button" onClick={cancelReset} className="min-h-12 px-4 font-semibold">
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
