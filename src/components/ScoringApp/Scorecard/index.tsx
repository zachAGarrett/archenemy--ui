"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Arrow, Target, Vector } from "../lib/types";
import { Tabs, Typography } from "antd";
import clamp from "../lib/clamp";
import chunkArray from "../lib/chunkArray";
import ArrowDetailTab from "./ArrowDetailTab";

const { Text } = Typography;

export interface ScorecardProps {
  activeArrow: number;
  setActiveArrow: Dispatch<SetStateAction<number | null>>;
  arrows?: Arrow[];
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  setNumber: number;
  setSetNumber: Dispatch<SetStateAction<number>>;
  setSize: number;
  setTouchIsActive: Dispatch<SetStateAction<boolean>>;
  target: Target;
}

export default function Scorecard({
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
}: ScorecardProps) {
  const [sets, setSets] = useState<(Arrow | null)[][]>();

  useEffect(() => {
    if (arrows === undefined) return;
    setSets(chunkArray(arrows, setSize));
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
                    disabled: true,
                    label: `Arrow ${arrowNumber}`,
                    key: arrowNumber,
                    children: <Text>Place an arrow</Text>,
                  };
                } else {
                  return {
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
}
