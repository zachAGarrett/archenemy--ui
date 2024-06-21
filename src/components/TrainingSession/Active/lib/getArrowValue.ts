import clamp from "./clamp";
import { Target } from "./types";

export interface GetArrowValueProps {
  target: Target;
  distance: number;
}

export default function getArrowValue({
  target,
  distance,
}: GetArrowValueProps) {
  return clamp(
    Math.floor(target.rings + 1 - target.rings * distance),
    target.min,
    target.max
  );
}
