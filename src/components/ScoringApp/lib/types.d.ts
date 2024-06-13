export interface Vector {
  angle: number;
  distance: number;
}
export interface Target {
  radius: number;
  rings: number;
  max: number;
  min: number;
}

export interface Rules {
  setSize: number;
}

export interface ArrowPlotterProps {
  rules: Rules;
  target: Target;
  focusedArrows?: number[];
  preventTouch?: boolean;
  arrowState: ArrowState;
}

export type ArrowState = [
  Arrow[] | undefined,
  Dispatch<SetStateAction<Arrow[] | undefined>>
];

export type CoordinatePair = [number, number];

export interface SVGDim {
  rect: DOMRect;
  absMp: CoordinatePair;
  mp: CoordinatePair;
}

export interface Arrow {
  value: number;
  active: boolean;
  focused?: boolean;
  coordinates: CoordinatePair;
  vector: Vector;
}

export type Set = (Arrow | null)[];
