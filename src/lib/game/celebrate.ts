export async function burstConfetti() {
  if (typeof window === "undefined") return;
  const { default: confetti } = await import("canvas-confetti");
  await confetti({
    particleCount: 90,
    spread: 72,
    origin: { y: 0.68 },
    colors: ["#e07a5f", "#e6b84c", "#2b2155", "#f7f1e6"],
    disableForReducedMotion: true,
  });
}
