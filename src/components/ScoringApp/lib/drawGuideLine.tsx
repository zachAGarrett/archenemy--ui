import { Arrow, SVGDim } from "./types";

export interface DrawGuideLineProps {
  activeArrow?: Arrow;
  svgDimensions: SVGDim;
}

export default function drawGuideLine({
  activeArrow,
  svgDimensions,
}: DrawGuideLineProps) {
  if (activeArrow === undefined) return;
  const x = activeArrow.coordinates[0];
  const y = activeArrow.coordinates[1];
  const relX = `${
    ((x - svgDimensions.rect.left) / svgDimensions.rect.width) * 100
  }%`;
  const relY = `${
    ((y - svgDimensions.rect.top) / svgDimensions.rect.height) * 100
  }%`;
  return (
    <line
      x1={relX}
      x2="50%"
      y1={relY}
      y2="50%"
      strokeDasharray="3 1"
      stroke="#739675"
      strokeWidth={0.3}
    />
  );
}
