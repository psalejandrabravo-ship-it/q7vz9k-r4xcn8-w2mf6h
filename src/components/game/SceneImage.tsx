import { useState } from "react";
import { cn } from "@/lib/utils";

/** Escala la ilustración al máximo del recuadro, sin recortar. */
export function FitImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span className={cn("flex min-h-0 min-w-0 flex-1 items-center justify-center px-3 text-center text-sm font-semibold text-indigo", className)}>
        {alt}
      </span>
    );
  }

  return (
    <span className={cn("relative block min-h-0 min-w-0 flex-1", className)}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-contain"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

export function SceneImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={cn("flex h-full w-full items-center justify-center overflow-hidden rounded-xl", className)}>
      {failed ? (
        <span className="px-4 text-center text-sm font-semibold text-indigo">{alt}</span>
      ) : (
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  );
}
