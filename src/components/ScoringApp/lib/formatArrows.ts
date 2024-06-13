import coordinateToVector from "./coordinateToVector";
import getArrowValue from "./getArrowValue";
import { Arrow, CoordinatePair, SVGDim, Target } from "./types";

export interface FormatArrowsProps {
  arrowCoordinatePairs: CoordinatePair[] | undefined;
  svgDimensions: SVGDim;
  target: Target;
  activeArrowKey?: number;
  focusedArrows?: number[];
}
export default function formatArrows({
  arrowCoordinatePairs,
  svgDimensions,
  target,
  activeArrowKey,
  focusedArrows,
}: FormatArrowsProps): Arrow[] | undefined {
  return arrowCoordinatePairs?.map((cp, i) => {
    const vector = coordinateToVector(cp, svgDimensions);
    const value = getArrowValue({ target, distance: vector.distance });
    return {
      vector,
      value,
      coordinates: cp,
      active: activeArrowKey === i,
      focused: focusedArrows?.includes(i),
    };
  });
}
