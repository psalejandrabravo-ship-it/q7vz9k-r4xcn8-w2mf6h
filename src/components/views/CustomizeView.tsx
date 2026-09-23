import { useRef } from "react";
import { BrandMark } from "@/components/brand/Logo";
import { CopyAulaButton } from "@/components/game/CopyAulaButton";
import { resizeLogoFile } from "@/lib/game/logo";
import { useGameStore } from "@/store/game-store";
import type { LogoMode } from "@/types/game";

const brandOptions: Array<{ id: LogoMode; title: string; detail: string }> = [
  { id: "mirarim", title: "Logo MIRARIM", detail: "Se muestra la marca MIRARIM." },
  {
    id: "custom",
    title: "Logo propio",
    detail: "Reemplaza a MIRARIM en la portada, el juego y el certificado.",
  },
  { id: "hidden", title: "Ocultar MIRARIM", detail: "No se ve la marca en la portada, el juego ni el certificado." },
];

export function CustomizeView() {
  const customize = useGameStore((s) => s.customize);
  const updateCustomize = useGameStore((s) => s.updateCustomize);
  const setScreen = useGameStore((s) => s.setScreen);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onLogo(file: File | undefined) {
    if (!file) return;
    try {
      const dataUrl = await resizeLogoFile(file);
      updateCustomize({ logoDataUrl: dataUrl, logoMode: "custom" });
    } catch {
      /* ignore invalid image */
    }
  }

  return (
    <section className="sheet-view px-6 py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <BrandMark />
        <h1 className="text-3xl font-extrabold text-indigo">Personalizar</h1>
        <p className="text-muted">
          Estos datos se usan en el certificado y en la presentación. Quedan en este dispositivo, no en un
          servidor. No escribas nombres de estudiantes.
        </p>

        <label className="space-y-2">
          <span className="text-lg font-bold text-indigo">Colegio o jardín</span>
          <input
            type="text"
            value={customize.schoolName}
            onChange={(e) => updateCustomize({ schoolName: e.target.value })}
            maxLength={80}
            className="min-h-14 w-full rounded-xl border border-line bg-paper px-4 text-lg"
          />
        </label>

        <label className="space-y-2">
          <span className="text-lg font-bold text-indigo">Curso o sala</span>
          <input
            type="text"
            value={customize.courseName}
            onChange={(e) => updateCustomize({ courseName: e.target.value })}
            placeholder="Por ejemplo: Sala amarilla"
            maxLength={80}
            className="min-h-14 w-full rounded-xl border border-line bg-paper px-4 text-lg"
          />
        </label>

        <label className="space-y-2">
          <span className="text-lg font-bold text-indigo">Docente o educadora</span>
          <input
            type="text"
            value={customize.teacherName}
            onChange={(e) => updateCustomize({ teacherName: e.target.value })}
            maxLength={80}
            className="min-h-14 w-full rounded-xl border border-line bg-paper px-4 text-lg"
          />
        </label>

        <label className="space-y-2">
          <span className="text-lg font-bold text-indigo">Fecha</span>
          <input
            type="date"
            value={customize.sessionDate}
            onChange={(e) => updateCustomize({ sessionDate: e.target.value })}
            className="min-h-14 w-full rounded-xl border border-line bg-paper px-4 text-lg"
          />
        </label>

        <fieldset className="space-y-3">
          <legend className="text-lg font-bold text-indigo">Marca de la presentación</legend>
          <p className="text-muted">Elige qué se ve donde aparece el logo de MIRARIM.</p>
          {brandOptions.map((option) => (
            <label
              key={option.id}
              className="flex min-h-14 cursor-pointer items-start gap-3 rounded-xl bg-paper px-4 py-3 shadow-[inset_0_0_0_1px_var(--color-line)]"
            >
              <input
                type="radio"
                name="logo-mode"
                className="mt-1 size-5"
                checked={customize.logoMode === option.id}
                onChange={() => updateCustomize({ logoMode: option.id })}
              />
              <span>
                <span className="block font-extrabold text-indigo">{option.title}</span>
                <span className="block text-sm text-muted">{option.detail}</span>
              </span>
            </label>
          ))}

          {customize.logoMode === "custom" ? (
            <div className="flex items-center gap-4 rounded-xl bg-paper p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <div className="flex h-20 w-44 items-center justify-center overflow-hidden rounded-xl bg-cream px-2 shadow-[inset_0_0_0_1px_var(--color-line)]">
                {customize.logoDataUrl ? (
                  <img src={customize.logoDataUrl} alt="Logo cargado" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="px-2 text-center text-xs font-semibold text-muted">Sin imagen</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => void onLogo(e.target.files?.[0])}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="min-h-12 rounded-xl bg-indigo px-4 font-bold text-cream"
                >
                  Subir logo
                </button>
                {customize.logoDataUrl ? (
                  <button
                    type="button"
                    onClick={() => updateCustomize({ logoDataUrl: null })}
                    className="min-h-10 text-left text-sm font-semibold text-indigo underline"
                  >
                    Quitar logo
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </fieldset>

        <p className="text-muted">
          Generar presentación arma un enlace con esta marca, el colegio y el curso. Quien lo abra ve el viaje
          así, sin MIRARIM si lo ocultaste o con tu logo si lo subiste. El avance no viaja.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setScreen("cover")}
            className="min-h-14 self-start rounded-xl bg-coral px-8 text-lg font-extrabold text-paper"
          >
            Guardar y volver
          </button>
          <CopyAulaButton customize={customize} intent="presentacion" />
        </div>
      </div>
    </section>
  );
}