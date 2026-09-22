import type { Customize } from "@/types/game";

export const AULA_HASH_PREFIX = "aula=";

export interface ClassroomShare {
  v: 1;
  name: string;
  schoolName: string;
  courseName: string;
  teacherName: string;
  sessionDate: string;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(token: string): Uint8Array {
  const pad = token.length % 4 === 0 ? "" : "=".repeat(4 - (token.length % 4));
  const b64 = token.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export function encodeClassroomShare(share: ClassroomShare): string {
  const json = JSON.stringify({
    v: 1 as const,
    name: share.name.trim().slice(0, 80),
    schoolName: share.schoolName.trim().slice(0, 80),
    courseName: share.courseName.trim().slice(0, 80),
    teacherName: share.teacherName.trim().slice(0, 80),
    sessionDate: share.sessionDate.trim().slice(0, 10),
  });
  return `1.${bytesToBase64Url(new TextEncoder().encode(json))}`;
}

export function decodeClassroomShare(token: string): ClassroomShare | null {
  const trimmed = token.trim();
  const dot = trimmed.indexOf(".");
  if (dot <= 0) return null;
  const version = trimmed.slice(0, dot);
  const payload = trimmed.slice(dot + 1);
  if (version !== "1" || !payload) return null;
  try {
    const json = new TextDecoder().decode(base64UrlToBytes(payload));
    const data = JSON.parse(json) as Record<string, unknown>;
    if (data.v !== 1) return null;
    const name = typeof data.name === "string" ? data.name.trim().slice(0, 80) : "";
    const schoolName = typeof data.schoolName === "string" ? data.schoolName.trim().slice(0, 80) : "";
    const courseName = typeof data.courseName === "string" ? data.courseName.trim().slice(0, 80) : "";
    const teacherName = typeof data.teacherName === "string" ? data.teacherName.trim().slice(0, 80) : "";
    const sessionDate = typeof data.sessionDate === "string" ? data.sessionDate.trim().slice(0, 10) : "";
    if (!name && !schoolName && !courseName && !teacherName) return null;
    return {
      v: 1,
      name: name || courseName || schoolName || "Aula",
      schoolName,
      courseName,
      teacherName,
      sessionDate,
    };
  } catch {
    return null;
  }
}

export function parseAulaHash(hash: string): ClassroomShare | null {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw.startsWith(AULA_HASH_PREFIX)) return null;
  try {
    return decodeClassroomShare(decodeURIComponent(raw.slice(AULA_HASH_PREFIX.length)));
  } catch {
    return null;
  }
}

export function shareFromCustomize(customize: Customize, name?: string): ClassroomShare | null {
  const schoolName = customize.schoolName.trim();
  const courseName = customize.courseName.trim();
  const teacherName = customize.teacherName.trim();
  const label = (name ?? "").trim() || courseName || schoolName;
  if (!label && !teacherName) return null;
  return {
    v: 1,
    name: label || "Aula",
    schoolName,
    courseName,
    teacherName,
    sessionDate: customize.sessionDate.trim().slice(0, 10),
  };
}

export function buildAulaUrl(baseUrl: string, share: ClassroomShare): string {
  const trimmed = baseUrl.replace(/#.*$/, "").replace(/\?.*$/, "");
  return `${trimmed}#${AULA_HASH_PREFIX}${encodeClassroomShare(share)}`;
}

export function readAulaFromLocation(): ClassroomShare | null {
  if (typeof window === "undefined") return null;
  return parseAulaHash(window.location.hash);
}

export function clearAulaHash(): void {
  if (typeof window === "undefined") return;
  const hash = window.location.hash;
  if (!hash.startsWith(`#${AULA_HASH_PREFIX}`)) return;
  const clean = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(window.history.state, "", clean);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}
