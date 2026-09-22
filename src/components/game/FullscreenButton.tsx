import { Maximize2, Minimize2 } from "lucide-react";
import { useFullscreen } from "@/lib/game/fullscreen";
import { cn } from "@/lib/utils";

export function FullscreenButton({
  label = false,
  light = false,
  className,
}: {
  label?: boolean;
  light?: boolean;
  className?: string;
}) {
  const { active, toggle } = useFullscreen();

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      className={cn(
        "inline-flex h-10 shrink-0 items-center gap-2 rounded-lg px-2 text-sm font-semibold",
        light ? "text-cream hover:bg-paper/15" : "text-indigo hover:bg-indigo/10",
        className,
      )}
      aria-label={active ? "Salir de pantalla completa" : "Pantalla completa"}
    >
      {active ? <Minimize2 className="size-5" /> : <Maximize2 className="size-5" />}
      {label ? <span className="hidden sm:inline">{active ? "Salir" : "Pantalla completa"}</span> : null}
    </button>
  );
}
