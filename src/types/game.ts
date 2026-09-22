export type NarrationMode = "audio" | "read" | "both";
export type Rhythm = "manual" | 3 | 5 | 8;

export type Screen =
  | "cover"
  | "welcome"
  | "video"
  | "customize"
  | "profiles"
  | "howto"
  | "about"
  | "settings"
  | "play"
  | "certificate";

export type PlayPhase = "play" | "chosen" | "explain";

export type Mechanic = "seleccionar_lamina_3" | "si_no" | "identificar_emocion_4";

export interface LaminaOption {
  id: "a" | "b" | "c";
  imagen: string;
  texto: string;
  correcta: boolean;
  alt: string;
  feedback: string;
  explicacion: string;
}

export interface SiNoOption {
  id: "si" | "no";
  texto: string;
  correcta: boolean;
  feedback: string;
  explicacion: string;
}

export interface EmotionOption {
  id: "feliz" | "triste" | "asustado" | "enojado";
  emoji: string;
  texto: string;
  correcta: boolean;
  feedback: string;
  explicacion: string;
}

export type Option = LaminaOption | SiNoOption | EmotionOption;

export interface Guion {
  narracion: string;
  preguntas: string[];
}

export interface Situacion {
  id: number;
  titulo: string;
  mecanica: Mechanic;
  ilustracion: string;
  ilustracionAlt: string;
  pregunta: string;
  opciones: Option[];
  guion: Guion;
}

export interface Settings {
  narrationMode: NarrationMode;
  volumeMaster: number;
  volumeNarration: number;
  volumeSfx: number;
  volumeMusic: number;
  animations: boolean;
  particles: boolean;
  rhythm: Rhythm;
  scriptOpen: boolean;
}

export interface Customize {
  schoolName: string;
  courseName: string;
  teacherName: string;
  logoDataUrl: string | null;
  sessionDate: string;
}

export interface AnswerRecord {
  optionId: string;
  correct: boolean;
}

export interface Profile {
  id: string;
  name: string;
  customize: Customize;
  completed: number[];
  answers: Record<string, AnswerRecord>;
  certificateDate: string | null;
}

export interface PersistedState {
  schemaVersion: 3;
  completed: number[];
  answers: Record<string, AnswerRecord>;
  settings: Settings;
  customize: Customize;
  profiles: Profile[];
  activeProfileId: string | null;
  certificateDate: string | null;
  landscapeHintDismissed: boolean;
  introSeen: boolean;
}
