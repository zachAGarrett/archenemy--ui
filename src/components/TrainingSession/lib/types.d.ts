import { UseConfirmationTimer } from "./useConfirmationTimer";

export interface Vector {
  angle: number;
  distance: number;
}
export interface Target {
  id: string;
  radius: number;
  rings: number;
  max: number;
  min: number;
}

export interface Rules {
  setSize: number;
}

export interface ArrowPlotterProps {
  target: Target;
  focusedArrows?: string[];
  preventTouch?: boolean;
  arrowState: ArrowState;
  activeArrowState: ActiveArrowState;
  confirmationTimer: UseConfirmationTimer;
  rules: Rules
}

export type ArrowState = [
  Arrow[],
  Dispatch<SetStateAction<Arrow[] | undefined>>
];
export type ActiveArrowState = [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>
];

export type CoordinatePair = [number, number];

export interface SVGDim {
  rect: DOMRect;
  absMp: CoordinatePair;
  mp: CoordinatePair;
}

export interface Arrow {
  value: number;
  coordinates: CoordinatePair;
  vector: Vector;
  id: string;
}

export type Set = Arrow[];
