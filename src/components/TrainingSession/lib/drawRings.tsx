import getRingColor from "./getRingColor";

export default function drawRings(ringCount: number) {
  const rings = new Array(ringCount).fill(null).map((_, i) => {
    const ringDia = `${(((ringCount - i) / ringCount) * 100) / 2}%`;
    return (
      <circle
        key={i}
        cx="50%"
        cy="50%"
        r={ringDia}
        stroke="black"
        strokeWidth={0.1}
        fill={getRingColor(ringCount - i)}
      />
    );
  });
  return rings;
}
