import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActiveArrowState, Set, Target } from "../lib/types";
import { Tabs } from "antd";
import ArrowDetailTab from "./ArrowDetailTab";

export interface ScorecardProps {
  sets: Set[];
  target: Target;
  activeArrowState: ActiveArrowState;
  setFocusedArrows: Dispatch<SetStateAction<string[] | undefined>>;
}

export default function Scorecard({
  sets,
  target,
  activeArrowState,
  setFocusedArrows,
}: ScorecardProps) {
  const [activeArrow, setActiveArrow] = activeArrowState;
  const lastSetNumber = sets.length - 1;
  const lastSet = sets[lastSetNumber];
  const lastArrow = lastSet && lastSet[lastSet.length - 1];
  const [activeSet, setActiveSet] = useState<string>();

  useEffect(() => {
    const setContainingActiveArrow = sets.findIndex((set) =>
      set.some((arrow) => arrow.id === activeArrow)
    );
    setActiveSet(String(setContainingActiveArrow));
  }, [activeArrow]);
  useEffect(() => {
    activeSet &&
      sets.length > 0 &&
      setFocusedArrows(sets[Number(activeSet)]?.map((arrow) => arrow.id));
  }, [activeSet, activeArrow]);

  return (
    <Tabs
      tabPosition="left"
      style={{ height: "100%" }}
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
  );
}
