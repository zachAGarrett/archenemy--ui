import { CoordinatePair } from "./types";

export default function radiansToCoordinate(radians: number): CoordinatePair {
  const x = Math.cos(radians);
  const y = Math.sin(radians);
  return [x, y];
}
