"use client";

import { Divider, Flex } from "antd";
import ArrowPlotter from "./ArrowPlotter";
import { Arrow, Rules, Target } from "./lib/types";
import { useState } from "react";
import chunkArray from "./lib/chunkArray";
import Scorecard from "./Scorecard";
import useConfirmationTimer from "./lib/useConfirmationTimer";
import { Claims } from "@auth0/nextjs-auth0";

export default function ScoringApp({ user }: { user?: Claims | null }) {
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
  return (
    <Flex vertical style={{ width: "100%", height: "100%" }}>
      <Flex style={{ height: "100%", marginInline: 10, marginTop: 10 }}>
        <ArrowPlotter
          target={target}
          focusedArrows={focusedArrows}
          arrowState={[arrows, setArrows]}
          activeArrowState={[activeArrow, setActiveArrow]}
          preventTouch={false}
          confirmationTimer={confirmationTimer}
          rules={rules}
        />
      </Flex>
      <Divider />
      <div style={{ height: "100%" }}>
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
