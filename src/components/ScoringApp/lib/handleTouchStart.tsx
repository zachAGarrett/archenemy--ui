import { Dispatch, PointerEvent, SetStateAction } from "react";

export default function handleTouchStart(
  event: PointerEvent<HTMLCanvasElement>,
  setOngoingTouches: Dispatch<
    SetStateAction<{ [k: number]: PointerEvent<HTMLCanvasElement> } | null>
  >
) {
  setOngoingTouches((s) =>
    s ? { ...s, [event.pointerId]: event } : { [event.pointerId]: event }
  );
}
