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
  const [activeArrowId, setActiveArrowId] = activeArrowState;

  const [ringCount, setRingCount] = useState(target.rings);

  const targetRef = useRef<SVGSVGElement>(null);
  const [touchIsActive, setTouchIsActive] = useState(false);
  const [svgDimensions, setSvgDimensions] = useState<SVGDim>();
  const [messageApi, contextHolder] = message.useMessage();
  const notification = (content: string) => {
    messageApi.open({
      type: "success",
      content,
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
          const arrowId = activeArrowId || uuid();
          setTouchIsActive(true);
          setActiveArrowId(arrowId);
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
            id: activeArrowId!,
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
            arrows.findIndex((arrow) => arrow.id === activeArrowId);
          const lastArrowIsEmpty =
            !arrows[arrows.length - 1].vector ||
            arrows[arrows.length - 1].value === undefined;
          const arrowToActivate: Partial<Arrow> = {
            id: activeArrowIsInLastSet
              ? lastArrowIsEmpty
                ? arrows[arrows.length - 1].id
                : uuid()
              : activeArrowId,
          };
          setTouchIsActive(false);
          confirmationTimer.start(() => {
            const activeArrowIsLastArrow =
              arrows[arrows.length - 1].id === activeArrowId;

            const activeArrowIsLastArrowInSet =
              activeArrowIsLastArrow && arrows.length % rules.setSize === 0;

            !lastArrowIsEmpty && setArrows(mergeArrow(arrowToActivate, arrows));
            const activeArrow = arrows.find(({ id }) => id === activeArrowId);
            notification(
              `Arrow ${activeArrowIsLastArrow ? "added" : "updated"}${
                activeArrow && activeArrow.value !== undefined
                  ? ": " + activeArrow.value
                  : ""
              }`
            );
            setActiveArrowId(arrowToActivate.id);

            activeArrowIsLastArrowInSet && notification("Set complete");
          }, 1000);
        }}
      >
        <circle />
        {drawRings(ringCount)}
        {touchIsActive &&
          svgDimensions &&
          drawGuideLine({
            svgDimensions,
            activeArrow: arrows?.find((arrow) => arrow.id === activeArrowId!),
          })}
        {svgDimensions &&
          arrows &&
          drawArrows({
            svgDimensions,
            arrows,
            activeArrow: activeArrowId,
            focusedArrows,
            confirmationTimer,
          })}
      </svg>
    </>
  );
}
