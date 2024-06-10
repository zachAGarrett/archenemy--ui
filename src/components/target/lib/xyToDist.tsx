import { CoordinatePair } from "./types";

export default function xyToDist(
  origin: CoordinatePair,
  target: CoordinatePair
) {
  const dx = target[0] - origin[0];
  const dy = target[1] - origin[1];
  return Math.sqrt(dy ** 2 + dx ** 2);
}
