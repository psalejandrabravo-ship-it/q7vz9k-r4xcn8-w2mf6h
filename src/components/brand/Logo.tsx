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
      <span
        className={cn(
          "inline-flex h-9 max-w-72 shrink-0 items-center justify-center",
          variant === "white" && "rounded-lg bg-paper px-2.5 py-1",
          className,
        )}
      >
        <img src={logoDataUrl} alt="Logo del establecimiento" className="h-full w-auto max-w-full object-contain" />
      </span>
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