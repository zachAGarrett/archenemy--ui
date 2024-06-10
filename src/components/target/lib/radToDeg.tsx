export default function radToDeg(radians: number) {
  const r = (radians * 180) / Math.PI;
  if (r < 0) return 360 + r;
  return r;
}
