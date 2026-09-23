import { BrandMark } from "@/components/brand/Logo";
import { useGameStore } from "@/store/game-store";
import type { NarrationMode, Rhythm } from "@/types/game";

export function SettingsView() {
  const settings = useGameStore((s) => s.settings);
  const updateSettings = useGameStore((s) => s.updateSettings);
  const closeOverlay = useGameStore((s) => s.closeOverlay);
  const setScreen = useGameStore((s) => s.setScreen);
  const confirmReset = useGameStore((s) => s.confirmReset);
  const requestReset = useGameStore((s) => s.requestReset);
  const cancelReset = useGameStore((s) => s.cancelReset);
  const confirmAndReset = useGameStore((s) => s.confirmAndReset);
  const storageOk = useGameStore((s) => s.storageOk);
  const speechOk = useGameStore((s) => s.speechOk);
  const returnTo = useGameStore((s) => s.returnTo);

  function back() {
    if (returnTo && returnTo !== "settings") closeOverlay();
    else setScreen("cover");
  }

  return (
    <section className="sheet-view px-6 py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <BrandMark />
        <h1 className="text-3xl font-extrabold text-indigo">Configuración</h1>

        <fieldset className="space-y-3">
          <legend className="text-lg font-bold text-indigo">Narración</legend>
          {(
            [
              ["audio", "Sin texto de pregunta en pantalla (voz solo con el ícono)"],
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
            <p className="text-sm text-muted">Este navegador no tiene voz. Puedes leer el guión en pantalla.</p>
          ) : (
            <p className="text-sm text-muted">La narración no se oye sola. Pulsa el ícono durante el juego.</p>
          )}
        </fieldset>

        <VolumeSlider
          label="Volumen general"
          value={settings.volumeMaster}
          onChange={(volumeMaster) => updateSettings({ volumeMaster })}
        />
        <VolumeSlider
          label="Narración"
          value={settings.volumeNarration}
          onChange={(volumeNarration) => updateSettings({ volumeNarration })}
        />
        <VolumeSlider
          label="Efectos"
          value={settings.volumeSfx}
          onChange={(volumeSfx) => updateSettings({ volumeSfx })}
        />
        <VolumeSlider
          label="Música (cuando haya pistas)"
          value={settings.volumeMusic}
          onChange={(volumeMusic) => updateSettings({ volumeMusic })}
        />

        <fieldset className="space-y-3">
          <legend className="text-lg font-bold text-indigo">Ritmo</legend>
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

        <label className="flex min-h-14 items-center gap-3 rounded-xl bg-paper px-4">
          <input
            type="checkbox"
            checked={settings.animations}
            onChange={(e) => updateSettings({ animations: e.target.checked })}
            className="size-5 accent-coral"
          />
          <span className="text-lg">Animaciones</span>
        </label>
        <label className="flex min-h-14 items-center gap-3 rounded-xl bg-paper px-4">
          <input
            type="checkbox"
            checked={settings.particles}
            onChange={(e) => updateSettings({ particles: e.target.checked })}
            className="size-5 accent-coral"
          />
          <span className="text-lg">Confeti al acertar</span>
        </label>

        {!storageOk ? (
          <p className="rounded-xl bg-gold/20 px-4 py-3 text-sm">Este navegador no guarda el progreso al recargar.</p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={back} className="min-h-14 rounded-xl bg-indigo px-8 text-lg font-bold text-cream">
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
              <p className="font-semibold">¿Borrar el avance de las 12 situaciones?</p>
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

function VolumeSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-lg font-bold text-indigo">{label}</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-coral"
      />
    </label>
  );
}
