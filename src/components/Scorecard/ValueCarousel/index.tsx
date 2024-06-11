"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Target, Vector } from "../lib/types";
import { Tabs, Typography } from "antd";
import clamp from "../lib/clamp";
import chunkArray from "../lib/chunkArray";
import ArrowDetailTab from "./ArrowDetailTab";

const { Text } = Typography;

export interface ValueCarouselProps {
  activeArrow: number;
  setActiveArrow: Dispatch<SetStateAction<number | null>>;
  arrows?: (Vector | undefined)[];
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  setNumber: number;
  setSetNumber: Dispatch<SetStateAction<number>>;
  setSize: number;
  setTouchIsActive: Dispatch<SetStateAction<boolean>>;
  target: Target;
}

export interface ArrowData {
  angle: number;
  distance: number;
  value: number;
  isActive: boolean;
}

const ValueCarousel = ({
  activeArrow,
  setActiveArrow,
  arrows,
  offset,
  setOffset,
  setNumber,
  setSetNumber,
  setSize,
  setTouchIsActive,
  target,
}: ValueCarouselProps) => {
  const [sets, setSets] = useState<(ArrowData | null)[][]>();

  useEffect(() => {
    const currentSetLimit = setSize * setNumber;
    const arrowData: (ArrowData | null)[] = new Array(currentSetLimit)
      .fill(null)
      .map((_, i) => {
        const arrow = arrows ? arrows[i] : undefined;
        const isActive = i === activeArrow;
        if (!arrow) {
          return null;
        }
        const arrowActual = target.rings + 1 - target.rings * arrow.distance;
        const arrowValue = clamp(
          Math.floor(arrowActual),
          target.min,
          target.max
        );
        return { value: arrowValue, isActive, ...arrow };
      });
    setSets(chunkArray(arrowData, setSize));
  }, [arrows]);

  return (
    <Tabs
      type="editable-card"
      onTabClick={(key) => {
        setOffset(Number(key));
      }}
      hideAdd
      removeIcon
      tabPosition="left"
      items={sets?.map((set, setIndex) => {
        const setNumber = String(setIndex + 1);
        return {
          label: `Set ${setNumber}`,
          key: setNumber,
          children: (
            <Tabs
              activeKey={String((activeArrow || 0) + 1)}
              tabPosition="top"
              onTabClick={(key) => {
                setActiveArrow(setIndex * setSize + Number(key));
                setTouchIsActive(false);
              }}
              items={set.map((arrow, arrowIndex) => {
                const arrowNumber = String(arrowIndex + 1);
                if (arrow === null) {
                  return {
                    label: `Arrow ${arrowNumber}`,
                    key: arrowNumber,
                    children: <Text>Place an arrow</Text>,
                  };
                } else {
                  return {
                    disabled: arrow.value === null,
                    label: `Arrow ${arrowNumber}`,
                    key: arrowNumber,
                    children: <ArrowDetailTab {...{ arrow, target }} />,
                  };
                }
              })}
            />
          ),
        };
      })}
    />
  );
};
export default ValueCarousel;
