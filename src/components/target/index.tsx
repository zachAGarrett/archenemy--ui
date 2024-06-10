"use client";

import { FC, TouchList, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ArrowCarousel from "./ArrowCarousel";
import { CoordinatePair, Vector } from "./lib/types";
import xyToDist from "./lib/xyToDist";
import xyToRad from "./lib/xyToRad";
import styles from "./target.module.css";
import { Button } from "antd";
import extractTouch from "./lib/extractTouch";
import getRingColor from "./lib/getRingColor";
import mergeArrow from "./lib/mergeArrow";

const Target = () => {
  const targetRef = useRef<SVGSVGElement>(null);
  const boundaryRef = useRef<SVGCircleElement>(null);
  const [ringCt, setRingCt] = useState(10);
  const [arrows, setArrows] = useState<CoordinatePair[] | null>(null);
  const [offset, setOffset] = useState(1);
  const [setSize, setSetSize] = useState(3);
  const [setNo, setSetNo] = useState(1);
  // store the index of the active arrow
  const [activeArrow, setActiveArrow] = useState<number | null>(null);
  const [touchIsActive, setTouchIsActive] = useState(false);

  const getSVGDim = ():
    | {
        rect: DOMRect;
        absMp: CoordinatePair;
        mp: CoordinatePair;
      }
    | undefined => {
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

  const xyToVector = (cp: CoordinatePair): Vector | undefined => {
    const x = cp[0];
    const y = cp[1];
    const svgDim = getSVGDim();
    if (!svgDim) return;
    const distance =
      // calculate distance from edge of arrow indicator dot
      ((xyToDist([x, y], svgDim.absMp) - 0.01 * svgDim.rect.height) /
        svgDim.rect.height) *
      2;
    const angle = xyToRad([x, y], svgDim.absMp);
    return { distance, angle };
  };

  const setBounds = [
    (setNo - offset) * setSize,
    (setNo - offset + 1) * setSize,
  ];
  const drawArrows = () => {
    const svgDim = getSVGDim();
    if (!svgDim) return;
    return arrows?.map((arrow, i) => {
      const k = i + 1;
      const isActive = k === activeArrow || !activeArrow;
      const isCurrentSet = k > setBounds[0] && k <= setBounds[1];
      const x = arrow[0];
      const y = arrow[1];
      const relX = `${((x - svgDim.rect.left) / svgDim.rect.width) * 100}%`;
      const relY = `${((y - svgDim.rect.top) / svgDim.rect.height) * 100}%`;
      return (
        <g key={i}>
          <circle key={`${i}-b`} cx={relX} cy={relY} r={1} fill="white">
            {isActive && (
              <>
                <animate
                  attributeType="SVG"
                  attributeName="r"
                  begin="0s"
                  dur="1.5s"
                  repeatCount="indefinite"
                  values="0.1;3;0.1"
                />
                <animate
                  attributeType="CSS"
                  attributeName="opacity"
                  begin="0s"
                  dur="1.5s"
                  repeatCount="indefinite"
                  values="1;0.5;1"
                />
              </>
            )}
          </circle>
          <circle
            key={`${i}-a`}
            cx={relX}
            cy={relY}
            r={1}
            fill="green"
            opacity={isCurrentSet ? 1 : 0.3}
            stroke="black"
            strokeWidth={0.2}
          />
        </g>
      );
    });
  };

  const drawRings = () => {
    const rings = new Array(ringCt).fill(null).map((_, i) => {
      const ringDia = `${(((ringCt - i) / ringCt) * 100) / 2}%`;
      return (
        <circle
          key={i}
          cx="50%"
          cy="50%"
          r={ringDia}
          stroke="black"
          strokeWidth={0.1}
          fill={getRingColor(ringCt - i)}
        />
      );
    });
    return rings;
  };

  const drawGuideLine = () => {
    if (!touchIsActive) return;
    const svgDim = getSVGDim();
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

  const isMobileView = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (!arrows) return;
    setActiveArrow(arrows.length);
  }, [arrows?.length]);

  return (
    <div className={styles.main}>
      {isMobileView && (
        <div className="hpad">
          <div className={styles.main_buttonRow}>
            <Button
              disabled={!touchIsActive}
              onTouchStart={() => confirmArrow()}
            >
              Confirm Arrow
            </Button>
          </div>
        </div>
      )}
      <svg
        ref={targetRef}
        className={styles.main_canvas}
        viewBox="0 0 100 100"
        onTouchStart={(e) => {
          if (activeArrow && activeArrow > setSize * setNo) return;
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
        {drawRings()}
        {drawGuideLine()}
        {drawArrows()}
      </svg>
      <div className="hpad">
        <ArrowCarousel
          activeArrow={activeArrow ? activeArrow - 1 : 0}
          target={{ rad: 66, rings: 10, maxVal: 10 }}
          arrows={arrows ? arrows.map((arrow) => xyToVector(arrow)) : undefined}
          {...{
            offset,
            setOffset,
            setNo,
            setSize,
            setSetNo,
            setActiveArrow,
            setTouchIsActive,
          }}
        />
      </div>
      {/* <div className="hpad">
        <Button>Details</Button>
      </div> */}
    </div>
  );
};

export default Target;
