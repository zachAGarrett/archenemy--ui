"use client";

import { Card, Divider, Flex } from "antd";
import ArrowPlotter from "./ArrowPlotter";
import { Arrow, Rules, Target } from "./lib/types";
import { useEffect, useState } from "react";
import chunkArray from "./lib/chunkArray";
import Scorecard from "./Scorecard";
import useConfirmationTimer from "./lib/useConfirmationTimer";
import { Claims } from "@auth0/nextjs-auth0";
import useLocalStorage from "@/hooks/useLocalStorage";

export interface TrainingSessionProps {
  user?: Claims | null;
  rules: Rules;
  target: Target;
  initialArrows?: Arrow[];
}
export default function TrainingSession({
  user,
  rules,
  target,
  initialArrows = [],
}: TrainingSessionProps) {
  const [__, setCurrentStep] = useLocalStorage("currentStep", 0);
  const [_, setEditedSteps] = useLocalStorage<number[]>("editedSteps", []);
  const [arrows, setArrows] = useState<Arrow[]>(initialArrows);
  const [activeArrow, setActiveArrow] = useState<string>();
  const confirmationTimer = useConfirmationTimer();
  const [focusedArrows, setFocusedArrows] = useState<string[]>();
  useEffect(() => {
    setCurrentStep(0);
    setEditedSteps([]);
  }, []);

  return (
    <Flex vertical style={{ width: "100%", height: "100%" }}>
      <Card style={{ height: "100%", marginInline: 10 }}>
        <ArrowPlotter
          target={target}
          focusedArrows={focusedArrows}
          arrowState={[arrows, setArrows]}
          activeArrowState={[activeArrow, setActiveArrow]}
          preventTouch={false}
          confirmationTimer={confirmationTimer}
          rules={rules}
        />
      </Card>
      <Divider />
      <div style={{ height: "100%", paddingBottom: 10 }}>
        <Scorecard
          sets={arrows.length > 0 ? chunkArray(arrows, rules.setSize) : [[]]}
          target={target}
          activeArrowState={[activeArrow, setActiveArrow]}
          setFocusedArrows={setFocusedArrows}
        />
      </div>
    </Flex>
  );
}
