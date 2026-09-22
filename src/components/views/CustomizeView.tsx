import { useRef } from "react";
import { Logo } from "@/components/brand/Logo";
import { CopyAulaButton } from "@/components/game/CopyAulaButton";
import { resizeLogoFile } from "@/lib/game/logo";
import { useGameStore } from "@/store/game-store";

export function CustomizeView() {
  const customize = useGameStore((s) => s.customize);
  const updateCustomize = useGameStore((s) => s.updateCustomize);
  const setScreen = useGameStore((s) => s.setScreen);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onLogo(file: File | undefined) {
    if (!file) return;
    try {
      const dataUrl = await resizeLogoFile(file);
      updateCustomize({ logoDataUrl: dataUrl });
    } catch {
      /* ignore invalid image */
    }
  }

  return (
    <section className="sheet-view px-6 py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <Logo />
        <h1 className="text-3xl font-extrabold text-indigo">Personalizar</h1>
        <p className="text-muted">
          Estos datos se usan en el certificado. Quedan en este dispositivo, no en un servidor. No escribas
          nombres de estudiantes. Puedes copiar un enlace del aula para abrirla en otro computador o en el
          proyector.
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

        <div className="space-y-3">
          <p className="text-lg font-bold text-indigo">Logo del establecimiento</p>
          <div className="flex items-center gap-4">
            <div className="flex size-20 items-center justify-center overflow-hidden rounded-xl bg-paper shadow-[inset_0_0_0_1px_var(--color-line)]">
              {customize.logoDataUrl ? (
                <img src={customize.logoDataUrl} alt="Logo cargado" className="max-h-full max-w-full object-contain" />
              ) : (
                <Logo className="h-8" />
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
                  className="min-h-10 text-sm font-semibold text-indigo underline"
                >
                  Quitar logo
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setScreen("cover")}
            className="min-h-14 self-start rounded-xl bg-coral px-8 text-lg font-extrabold text-paper"
          >
            Guardar y volver
          </button>
          <CopyAulaButton customize={customize} />
        </div>
      </div>
    </section>
  );
}
