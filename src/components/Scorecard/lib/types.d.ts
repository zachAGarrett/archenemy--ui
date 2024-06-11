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

export interface ScorecardProps {
  rules: Rules;
  target: Target;
}

export type CoordinatePair = [number, number];

export interface SVGDim {
  rect: DOMRect;
  absMp: CoordinatePair;
  mp: CoordinatePair;
}
