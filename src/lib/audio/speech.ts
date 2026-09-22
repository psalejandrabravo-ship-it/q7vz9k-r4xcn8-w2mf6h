import { duckSfx, unlockAudio } from "@/lib/audio/sfx";

let current: SpeechSynthesisUtterance | null = null;

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const ranked = ["es-CL", "es-419", "es-MX", "es-ES", "es-AR", "es-US", "es"];
  for (const tag of ranked) {
    const exact = voices.find((v) => v.lang.replace("_", "-") === tag);
    if (exact) return exact;
  }
  const femaleEs = voices.find(
    (v) =>
      v.lang.toLowerCase().startsWith("es") &&
      /female|mujer|paulina|monica|mónica|sabina|helena|lucia|lucía|soledad|karina|dalia/i.test(v.name),
  );
  if (femaleEs) return femaleEs;
  return voices.find((v) => v.lang.toLowerCase().startsWith("es")) ?? null;
}

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function stopSpeech() {
  duckSfx(false);
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  current = null;
}

export function speak(text: string, volume: number): boolean {
  if (!canSpeak() || !text.trim()) return false;
  unlockAudio();
  stopSpeech();
  const utter = new SpeechSynthesisUtterance(text);
  const voice = pickVoice();
  if (voice) {
    utter.voice = voice;
    utter.lang = voice.lang;
  } else {
    utter.lang = "es-ES";
  }
  utter.rate = 0.92;
  utter.pitch = 1;
  utter.volume = Math.max(0, Math.min(1, volume));
  utter.onstart = () => duckSfx(true);
  utter.onend = () => {
    duckSfx(false);
    current = null;
  };
  utter.onerror = () => {
    duckSfx(false);
    current = null;
  };
  current = utter;
  window.speechSynthesis.speak(utter);
  return true;
}

export function warmupVoices() {
  if (!canSpeak()) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    window.speechSynthesis.getVoices();
  });
}
