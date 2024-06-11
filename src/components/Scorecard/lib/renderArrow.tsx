import { CoordinatePair, SVGDim } from "./types";

export interface RenderArrowProps {
  svgDim: SVGDim;
  setBoundary: [number, number];
  activeArrow: number | null;
  arrow: CoordinatePair;
  i: number;
}

export default function renderArrow({
  svgDim,
  setBoundary,
  activeArrow,
  arrow,
  i,
}: RenderArrowProps) {
  const k = i + 1;
  const isActive = k === activeArrow || !activeArrow;
  const isCurrentSet = k > setBoundary[0] && k <= setBoundary[1];
  const x = arrow[0];
  const y = arrow[1];
  const relX = `${((x - svgDim.rect.left) / svgDim.rect.width) * 100}%`;
  const relY = `${((y - svgDim.rect.top) / svgDim.rect.height) * 100}%`;
  return (
    <g key={i}>
      <circle key={`${i}-b`} cx={relX} cy={relY} r={1} fill="white">
        {isActive && (
          <>
            <animate
              attributeType="SVG"
              attributeName="r"
              begin="0s"
              dur="1.5s"
              repeatCount="indefinite"
              values="0.1;3;0.1"
            />
            <animate
              attributeType="CSS"
              attributeName="opacity"
              begin="0s"
              dur="1.5s"
              repeatCount="indefinite"
              values="1;0.5;1"
            />
          </>
        )}
      </circle>
      <circle
        key={`${i}-a`}
        cx={relX}
        cy={relY}
        r={1}
        fill="green"
        opacity={isCurrentSet ? 1 : 0.3}
        stroke="black"
        strokeWidth={0.2}
      />
    </g>
  );
}
