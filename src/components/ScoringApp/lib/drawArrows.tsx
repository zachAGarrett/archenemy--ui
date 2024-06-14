import { Arrow, SVGDim } from "./types";
import { UseConfirmationTimer } from "./useConfirmationTimer";

export interface DrawArrowsProps {
  svgDimensions: SVGDim;
  arrows?: Partial<Arrow>[];
  focusedArrows?: string[];
  activeArrow?: string;
  confirmationTimer: UseConfirmationTimer;
}

export default function drawArrows({
  svgDimensions,
  arrows,
  focusedArrows,
  activeArrow,
  confirmationTimer,
}: DrawArrowsProps) {
  const focusAll = !focusedArrows;
  return arrows?.map(({ coordinates, id }, i) => {
    if (!coordinates) return;
    const x = coordinates[0];
    const y = coordinates[1];
    const relX = `${
      ((x - svgDimensions.rect.left) / svgDimensions.rect.width) * 100
    }%`;
    const relY = `${
      ((y - svgDimensions.rect.top) / svgDimensions.rect.height) * 100
    }%`;

    const activeArrowAnimationProps = {
      radius: {
        dur: "1.5s",
        repeatCount: "indefinite",
        values: "0.1;3;0.1",
      },
      opacity: {
        dur: "1.5s",
        repeatCount: "indefinite",
        values: "1;0.5;1",
      },
    };

    return (
      <g key={i}>
        <circle key={`${i}-b`} cx={relX} cy={relY} r={1} fill="white">
          {id === activeArrow && (
            <>
              <animate
                attributeType="SVG"
                attributeName="r"
                begin="0s"
                {...activeArrowAnimationProps.radius}
              />
              <animate
                attributeType="CSS"
                attributeName="opacity"
                begin="0s"
                {...activeArrowAnimationProps.opacity}
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
          opacity={focusedArrows?.includes(id!) || focusAll ? 1 : 0.3}
          stroke="black"
          strokeWidth={0.2}
        />
      </g>
    );
  });
}
