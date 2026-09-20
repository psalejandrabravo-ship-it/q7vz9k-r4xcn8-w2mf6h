export type WorldId = "m1" | "m2" | "m3" | "m4";
export type NarrationMode = "audio" | "read" | "both";
export type Rhythm = "manual" | 3 | 5 | 8;
export type Mechanic = "choose" | "yesno" | "sequence";
export type Screen =
  | "cover"
  | "howto"
  | "settings"
  | "map"
  | "play"
  | "badge"
  | "certificate";
export type PlayPhase = "play" | "feedback";

export interface Scene {
  src: string;
  alt: string;
}

export interface Choice {
  id: string;
  label: string;
  src?: string;
  alt?: string;
  correct: boolean;
}

export interface SequenceCard {
  id: "A" | "B" | "C";
  title: string;
  src: string;
  alt: string;
}

export interface Situation {
  id: string;
  title: string;
  mechanic: Mechanic;
  hint: string;
  scenes: Scene[];
  narration: string;
  optionsDescription: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
  choices?: Choice[];
  sequenceCards?: SequenceCard[];
  correctOrder?: Array<"A" | "B" | "C">;
  closingSrc?: string;
  closingAlt?: string;
}

export interface World {
  id: WorldId;
  name: string;
  blurb: string;
  coverSrc: string;
  badgeName: string;
  badgeSrc: string;
  accent: "garden" | "park" | "school" | "kingdom";
  situations: Situation[];
}

export interface Settings {
  narrationMode: NarrationMode;
  volume: number;
  rhythm: Rhythm;
  courseName: string;
  scriptOpen: boolean;
}

export interface PersistedState {
  schemaVersion: 2;
  completed: string[];
  badges: WorldId[];
  settings: Settings;
  certificateDate: string | null;
}
