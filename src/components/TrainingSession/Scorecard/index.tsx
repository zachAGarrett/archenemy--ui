import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActiveArrowState, Set, Target } from "../lib/types";
import { Button, Card, Flex, Tabs, message } from "antd";
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
  const [messageApi, contextHolder] = message.useMessage();
  const notification = (content: string) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

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

  const showConfirmSetButton = Number(activeSet) !== lastSetNumber;

  return (
    <>
      {contextHolder}
      <Tabs
        tabPosition="left"
        style={{ height: "100%" }}
        activeKey={String(activeSet) || String(lastSetNumber)}
        onTabClick={(key) => {
          setActiveSet(key);
          setActiveArrow(sets[Number(key)][0]?.id);
        }}
        defaultActiveKey="0"
        items={sets.map((set, setIndex) => {
          const setNumber = setIndex + 1;
          return {
            label: `Set ${setNumber}`,
            key: String(setIndex),
            children: (
              <Flex
                vertical
                style={{ height: "100%", paddingRight: 10 }}
                gap={10}
              >
                {set.length > 0 ? (
                  <Tabs
                    activeKey={activeArrow || lastArrow.id}
                    tabPosition="top"
                    onTabClick={(key) => setActiveArrow(key)}
                    items={set.map((arrow, arrowIndex) => {
                      const arrowNumber = String(arrowIndex + 1);
                      return {
                        label: `Arrow ${arrowNumber}`,
                        key: arrow.id,
                        children: (
                          <ArrowDetailTab arrow={arrow} target={target} />
                        ),
                      };
                    })}
                  />
                ) : (
                  <Card>Place your first arrow</Card>
                )}
                {showConfirmSetButton && (
                  <Button
                    onClick={() => {
                      setActiveSet(String(lastSetNumber));
                      setActiveArrow(sets[lastSetNumber][0]?.id);
                      notification("Set updated");
                    }}
                    type="primary"
                  >
                    Confirm set
                  </Button>
                )}
              </Flex>
            ),
          };
        })}
      />
    </>
  );
}
