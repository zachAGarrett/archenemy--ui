"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { CoordinatePair, SVGDim, ScorecardProps, Vector } from "./lib/types";
import coordinatesToRadians from "./lib/coordinatesToRadians";
import styles from "./target.module.css";
import { Button, Divider, Space } from "antd";
import extractTouch from "./lib/extractTouch";
import mergeArrow from "./lib/mergeArrow";
import ValueCarousel from "./ValueCarousel";
import renderArrow from "./lib/renderArrow";
import drawRings from "./lib/drawRings";
import coordinatesToDistance from "./lib/coordinatesToDistance";

const Scorecard = ({ rules, target }: ScorecardProps) => {
  const [offset, setOffset] = useState(1);
  const [setSize, setSetSize] = useState(rules.setSize);
  const [setNumber, setSetNumber] = useState(1);
  const [ringCount, setRingCount] = useState(target.rings);

  const targetRef = useRef<SVGSVGElement>(null);
  const boundaryRef = useRef<SVGCircleElement>(null);
  const [arrows, setArrows] = useState<CoordinatePair[] | null>(null);
  // store the index of the active arrow
  const [activeArrow, setActiveArrow] = useState<number | null>(null);
  const [touchIsActive, setTouchIsActive] = useState(false);

  const getSVGDimensions = (): SVGDim | undefined => {
    const target = targetRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const absMp: CoordinatePair = [
      rect.left + rect.width! / 2,
      rect.top + rect.height! / 2,
    ];
    const mp: CoordinatePair = [rect.width! / 2, rect.height! / 2];
    return { absMp, mp, rect };
  };

  const coordinateToVector = (cp: CoordinatePair): Vector | undefined => {
    const x = cp[0];
    const y = cp[1];
    const svgDim = getSVGDimensions();
    if (!svgDim) return;
    const distance =
      // calculate distance from edge of arrow indicator dot
      ((coordinatesToDistance([x, y], svgDim.absMp) -
        0.01 * svgDim.rect.height) /
        svgDim.rect.height) *
      2;
    const angle = coordinatesToRadians([x, y], svgDim.absMp);
    return { distance, angle };
  };

  const setBoundary: [number, number] = [
    (setNumber - offset) * setSize,
    (setNumber - offset + 1) * setSize,
  ];
  const drawArrows = () => {
    const svgDim = getSVGDimensions();
    if (!svgDim) return;
    return arrows?.map((arrow, i) =>
      renderArrow({ svgDim, arrow, i, activeArrow, setBoundary })
    );
  };

  const drawGuideLine = () => {
    if (!touchIsActive) return;
    const svgDim = getSVGDimensions();
    if (!svgDim || !arrows) return;
    const key = activeArrow ? activeArrow - 1 : 0;
    const arrow = arrows[key];
    if (!arrow) return;
    const x = arrow[0];
    const y = arrow[1];
    const relX = `${((x - svgDim.rect.left) / svgDim.rect.width) * 100}%`;
    const relY = `${((y - svgDim.rect.top) / svgDim.rect.height) * 100}%`;
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
  };

  const confirmArrow = () => {
    setTouchIsActive(false);
    setActiveArrow(arrows!.length + 1);
  };

  useEffect(() => {
    if (!arrows) return;
    setActiveArrow(arrows.length);
  }, [arrows?.length]);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <svg
        ref={targetRef}
        className={styles.main_canvas}
        viewBox="0 0 100 100"
        onTouchStart={(e) => {
          setTouchIsActive(true);
          setArrows((s) => {
            if (!s) {
              // first arrow
              return [extractTouch(e.touches)];
            }
            const merge = mergeArrow(s, extractTouch(e.touches), activeArrow!);
            return merge;
          });
        }}
        onTouchMove={(e) => {
          if (!touchIsActive) return;
          const merge = mergeArrow(
            arrows!,
            extractTouch(e.touches),
            activeArrow!
          );
          setArrows(merge);
        }}
        onTouchEnd={() => touchIsActive && confirmArrow()}
      >
        <circle ref={boundaryRef} />
        {drawRings(ringCount)}
        {drawGuideLine()}
        {drawArrows()}
      </svg>
      <Divider type="horizontal" />
      <ValueCarousel
        activeArrow={activeArrow ? activeArrow - 1 : 0}
        arrows={
          arrows ? arrows.map((arrow) => coordinateToVector(arrow)) : undefined
        }
        {...{
          offset,
          setOffset,
          setNumber,
          setSize,
          setSetNumber,
          setActiveArrow,
          setTouchIsActive,
          target,
        }}
      />
    </Space>
  );
};

export default Scorecard;
