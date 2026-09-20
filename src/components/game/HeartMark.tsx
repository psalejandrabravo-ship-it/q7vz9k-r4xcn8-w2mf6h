import { cn } from "@/lib/utils";

export function HeartMark({ className, burst = false }: { className?: string; burst?: boolean }) {
  return (
    <span className={cn("relative inline-flex", className)}>
      <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-md" aria-hidden="true">
        <path
          d="M32 56S8 40 8 24a12 12 0 0 1 22-6 12 12 0 0 1 22 6c0 16-24 32-24 32Z"
          fill="currentColor"
        />
      </svg>
      {burst
        ? [0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="pointer-events-none absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-coral animate-float-heart"
              style={{
                marginLeft: `${(i - 2.5) * 14}px`,
                animationDelay: `${i * 70}ms`,
              }}
            >
              <svg viewBox="0 0 64 64" className="h-full w-full">
                <path
                  d="M32 56S8 40 8 24a12 12 0 0 1 22-6 12 12 0 0 1 22 6c0 16-24 32-24 32Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          ))
        : null}
    </span>
  );
}
