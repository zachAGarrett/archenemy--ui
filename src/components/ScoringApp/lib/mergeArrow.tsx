import extractTouch from "./extractTouch";

export default function mergeArrow(
  arrows: ReturnType<typeof extractTouch>[],
  arrow: ReturnType<typeof extractTouch>,
  index: number
) {
  const left = arrows!.slice(0, index - 1);
  const right = arrows!.slice(index);
  return [...left, arrow, ...right];
}
