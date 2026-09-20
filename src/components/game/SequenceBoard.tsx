import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { SequenceCard } from "@/types/game";

type CardId = "A" | "B" | "C";

function Letter({ id }: { id: CardId }) {
  return (
    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-extrabold text-ink shadow">
      {id}
    </span>
  );
}

export function SequenceBoard({
  cards,
  slots,
  onPlace,
  disabled,
}: {
  cards: SequenceCard[];
  slots: Array<CardId | null>;
  onPlace: (id: CardId, slot: number) => void;
  disabled?: boolean;
}) {
  const slotsRef = useRef<Array<HTMLButtonElement | null>>([null, null, null]);
  const startRef = useRef<{ id: CardId; x: number; y: number } | null>(null);
  const [picked, setPicked] = useState<CardId | null>(null);
  const [ghost, setGhost] = useState<{ id: CardId; x: number; y: number } | null>(null);
  const ghostRef = useRef(ghost);
  ghostRef.current = ghost;

  function cardById(id: CardId | null) {
    return cards.find((c) => c.id === id);
  }

  function slotAt(x: number, y: number) {
    return slotsRef.current.findIndex((el) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    });
  }

  useEffect(() => {
    function move(e: PointerEvent) {
      const start = startRef.current;
      if (!start) return;
      const dist = Math.hypot(e.clientX - start.x, e.clientY - start.y);
      if (dist > 8) setGhost({ id: start.id, x: e.clientX, y: e.clientY });
      else if (ghostRef.current) setGhost({ id: start.id, x: e.clientX, y: e.clientY });
    }
    function up(e: PointerEvent) {
      const start = startRef.current;
      const current = ghostRef.current;
      startRef.current = null;
      if (current || start) {
        const id = current?.id ?? start?.id;
        if (id) {
          const hit = slotAt(e.clientX, e.clientY);
          if (hit !== -1) {
            onPlace(id, hit);
            setPicked(null);
          }
        }
      }
      setGhost(null);
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [onPlace]);

  return (
    <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,0.62fr)_minmax(0,1.38fr)] gap-2 overflow-hidden">
      <div className="grid min-h-0 grid-cols-3 gap-2">
        {["1.º", "2.º", "3.º"].map((label, slot) => {
          const card = cardById(slots[slot]);
          return (
            <button
              key={label}
              type="button"
              ref={(el) => {
                slotsRef.current[slot] = el;
              }}
              onClick={() => {
                if (picked && !disabled) {
                  onPlace(picked, slot);
                  setPicked(null);
                }
              }}
              className={cn(
                "seq-slot p-1",
                ghost || picked ? "animate-slot-glow" : "shadow-[inset_0_0_0_3px_var(--color-gold)]",
              )}
            >
              <p className="text-center text-[11px] font-extrabold leading-none text-indigo">{label}</p>
              {card ? (
                <div className="relative min-h-0 flex-1">
                  <div className="fit-pic mt-1 rounded-md">
                    <img src={card.src} alt={card.alt} />
                  </div>
                  <span className="absolute right-1 top-1">
                    <Letter id={card.id} />
                  </span>
                </div>
              ) : (
                <p className="flex flex-1 items-center justify-center text-center text-[11px] font-semibold text-muted">
                  {picked ? "Toca aquí" : "Suelta aquí"}
                </p>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid min-h-0 grid-cols-3 gap-2">
        {(["A", "B", "C"] as CardId[]).map((id) => {
          const card = cardById(id);
          if (!card || slots.includes(id)) return <div key={id} className="min-h-0" />;
          return (
            <button
              key={id}
              type="button"
              disabled={disabled}
              onPointerDown={(e) => {
                if (disabled || e.button !== 0) return;
                startRef.current = { id, x: e.clientX, y: e.clientY };
                setPicked(id);
              }}
              className={cn(
                "choice-card relative min-h-0",
                picked === id ? "ring-4 ring-coral" : "",
                ghost?.id === id ? "opacity-40" : "",
              )}
              aria-label={`Lámina ${id}`}
            >
              <span className="fit-pic">
                <img src={card.src} alt={card.alt} className="pointer-events-none" />
              </span>
              <span className="absolute left-1.5 top-1.5">
                <Letter id={id} />
              </span>
            </button>
          );
        })}
      </div>

      {ghost ? (
        <div
          className="pointer-events-none fixed z-50 w-40 -translate-x-1/2 -translate-y-[110%] overflow-hidden rounded-xl bg-paper shadow-2xl ring-4 ring-coral"
          style={{ left: ghost.x, top: ghost.y }}
        >
          <img src={cardById(ghost.id)?.src} alt="" className="max-h-44 w-auto object-contain" />
        </div>
      ) : null}
    </div>
  );
}
