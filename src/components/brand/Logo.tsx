import { useGameStore } from "@/store/game-store";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "color",
  className,
}: {
  variant?: "color" | "white";
  className?: string;
}) {
  const src =
    variant === "white"
      ? "/assets/brand/MIRARIM-horizontal-blanco.svg"
      : "/assets/brand/MIRARIM-horizontal-color.svg";
  return (
    <img
      src={src}
      alt="MIRARIM"
      className={cn("h-9 w-auto md:h-11", className)}
    />
  );
}

/** Logo de la sala: MIRARIM, el del establecimiento, o nada. */
export function BrandMark({
  variant = "color",
  className,
}: {
  variant?: "color" | "white";
  className?: string;
}) {
  const logoMode = useGameStore((s) => s.customize.logoMode);
  const logoDataUrl = useGameStore((s) => s.customize.logoDataUrl);

  if (logoMode === "hidden") return null;
  if (logoMode === "custom" && logoDataUrl) {
    return (
      <img
        src={logoDataUrl}
        alt="Logo del establecimiento"
        className={cn(
          "h-12 w-auto max-w-56 shrink-0 object-contain",
          className,
          variant === "white" && "h-12 bg-transparent p-0 shadow-none md:h-14",
        )}
      />
    );
  }
  if (logoMode === "custom") return null;
  return <Logo variant={variant} className={className} />;
}

export function Isotipo({ className }: { className?: string }) {
  return (
    <img
      src="/assets/brand/MIRARIM-isotipo-color-1024.png"
      alt=""
      className={cn("h-16 w-16 object-contain", className)}
    />
  );
}