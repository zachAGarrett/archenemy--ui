import coordinatesToDistance from "./coordinatesToDistance";
import coordinatesToRadians from "./coordinatesToRadians";
import { CoordinatePair, SVGDim, Vector } from "./types";

export default function coordinateToVector(
  cp: CoordinatePair,
  svgDim: SVGDim
): Vector {
  const x = cp[0];
  const y = cp[1];
  const distance =
    // calculate distance from edge of arrow indicator dot
    ((coordinatesToDistance([x, y], svgDim.absMp) - 0.01 * svgDim.rect.height) /
      svgDim.rect.height) *
    2;
  const angle = coordinatesToRadians([x, y], svgDim.absMp);
  return { distance, angle };
}
