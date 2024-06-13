"use client"

import { Divider, Space } from "antd";
import ArrowPlotter from "./ArrowPlotter";
import { Arrow, ArrowPlotterProps } from "./lib/types";
import Scorecard from "./Scorecard";
import { useState,createContext } from "react";


const Arrows = createContext<Arrow[] | null>(null);

export default function ScoringApp() {
  const rules: ArrowPlotterProps["rules"] = { setSize: 3 };
  const target: ArrowPlotterProps["target"] = {
    radius: 66,
    rings: 10,
    max: 10,
    min: 0,
  };

  const arrowState = useState<Arrow[]>()
  const [focusedArrows, setFocusedArrows] = useState<number[]>();

  return (
    <Space>
      <ArrowPlotter {...{ rules, target, focusedArrows, arrowState }} />
      <Divider />
      {/* <Scorecard /> */}
    </Space>
  );
}
