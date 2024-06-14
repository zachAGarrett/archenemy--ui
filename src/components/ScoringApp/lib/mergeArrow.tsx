import { Arrow } from "./types";

export default function mergeArrow(arrow: Partial<Arrow>, arrows: Arrow[]) {
  if (arrows.length === 0) {
    return [arrow];
  }
  const arrowIndex = arrows.findIndex(({ id }) => id === arrow.id);
  if (arrowIndex === -1) {
    return [...arrows, arrow];
  }
  const left = arrows!.slice(0, arrowIndex);
  const right = arrows!.slice(arrowIndex + 1);
  return [...left, { ...arrows[arrowIndex], ...arrow }, ...right];
}
