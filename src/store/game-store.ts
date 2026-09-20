import { create } from "zustand";
import { worlds, worldById } from "@/data";
import {
  clearState,
  defaultPersisted,
  defaultSettings,
  isStorageAvailable,
  loadState,
  saveState,
} from "@/lib/persistence/storage";
import { playBadge, playCorrect, playDrop, playIncorrect, setMasterVolume, unlockAudio } from "@/lib/audio/sfx";
import { speak, stopSpeech } from "@/lib/audio/speech";
import type { PersistedState, PlayPhase, Screen, Settings, Situation, WorldId } from "@/types/game";

interface GameStore {
  screen: Screen;
  returnTo: Screen;
  worldId: WorldId | null;
  situationIndex: number;
  phase: PlayPhase;
  lastCorrect: boolean | null;
  sequenceSlots: Array<"A" | "B" | "C" | null>;
  shuffledOrder: Array<"A" | "B" | "C">;
  paused: boolean;
  storageOk: boolean;
  speechOk: boolean;
  confirmReset: boolean;
  completed: string[];
  badges: WorldId[];
  settings: Settings;
  certificateDate: string | null;
  hydrate: () => void;
  persist: () => void;
  setScreen: (screen: Screen) => void;
  openSettings: () => void;
  closeOverlay: () => void;
  updateSettings: (patch: Partial<Settings>) => void;
  requestReset: () => void;
  cancelReset: () => void;
  confirmAndReset: () => void;
  openWorld: (id: WorldId) => void;
  goMap: () => void;
  togglePause: () => void;
  choose: (choiceId: string) => void;
  placeSequence: (cardId: "A" | "B" | "C", slot: number) => void;
  clearSequenceSlot: (slot: number) => void;
  checkSequence: () => void;
  afterFeedback: () => void;
  retry: () => void;
  skipToSituation: (index: number) => void;
  speakCurrent: () => void;
}

function currentSituation(worldId: WorldId | null, situationIndex: number): Situation | null {
  if (!worldId) return null;
  return worldById[worldId].situations[situationIndex] ?? null;
}

function startSituation(_sit: Situation) {
  return {
    phase: "play" as PlayPhase,
    lastCorrect: null,
    sequenceSlots: [null, null, null] as Array<"A" | "B" | "C" | null>,
    shuffledOrder: ["A", "B", "C"] as Array<"A" | "B" | "C">,
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  screen: "cover",
  returnTo: "cover",
  worldId: null,
  situationIndex: 0,
  phase: "play",
  lastCorrect: null,
  sequenceSlots: [null, null, null],
  shuffledOrder: ["A", "B", "C"],
  paused: false,
  storageOk: true,
  speechOk: true,
  confirmReset: false,
  completed: [],
  badges: [],
  settings: defaultSettings,
  certificateDate: null,

  hydrate: () => {
    const loaded = loadState();
    set({
      completed: loaded.completed,
      badges: loaded.badges,
      settings: loaded.settings,
      certificateDate: loaded.certificateDate,
      storageOk: isStorageAvailable(),
      speechOk: typeof window !== "undefined" && "speechSynthesis" in window,
    });
    setMasterVolume(loaded.settings.volume);
  },

  persist: () => {
    const s = get();
    const payload: PersistedState = {
      schemaVersion: 2,
      completed: s.completed,
      badges: s.badges,
      settings: s.settings,
      certificateDate: s.certificateDate,
    };
    const ok = saveState(payload);
    set({ storageOk: ok });
  },

  setScreen: (screen) => {
    stopSpeech();
    set({ screen, paused: false });
  },

  openSettings: () => {
    const { screen } = get();
    set({ returnTo: screen === "settings" ? "cover" : screen, screen: "settings" });
  },

  closeOverlay: () => set({ screen: get().returnTo, confirmReset: false }),

  updateSettings: (patch) => {
    const settings = { ...get().settings, ...patch };
    set({ settings });
    if (patch.volume !== undefined) setMasterVolume(patch.volume);
    get().persist();
  },

  requestReset: () => set({ confirmReset: true }),
  cancelReset: () => set({ confirmReset: false }),
  confirmAndReset: () => {
    clearState();
    stopSpeech();
    set({
      ...defaultPersisted,
      settings: defaultSettings,
      confirmReset: false,
      screen: "cover",
      worldId: null,
      situationIndex: 0,
      phase: "play",
      lastCorrect: null,
      paused: false,
    });
  },

  openWorld: (id) => {
    unlockAudio();
    stopSpeech();
    const world = worldById[id];
    const firstIncomplete = world.situations.findIndex((s) => !get().completed.includes(s.id));
    const situationIndex = firstIncomplete === -1 ? 0 : firstIncomplete;
    const sit = world.situations[situationIndex];
    set({
      screen: "play",
      worldId: id,
      situationIndex,
      paused: false,
      ...startSituation(sit),
    });
  },

  goMap: () => {
    stopSpeech();
    set({ screen: "map", paused: false, worldId: null, phase: "play" });
  },

  togglePause: () => {
    const paused = !get().paused;
    if (paused) stopSpeech();
    set({ paused });
  },

  choose: (choiceId) => {
    unlockAudio();
    const { worldId, situationIndex } = get();
    const sit = currentSituation(worldId, situationIndex);
    if (!sit) return;
    const choice = sit.choices?.find((c) => c.id === choiceId);
    if (!choice) return;
    if (choice.correct) {
      playCorrect();
      set({ phase: "feedback", lastCorrect: true });
    } else {
      playIncorrect();
      set({ phase: "feedback", lastCorrect: false });
    }
  },

  placeSequence: (cardId, slot) => {
    const slots = [...get().sequenceSlots] as Array<"A" | "B" | "C" | null>;
    const existing = slots.indexOf(cardId);
    if (existing !== -1) slots[existing] = null;
    slots[slot] = cardId;
    playDrop();
    set({ sequenceSlots: slots });
    if (slots.every((s) => s !== null)) {
      window.setTimeout(() => get().checkSequence(), 80);
    }
  },

  clearSequenceSlot: (slot) => {
    const slots = [...get().sequenceSlots] as Array<"A" | "B" | "C" | null>;
    slots[slot] = null;
    set({ sequenceSlots: slots });
  },

  checkSequence: () => {
    unlockAudio();
    const { worldId, situationIndex, sequenceSlots } = get();
    const sit = currentSituation(worldId, situationIndex);
    if (!sit?.correctOrder) return;
    if (sequenceSlots.some((s) => s === null)) return;
    const ok = sit.correctOrder.every((id, i) => sequenceSlots[i] === id);
    if (ok) {
      playCorrect();
      set({ phase: "feedback", lastCorrect: true });
    } else {
      playIncorrect();
      set({ phase: "feedback", lastCorrect: false });
    }
  },

  afterFeedback: () => {
    const { lastCorrect, worldId, situationIndex, completed, badges } = get();
    const sit = currentSituation(worldId, situationIndex);
    if (!sit || !worldId) return;

    if (!lastCorrect) {
      get().retry();
      return;
    }

    const nextCompleted = completed.includes(sit.id) ? completed : [...completed, sit.id];
    const world = worldById[worldId];
    const worldDone = world.situations.every((s) => nextCompleted.includes(s.id));
    const nextBadges = worldDone && !badges.includes(worldId) ? [...badges, worldId] : badges;
    const allDone = worlds.every((w) => w.situations.every((s) => nextCompleted.includes(s.id)));
    const certificateDate =
      allDone && !get().certificateDate
        ? new Date().toISOString().slice(0, 10)
        : get().certificateDate;

    set({ completed: nextCompleted, badges: nextBadges, certificateDate });
    get().persist();

    if (worldDone && !badges.includes(worldId)) {
      playBadge();
      set({ screen: "badge" });
      return;
    }

    const nextIndex = situationIndex + 1;
    if (nextIndex < world.situations.length) {
      get().skipToSituation(nextIndex);
      return;
    }
    set({ screen: "map" });
  },

  retry: () => {
    const { worldId, situationIndex } = get();
    const sit = currentSituation(worldId, situationIndex);
    if (!sit) return;
    set(startSituation(sit));
  },

  skipToSituation: (index) => {
    const { worldId } = get();
    if (!worldId) return;
    const sit = worldById[worldId].situations[index];
    if (!sit) return;
    stopSpeech();
    set({ situationIndex: index, ...startSituation(sit) });
  },

  speakCurrent: () => {
    const { worldId, situationIndex, phase, settings, lastCorrect } = get();
    const sit = currentSituation(worldId, situationIndex);
    if (!sit) return;
    unlockAudio();
    if (phase === "feedback") {
      speak(lastCorrect ? sit.feedbackCorrect : sit.feedbackIncorrect, settings.volume);
      return;
    }
    speak(`${sit.narration} ${sit.optionsDescription}`, settings.volume);
  },
}));
