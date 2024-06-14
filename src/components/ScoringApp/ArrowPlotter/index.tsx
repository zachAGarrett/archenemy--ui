import styles from "./arrowPlotter.module.css";
import { useEffect, useRef, useState } from "react";
import { Arrow, ArrowPlotterProps, SVGDim } from "../lib/types";
import extractTouch from "../lib/extractTouch";
import mergeArrow from "../lib/mergeArrow";
import drawArrows from "../lib/drawArrows";
import getSVGDimensions from "../lib/getSVGDimensions";
import drawRings from "../lib/drawRings";
import drawGuideLine from "../lib/drawGuideLine";
import formatArrow from "../lib/formatArrow";
import { v4 as uuid } from "uuid";

export default function ArrowPlotter({
  target,
  focusedArrows,
  arrowState,
  activeArrowState,
  preventTouch,
  setPreviouslyActiveArrow,
}: ArrowPlotterProps) {
  const [arrows, setArrows] = arrowState;
  const [activeArrow, setActiveArrow] = activeArrowState;

  const [ringCount, setRingCount] = useState(target.rings);

  const targetRef = useRef<SVGSVGElement>(null);
  const [touchIsActive, setTouchIsActive] = useState(false);
  const [svgDimensions, setSvgDimensions] = useState<SVGDim>();
  useEffect(() => {
    setSvgDimensions(getSVGDimensions(targetRef));
  }, [targetRef]);

  return (
    <svg
      ref={targetRef}
      className={styles.main_canvas}
      viewBox="0 0 100 100"
      onTouchStart={(e) => {
        if (svgDimensions === undefined || preventTouch) return;
        const arrowId = activeArrow || uuid();
        setTouchIsActive(true);
        setActiveArrow(arrowId);
        const arrow = formatArrow({
          arrowCoordinatePair: extractTouch(e.touches),
          svgDimensions,
          target,
          id: arrowId,
        });
        setArrows(mergeArrow(arrow, arrows));
      }}
      onTouchMove={(e) => {
        if (!touchIsActive || !svgDimensions) return;
        const arrow = formatArrow({
          arrowCoordinatePair: extractTouch(e.touches),
          svgDimensions,
          target,
          id: activeArrow!,
        });
        setArrows(mergeArrow(arrow, arrows));
      }}
      onTouchEnd={() => {
        if (!touchIsActive || !svgDimensions) return;
        const arrow: Partial<Arrow> = {
          id: activeArrow!,
        };
        setArrows(mergeArrow(arrow, arrows));
        setTouchIsActive(false);
        setActiveArrow(undefined);
        setPreviouslyActiveArrow(arrow.id);
      }}
    >
      <circle />
      {drawRings(ringCount)}
      {touchIsActive &&
        svgDimensions &&
        drawGuideLine({
          svgDimensions,
          activeArrow: arrows?.find((arrow) => arrow.id === activeArrow!),
        })}
      {svgDimensions &&
        arrows &&
        drawArrows({
          svgDimensions,
          arrows,
          activeArrow,
          focusedArrows,
        })}
    </svg>
  );
}
