type BusName = "master" | "sfx" | "music" | "narration";
type SfxName = "click" | "correct" | "incorrect" | "next" | "star";

const SFX_URLS: Record<SfxName, string> = {
  click: "/audio/efectos/click.wav",
  correct: "/audio/efectos/correct.wav",
  incorrect: "/audio/efectos/incorrect.wav",
  next: "/audio/efectos/next.wav",
  star: "/audio/efectos/star.wav",
};

let ctx: AudioContext | null = null;
const buses: Partial<Record<BusName, GainNode>> = {};
const buffers: Partial<Record<SfxName, AudioBuffer>> = {};
let mixer = { master: 0.8, sfx: 0.75, music: 0.4, narration: 0.9 };
let ducked = false;
let loadPromise: Promise<void> | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor({ latencyHint: "interactive" });
    const master = ctx.createGain();
    master.gain.value = curve(mixer.master);
    master.connect(ctx.destination);
    buses.master = master;

    for (const name of ["sfx", "music", "narration"] as const) {
      const g = ctx.createGain();
      g.gain.value = curve(mixer[name]);
      g.connect(master);
      buses[name] = g;
    }
  }
  return ctx;
}

export function unlockAudio() {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") {
    void audio.resume();
  }
  void preloadSfx();
}

export function preloadSfx(): Promise<void> {
  if (loadPromise) return loadPromise;
  const audio = getCtx();
  if (!audio) return Promise.resolve();
  loadPromise = (async () => {
    await Promise.all(
      (Object.keys(SFX_URLS) as SfxName[]).map(async (name) => {
        try {
          const res = await fetch(SFX_URLS[name]);
          if (!res.ok) return;
          const raw = await res.arrayBuffer();
          buffers[name] = await audio.decodeAudioData(raw.slice(0));
        } catch {
          /* synth fallback */
        }
      }),
    );
  })();
  return loadPromise;
}

function curve(v: number) {
  const n = Math.max(0, Math.min(1, v));
  return n * n;
}

function applyBus(bus: BusName, volume: number) {
  const audio = getCtx();
  const node = buses[bus];
  if (!audio || !node) return;
  node.gain.setTargetAtTime(curve(volume), audio.currentTime, 0.02);
}

export function setMixer(volumes: { master: number; sfx: number; music: number; narration: number }) {
  mixer = volumes;
  applyBus("master", mixer.master);
  applyBus("sfx", mixer.sfx * (ducked ? 0.22 : 1));
  applyBus("music", mixer.music);
  applyBus("narration", mixer.narration);
}

export function setMasterVolume(volume: number) {
  mixer.master = volume;
  applyBus("master", mixer.master);
}

export function duckSfx(active: boolean) {
  ducked = active;
  applyBus("sfx", mixer.sfx * (ducked ? 0.22 : 1));
}

function sfxBus() {
  return buses.sfx ?? null;
}

function playBuffer(name: SfxName): boolean {
  const audio = getCtx();
  const dest = sfxBus();
  const buf = buffers[name];
  if (!audio || !dest || !buf) return false;
  const src = audio.createBufferSource();
  src.buffer = buf;
  src.connect(dest);
  src.start();
  src.onended = () => src.disconnect();
  return true;
}

function tone(freq: number, start: number, dur: number, type: OscillatorType, gain = 0.12) {
  const audio = getCtx();
  const dest = sfxBus();
  if (!audio || !dest) return;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.018);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g);
  g.connect(dest);
  osc.start(start);
  osc.stop(start + dur + 0.02);
  osc.onended = () => {
    osc.disconnect();
    g.disconnect();
  };
}

export function playCorrect() {
  unlockAudio();
  if (playBuffer("correct")) return;
  const audio = getCtx();
  if (!audio) return;
  const t = audio.currentTime;
  tone(523.25, t, 0.12, "sine", 0.08);
  tone(659.25, t + 0.08, 0.14, "sine", 0.09);
  tone(783.99, t + 0.18, 0.18, "triangle", 0.09);
  tone(1046.5, t + 0.3, 0.28, "sine", 0.08);
}

export function playIncorrect() {
  unlockAudio();
  if (playBuffer("incorrect")) return;
  const audio = getCtx();
  if (!audio) return;
  const t = audio.currentTime;
  tone(329.63, t, 0.22, "sine", 0.06);
  tone(246.94, t + 0.14, 0.38, "triangle", 0.05);
}

export function playStar() {
  unlockAudio();
  if (playBuffer("star")) return;
  const audio = getCtx();
  if (!audio) return;
  const t = audio.currentTime;
  tone(392, t, 0.18, "sine", 0.07);
  tone(523.25, t + 0.12, 0.2, "sine", 0.08);
  tone(659.25, t + 0.26, 0.28, "triangle", 0.09);
  tone(783.99, t + 0.42, 0.5, "sine", 0.08);
}

export function playWhoosh() {
  playNext();
}

export function playNext() {
  unlockAudio();
  if (playBuffer("next")) return;
  const audio = getCtx();
  if (!audio) return;
  const t = audio.currentTime;
  tone(392, t, 0.12, "sine", 0.05);
  tone(523.25, t + 0.08, 0.16, "triangle", 0.05);
}

export function playClick() {
  unlockAudio();
  if (playBuffer("click")) return;
  const audio = getCtx();
  if (!audio) return;
  tone(1180, audio.currentTime, 0.05, "sine", 0.04);
}

if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") unlockAudio();
  });
}
