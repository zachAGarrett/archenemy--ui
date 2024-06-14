import { useRef, useState, useCallback, useEffect } from "react";

export type UseConfirmationTimer = {
  start: (callback: () => void, duration: number) => void;
  cancel: () => void;
  active: boolean;
  duration: { remaining: number; total: number };
};

export default function useConfirmationTimer(): UseConfirmationTimer {
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const [active, setActive] = useState(false);
  const [remainingDuration, setRemainingDuration] = useState(0);
  const [startingDuration, setStartingDuration] = useState(1);
  const startTime = useRef<number | null>(null);
  const endTime = useRef<number | null>(null);

  const updateRemainingDuration = useCallback(() => {
    if (startTime.current !== null && endTime.current !== null) {
      const now = Date.now();
      const remaining = Math.max(endTime.current - now, 0);
      setRemainingDuration(remaining);
    }
  }, []);

  useEffect(() => {
    if (active) {
      const intervalId = setInterval(updateRemainingDuration, 100);
      return () => clearInterval(intervalId);
    }
  }, [active, updateRemainingDuration]);

  const start: UseConfirmationTimer["start"] = useCallback(
    (callback, duration) => {
      setStartingDuration(duration);
      if (timerId.current !== null) {
        clearTimeout(timerId.current);
      }

      const now = Date.now();
      startTime.current = now;
      endTime.current = now + duration;
      setRemainingDuration(duration);

      timerId.current = setTimeout(() => {
        callback();
        timerId.current = null;
        setActive(false);
        setRemainingDuration(0);
      }, duration);

      setActive(true);
    },
    []
  );

  const cancel: UseConfirmationTimer["cancel"] = useCallback(() => {
    if (timerId.current !== null) {
      clearTimeout(timerId.current);
      timerId.current = null;
      setActive(false);
      setRemainingDuration(0);
    }
  }, []);

  return {
    start,
    cancel,
    active,
    duration: {
      remaining: remainingDuration,
      total: startingDuration,
    },
  };
}
