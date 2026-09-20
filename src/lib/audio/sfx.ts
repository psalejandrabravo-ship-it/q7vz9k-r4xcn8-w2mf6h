let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor({ latencyHint: "interactive" });
    master = ctx.createGain();
    master.gain.value = 0.8;
    master.connect(ctx.destination);
  }
  return ctx;
}

export function unlockAudio() {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") {
    void audio.resume();
  }
}

export function setMasterVolume(volume: number) {
  const audio = getCtx();
  if (!audio || !master) return;
  const v = Math.max(0, Math.min(1, volume));
  master.gain.setTargetAtTime(v * v, audio.currentTime, 0.02);
}

function tone(freq: number, start: number, dur: number, type: OscillatorType, gain = 0.12) {
  const audio = getCtx();
  if (!audio || !master) return;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.018);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g);
  g.connect(master);
  osc.start(start);
  osc.stop(start + dur + 0.02);
  osc.onended = () => {
    osc.disconnect();
    g.disconnect();
  };
}

function noiseBurst(start: number, dur: number, gain = 0.04) {
  const audio = getCtx();
  if (!audio || !master) return;
  const buffer = audio.createBuffer(1, Math.floor(audio.sampleRate * dur), audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = audio.createBufferSource();
  const g = audio.createGain();
  const filter = audio.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 1200;
  src.buffer = buffer;
  g.gain.setValueAtTime(gain, start);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  src.connect(filter);
  filter.connect(g);
  g.connect(master);
  src.start(start);
  src.stop(start + dur);
}

export function playCorrect() {
  unlockAudio();
  const audio = getCtx();
  if (!audio) return;
  const t = audio.currentTime;
  tone(523.25, t, 0.12, "sine", 0.08);
  tone(659.25, t + 0.08, 0.14, "sine", 0.09);
  tone(783.99, t + 0.18, 0.18, "triangle", 0.09);
  tone(1046.5, t + 0.3, 0.28, "sine", 0.08);
  tone(1318.5, t + 0.42, 0.4, "sine", 0.05);
}

export function playIncorrect() {
  unlockAudio();
  const audio = getCtx();
  if (!audio) return;
  const t = audio.currentTime;
  tone(246.94, t, 0.22, "sine", 0.06);
  tone(196, t + 0.14, 0.38, "triangle", 0.05);
}

export function playBadge() {
  unlockAudio();
  const audio = getCtx();
  if (!audio) return;
  const t = audio.currentTime;
  tone(392, t, 0.18, "sine", 0.07);
  tone(523.25, t + 0.12, 0.2, "sine", 0.08);
  tone(659.25, t + 0.26, 0.28, "triangle", 0.09);
  tone(783.99, t + 0.42, 0.5, "sine", 0.08);
}

export function playClick() {
  unlockAudio();
  const audio = getCtx();
  if (!audio) return;
  const t = audio.currentTime;
  tone(880, t, 0.06, "triangle", 0.04);
  noiseBurst(t, 0.04, 0.025);
}

export function playDrop() {
  unlockAudio();
  const audio = getCtx();
  if (!audio) return;
  const t = audio.currentTime;
  tone(392, t, 0.08, "sine", 0.05);
  tone(523.25, t + 0.05, 0.12, "triangle", 0.05);
}

if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") unlockAudio();
  });
}
