import { RefObject } from "react";
import { CoordinatePair, SVGDim } from "./types";

export default function getSVGDimensions(
  targetRef: RefObject<SVGSVGElement>
): SVGDim | undefined {
  const target = targetRef.current;
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const absMp: CoordinatePair = [
    rect.left + rect.width! / 2,
    rect.top + rect.height! / 2,
  ];
  const mp: CoordinatePair = [rect.width! / 2, rect.height! / 2];
  return { absMp, mp, rect };
}
