import { Dispatch, PointerEvent, SetStateAction } from "react";

export default function handleTouchMove(
  event: PointerEvent<HTMLCanvasElement>,
  touches: { [k: number]: PointerEvent<HTMLCanvasElement> } | null,
  setOngoingTouches: Dispatch<
    SetStateAction<{ [k: number]: PointerEvent<HTMLCanvasElement> } | null>
  >
) {
  const idx = event.pointerId;

  console.log(`continuing touch: idx =  ${idx}`);
  if (idx >= 0) {
    setOngoingTouches((s) =>
      s ? { ...s, [event.pointerId]: event } : { [event.pointerId]: event }
    );
  } else {
    console.log(`can't figure out which touch to continue: idx = ${idx}`);
  }
}
