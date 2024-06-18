import coordinateToVector from "./coordinateToVector";
import getArrowValue from "./getArrowValue";
import { Arrow, CoordinatePair, SVGDim, Target } from "./types";

export interface FormatArrowProps {
  arrowCoordinatePair: CoordinatePair;
  svgDimensions: SVGDim;
  target: Target;
  id: string;
}
export default function formatArrow({
  arrowCoordinatePair,
  svgDimensions,
  target,
  id,
}: FormatArrowProps): Arrow {
  const vector = coordinateToVector(arrowCoordinatePair, svgDimensions);
  const value = getArrowValue({ target, distance: vector.distance });
  return {
    vector,
    value,
    coordinates: arrowCoordinatePair,
    id,
  };
}
