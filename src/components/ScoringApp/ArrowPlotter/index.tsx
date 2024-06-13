"use client";

import styles from "./arrowPlotter.module.css";
import { useEffect, useRef, useState } from "react";
import { Arrow, ArrowPlotterProps, CoordinatePair } from "../lib/types";
import extractTouch from "../lib/extractTouch";
import mergeArrow from "../lib/mergeArrow";
import drawArrows from "../lib/drawArrows";
import getSVGDimensions from "../lib/getSVGDimensions";
import drawRings from "../lib/drawRings";
import drawGuideLine from "../lib/drawGuideLine";
import formatArrows from "../lib/formatArrows";

export default function ArrowPlotter({
  rules,
  target,
  focusedArrows,
  arrowState,
}: ArrowPlotterProps) {
  const [arrows, setArrows] = arrowState;
  const [ringCount, setRingCount] = useState(target.rings);

  const targetRef = useRef<SVGSVGElement>(null);
  const boundaryRef = useRef<SVGCircleElement>(null);
  const [arrowCoordinatePairs, setArrowCoordinatePairs] =
    useState<CoordinatePair[]>();
  const [activeArrowKey, setActiveArrowKey] = useState<number>();
  const [touchIsActive, setTouchIsActive] = useState(false);
  const svgDimensions = getSVGDimensions(targetRef);

  useEffect(() => {
    const newArrows: Arrow[] | undefined =
      svgDimensions &&
      formatArrows({
        arrowCoordinatePairs,
        target,
        svgDimensions,
        activeArrowKey,
        focusedArrows,
      });

      setArrows(newArrows)
  }, []);

  return (
    <svg
      ref={targetRef}
      className={styles.main_canvas}
      viewBox="0 0 100 100"
      onTouchStart={(e) => {
        if (
          arrowCoordinatePairs &&
          arrowCoordinatePairs.length % rules.setSize === 0
        ) {
          console.log("prevent touch", activeArrowKey);
          return;
        }
        setTouchIsActive(true);
        setArrowCoordinatePairs((arrowCoordinatePairs) => {
          if (!arrowCoordinatePairs) {
            // first arrow
            return [extractTouch(e.touches)];
          }
          const merge = mergeArrow(
            arrowCoordinatePairs,
            extractTouch(e.touches),
            activeArrowKey!
          );
          return merge;
        });
      }}
      onTouchMove={(e) => {
        if (!touchIsActive) return;
        const merge = mergeArrow(
          arrowCoordinatePairs!,
          extractTouch(e.touches),
          activeArrowKey!
        );
        setArrowCoordinatePairs(merge);
      }}
      onTouchEnd={() => {
        if (touchIsActive) {
          setTouchIsActive(false);
          setActiveArrowKey(arrowCoordinatePairs!.length + 1);
        }
      }}
    >
      <circle ref={boundaryRef} />
      {drawRings(ringCount)}
      {touchIsActive &&
        svgDimensions &&
        drawGuideLine({
          svgDimensions,
          activeArrow: arrows?.find((arrow) => arrow.active),
        })}
      {svgDimensions &&
        arrows &&
        drawArrows({
          svgDimensions,
          arrows,
        })}
    </svg>
  );
}
