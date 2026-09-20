import { z } from "zod";
import type { PersistedState, Settings, WorldId } from "@/types/game";

export const STORAGE_KEY = "mirarim-viaje-corazones";

const settingsSchema = z.object({
  narrationMode: z.enum(["audio", "read", "both"]),
  volume: z.number().min(0).max(1),
  rhythm: z.union([z.literal("manual"), z.literal(3), z.literal(5), z.literal(8)]),
  courseName: z.string().max(80),
  scriptOpen: z.boolean(),
});

const persistedSchema = z.object({
  schemaVersion: z.union([z.literal(1), z.literal(2)]),
  completed: z.array(z.string()),
  badges: z.array(z.enum(["m1", "m2", "m3", "m4"])),
  settings: settingsSchema,
  certificateDate: z.string().nullable(),
});

export const defaultSettings: Settings = {
  narrationMode: "read",
  volume: 0.8,
  rhythm: "manual",
  courseName: "",
  scriptOpen: false,
};

export const defaultPersisted: PersistedState = {
  schemaVersion: 2,
  completed: [],
  badges: [],
  settings: defaultSettings,
  certificateDate: null,
};

export function loadState(): PersistedState {
  if (typeof window === "undefined") return defaultPersisted;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPersisted;
    const parsed = persistedSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return defaultPersisted;
    return {
      schemaVersion: 2,
      completed: parsed.data.completed,
      badges: parsed.data.badges,
      settings: {
        ...parsed.data.settings,
        scriptOpen: false,
      },
      certificateDate: parsed.data.certificateDate,
    };
  } catch {
    return defaultPersisted;
  }
}

export function saveState(state: PersistedState): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, schemaVersion: 2 }));
    return true;
  } catch {
    return false;
  }
}

export function clearState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function isStorageAvailable(): boolean {
  try {
    const k = `${STORAGE_KEY}-probe`;
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export const WORLD_IDS: WorldId[] = ["m1", "m2", "m3", "m4"];
