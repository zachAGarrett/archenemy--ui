"use client";

import { Card, Divider, List, Space } from "antd";
import ArrowPlotter from "./ArrowPlotter";
import { Arrow, Rules, Target } from "./lib/types";
import { useState } from "react";
import chunkArray from "./lib/chunkArray";
import Scorecard from "./Scorecard";

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
  const [previouslyActiveArrow, setPreviouslyActiveArrow] = useState<string>();
  const [focusedArrows, setFocusedArrows] = useState<string[]>();

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <ArrowPlotter
        target={target}
        focusedArrows={focusedArrows}
        arrowState={[arrows, setArrows]}
        activeArrowState={[activeArrow, setActiveArrow]}
        setPreviouslyActiveArrow={setPreviouslyActiveArrow}
        preventTouch={false}
      />
      <Scorecard
        sets={arrows && chunkArray(arrows, rules.setSize)}
        target={target}
        activeArrowState={[activeArrow, setActiveArrow]}
      />
    </Space>
  );
}
