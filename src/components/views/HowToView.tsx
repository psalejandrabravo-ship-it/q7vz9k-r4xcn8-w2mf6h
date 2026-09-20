import { Logo } from "@/components/brand/Logo";
import { useGameStore } from "@/store/game-store";

const steps = [
  "El juego se proyecta en horizontal. Arriba se lee la situación; abajo o al lado están las alternativas.",
  "El guión para ti queda oculto. Ábrelo con el botón Guión si lo necesitas. La voz suena solo con el ícono.",
  "El grupo vota con los dedos o los pulgares.",
  "Tú pulsas (o arrastras) la opción de la mayoría. No hay puntaje ni perdedores.",
  "Si se equivocan, el búho invita a pensar otra vez.",
  "Puedes ir a cualquier mundo y volver al mapa cuando quieras.",
];

export function HowToView() {
  const setScreen = useGameStore((s) => s.setScreen);
  return (
    <section className="min-h-dvh bg-cream px-6 py-10 text-ink">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <Logo />
        <h1 className="text-3xl font-extrabold text-indigo md:text-4xl">Cómo se juega</h1>
        <p className="text-lg text-muted">
          Esta guía es para la persona educadora. El grupo no necesita leer.
        </p>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-4 rounded-xl bg-paper p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo text-lg font-extrabold text-cream">
                {i + 1}
              </span>
              <p className="pt-1 text-lg">{step}</p>
            </li>
          ))}
        </ol>
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
