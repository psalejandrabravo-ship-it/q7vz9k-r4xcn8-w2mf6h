import { useGameStore } from "@/store/game-store";

export const GUIA_PDF = "/assets/guias/mi-corazon-empatico.pdf";
export const GUIA_IMAGE = "/assets/guias/mi-corazon-empatico.png";
export const GUIA_FILENAME = "Guía - Mi corazón empático.pdf";

export function ActivityView() {
  const closeOverlay = useGameStore((s) => s.closeOverlay);

  return (
    <section className="flex h-dvh max-h-dvh flex-col bg-[#f6efe2] text-indigo">
      <header className="flex shrink-0 items-center justify-between gap-3 px-4 py-2">
        <button
          type="button"
          onClick={closeOverlay}
          className="min-h-10 rounded-lg px-3 text-sm font-semibold text-indigo underline-offset-4 hover:underline"
        >
          Volver
        </button>
        <p className="truncate text-sm font-bold">Mi corazón empático</p>
        <a
          href={GUIA_PDF}
          download={GUIA_FILENAME}
          className="min-h-10 rounded-lg px-3 text-sm font-semibold text-indigo underline-offset-4 hover:underline"
        >
          Descargar
        </a>
      </header>
      <div className="min-h-0 flex-1 overflow-auto px-3 pb-3">
        <img
          src={GUIA_IMAGE}
          alt="Guía Mi corazón empático: empatía, compartir, ayudar e incluir, con un espacio para dibujar."
          className="mx-auto h-full max-h-full w-auto max-w-full object-contain"
        />
      </div>
    </section>
  );
}
