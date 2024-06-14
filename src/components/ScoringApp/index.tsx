"use client";

import {
  Card,
  Divider,
  Flex,
  List,
  Progress,
  ProgressProps,
  Space,
} from "antd";
import ArrowPlotter from "./ArrowPlotter";
import { Arrow, Rules, Target } from "./lib/types";
import { useMemo, useState } from "react";
import chunkArray from "./lib/chunkArray";
import Scorecard from "./Scorecard";
import useConfirmationTimer from "./lib/useConfirmationTimer";

export default function ScoringApp() {
  const rules: Rules = { setSize: 3 };
  const target: Target = {
    id: "test",
    radius: 66,
    rings: 10,
    max: 10,
    min: 0,
  };

  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [activeArrow, setActiveArrow] = useState<string>();
  const confirmationTimer = useConfirmationTimer();
  const [focusedArrows, setFocusedArrows] = useState<string[]>();

  const elapsedDurationPercent = useMemo(() => {
    return (
      (confirmationTimer.duration.remaining /
        confirmationTimer.duration.total) *
      100
    );
  }, [confirmationTimer.duration.remaining, confirmationTimer.duration.total]);

  return (
    <Flex vertical style={{ width: "100%", height: "100%" }}>
      <div style={{ height: "100%", marginInline: 10, marginTop: 10 }}>
        <ArrowPlotter
          target={target}
          focusedArrows={focusedArrows}
          arrowState={[arrows, setArrows]}
          activeArrowState={[activeArrow, setActiveArrow]}
          preventTouch={false}
          confirmationTimer={confirmationTimer}
          rules={rules}
        />
      </div>
      <Divider />
      <div style={{ height: "100%", margin: 10 }}>
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
