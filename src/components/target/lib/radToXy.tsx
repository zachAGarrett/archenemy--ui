export default function radToXy(radians: number): [number, number] {
  const x = Math.cos(radians);
  const y = Math.sin(radians);
  return [x, y];
}
