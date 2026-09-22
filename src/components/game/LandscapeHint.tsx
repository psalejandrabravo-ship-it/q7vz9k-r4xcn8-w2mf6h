import { useEffect, useState } from "react";
import { useGameStore } from "@/store/game-store";

export function LandscapeHint() {
  const dismissed = useGameStore((s) => s.landscapeHintDismissed);
  const dismiss = useGameStore((s) => s.dismissLandscapeHint);
  const [portrait, setPortrait] = useState(false);

  useEffect(() => {
    const check = () => setPortrait(window.matchMedia("(orientation: portrait)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (dismissed || !portrait) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 print:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3 rounded-xl bg-indigo px-4 py-3 text-cream shadow-lg">
        <p className="min-w-0 flex-1 text-sm font-semibold leading-snug">
          Se ve mejor en horizontal. Gira la tablet o el computador.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="h-10 shrink-0 rounded-lg bg-coral px-3 text-sm font-extrabold text-paper"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
