import { TouchList } from "react";
import { CoordinatePair } from "./types";

export default function extractTouch(touches: TouchList): CoordinatePair {
  // always selecting the first touch... fragile?
  const t = Object.values(touches)[0];
  const x = t.clientX;
  const y = t.clientY - 60;
  return [x, y];
}
