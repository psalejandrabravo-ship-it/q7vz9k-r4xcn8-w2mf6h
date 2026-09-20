import type { World, WorldId } from "@/types/game";
import { mundo1 } from "./mundo1";
import { mundo2 } from "./mundo2";
import { mundo3 } from "./mundo3";
import { mundo4 } from "./mundo4";

export const worlds: World[] = [mundo1, mundo2, mundo3, mundo4];

export const worldById: Record<WorldId, World> = {
  m1: mundo1,
  m2: mundo2,
  m3: mundo3,
  m4: mundo4,
};

export function getSituation(worldId: WorldId, situationIndex: number) {
  return worldById[worldId].situations[situationIndex];
}

export const GAME_TITLE = "El viaje de los corazones";
