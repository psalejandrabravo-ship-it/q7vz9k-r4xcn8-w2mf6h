import { useEffect, useState } from "react";

function fsElement(): Element | null {
  const doc = document as Document & { webkitFullscreenElement?: Element | null };
  return document.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

function canFullscreen(): boolean {
  if (typeof document === "undefined") return false;
  const el = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
  };
  return Boolean(el.requestFullscreen || el.webkitRequestFullscreen);
}

async function requestOn(el: HTMLElement): Promise<void> {
  const node = el as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
    webkitEnterFullscreen?: () => void;
  };
  if (node.requestFullscreen) {
    await node.requestFullscreen();
    return;
  }
  if (node.webkitRequestFullscreen) {
    await node.webkitRequestFullscreen();
    return;
  }
  if (node.webkitEnterFullscreen) node.webkitEnterFullscreen();
}

export async function enterFullscreen(target?: HTMLElement | null): Promise<void> {
  if (typeof document === "undefined") return;
  const el = target ?? document.documentElement;
  if (fsElement() === el) return;
  try {
    await requestOn(el);
  } catch {
    /* iPhone Safari and some embeds block fullscreen */
  }
}

export async function toggleFullscreen(): Promise<void> {
  if (typeof document === "undefined") return;
  const doc = document as Document & { webkitExitFullscreen?: () => Promise<void> | void };
  try {
    if (fsElement()) {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
      return;
    }
    await enterFullscreen();
  } catch {
    /* iPhone Safari and some embeds block fullscreen */
  }
}

export function useFullscreen() {
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(canFullscreen());
    const sync = () => setActive(Boolean(fsElement()));
    sync();
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  return { active, supported, toggle: toggleFullscreen };
}
