import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActiveArrowState, Arrow, Set, Target } from "../lib/types";
import { Card, Tabs, Typography } from "antd";
import ArrowDetailTab from "./ArrowDetailTab";

const { Text } = Typography;

export interface ScorecardProps {
  sets: Set[];
  target: Target;
  activeArrowState: ActiveArrowState;
}

export default function Scorecard({
  sets,
  target,
  activeArrowState,
}: ScorecardProps) {
  const [activeArrow, setActiveArrow] = activeArrowState;
  const lastSetNumber = sets.length - 1;
  const lastSet = sets[lastSetNumber];
  const lastArrow = lastSet && lastSet[lastSet.length - 1];
  const [activeSet, setActiveSet] = useState<string>();

  return sets.length > 0 ? (
    <Tabs
      tabPosition="left"
      activeKey={activeSet || String(lastSetNumber)}
      onTabClick={(key) => {
        setActiveSet(key);
        setActiveArrow(sets[Number(key)][0].id);
      }}
      items={sets.map((set, setIndex) => {
        const setNumber = setIndex + 1;
        return {
          label: `Set ${setNumber}`,
          key: String(setIndex),
          children: (
            <Tabs
              activeKey={activeArrow || lastArrow.id}
              tabPosition="top"
              onTabClick={(key) => setActiveArrow(key)}
              items={set.map((arrow, arrowIndex) => {
                const arrowNumber = String(arrowIndex + 1);
                return {
                  label: `Arrow ${arrowNumber}`,
                  key: arrow.id,
                  children: <ArrowDetailTab arrow={arrow} target={target} />,
                };
              })}
            />
          ),
        };
      })}
    />
  ) : (
    <Card>Tap to place an arrow</Card>
  );
}
