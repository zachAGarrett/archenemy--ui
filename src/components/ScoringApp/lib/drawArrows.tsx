import { Arrow, CoordinatePair, SVGDim } from "./types";

export interface DrawArrowsProps {
  svgDimensions: SVGDim;
  arrows?: Arrow[];
}

export default function drawArrows({ svgDimensions, arrows }: DrawArrowsProps) {
  const focusAll = arrows?.every(({ focused }) => focused === undefined);
  return arrows?.map(({ active, coordinates, focused }, i) => {
    const x = coordinates[0];
    const y = coordinates[1];
    const relX = `${
      ((x - svgDimensions.rect.left) / svgDimensions.rect.width) * 100
    }%`;
    const relY = `${
      ((y - svgDimensions.rect.top) / svgDimensions.rect.height) * 100
    }%`;

    return (
      <g key={i}>
        <circle key={`${i}-b`} cx={relX} cy={relY} r={1} fill="white">
          {active && (
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
          opacity={focused || focusAll ? 1 : 0.3}
          stroke="black"
          strokeWidth={0.2}
        />
      </g>
    );
  });
}
