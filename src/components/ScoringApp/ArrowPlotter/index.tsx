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
import { message } from "antd";

export default function ArrowPlotter({
  target,
  focusedArrows,
  arrowState,
  activeArrowState,
  preventTouch,
  confirmationTimer,
  rules,
}: ArrowPlotterProps) {
  const [arrows, setArrows] = arrowState;
  const [activeArrow, setActiveArrow] = activeArrowState;

  const [ringCount, setRingCount] = useState(target.rings);

  const targetRef = useRef<SVGSVGElement>(null);
  const [touchIsActive, setTouchIsActive] = useState(false);
  const [svgDimensions, setSvgDimensions] = useState<SVGDim>();
  const [messageApi, contextHolder] = message.useMessage();
  const arrowAdded = () => {
    messageApi.open({
      type: "success",
      content: "Arrow added",
    });
  };
  const arrowUpdated = () => {
    messageApi.open({
      type: "success",
      content: "Arrow updated",
    });
  };
  useEffect(() => {
    setSvgDimensions(getSVGDimensions(targetRef));
  }, [targetRef]);

  return (
    <>
      {contextHolder}
      <svg
        ref={targetRef}
        className={styles.main_canvas}
        viewBox="0 0 100 100"
        onTouchStart={(e) => {
          if (svgDimensions === undefined || preventTouch) return;
          if (confirmationTimer.active) {
            confirmationTimer.cancel();
          }
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

          // determine which arrow to activate
          const arrowsInLastSet =
            arrows.length % rules.setSize === 0
              ? 3
              : arrows.length % rules.setSize;
          const activeArrowIsInLastSet =
            arrows.length - arrowsInLastSet <=
            arrows.findIndex((arrow) => arrow.id === activeArrow);
          const lastArrowIsEmpty =
            !arrows[arrows.length - 1].vector ||
            arrows[arrows.length - 1].value === undefined;
          const arrowToActivate: Partial<Arrow> = {
            id: activeArrowIsInLastSet
              ? lastArrowIsEmpty
                ? arrows[arrows.length - 1].id
                : uuid()
              : activeArrow,
          };
          setTouchIsActive(false);
          confirmationTimer.start(() => {
            const activeArrowIsLastArrow =
              arrows[arrows.length - 1].id === activeArrow;
            !lastArrowIsEmpty && setArrows(mergeArrow(arrowToActivate, arrows));
            setActiveArrow(arrowToActivate.id);
            activeArrowIsLastArrow ? arrowAdded() : arrowUpdated();
          }, 1000);
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
            confirmationTimer,
          })}
      </svg>
    </>
  );
}
