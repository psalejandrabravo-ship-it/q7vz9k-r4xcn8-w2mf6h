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

export function Isotipo({ className }: { className?: string }) {
  return (
    <img
      src="/assets/brand/MIRARIM-isotipo-color-1024.png"
      alt=""
      className={cn("h-16 w-16 object-contain", className)}
    />
  );
}
