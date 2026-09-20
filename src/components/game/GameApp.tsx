import { useEffect } from "react";
import { CoverView } from "@/components/views/CoverView";
import { HowToView } from "@/components/views/HowToView";
import { SettingsView } from "@/components/views/SettingsView";
import { MapView } from "@/components/views/MapView";
import { PlayView } from "@/components/views/PlayView";
import { BadgeView } from "@/components/views/BadgeView";
import { CertificateView } from "@/components/views/CertificateView";
import { warmupVoices } from "@/lib/audio/speech";
import { unlockAudio } from "@/lib/audio/sfx";
import { useGameStore } from "@/store/game-store";

export function GameApp() {
  const screen = useGameStore((s) => s.screen);
  const hydrate = useGameStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
    warmupVoices();
    const onFirst = () => unlockAudio();
    window.addEventListener("pointerdown", onFirst, { once: true });
    window.addEventListener("keydown", onFirst, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
  }, [hydrate]);

  switch (screen) {
    case "howto":
      return <HowToView />;
    case "settings":
      return <SettingsView />;
    case "map":
      return <MapView />;
    case "play":
      return <PlayView />;
    case "badge":
      return <BadgeView />;
    case "certificate":
      return <CertificateView />;
    default:
      return <CoverView />;
  }
}
