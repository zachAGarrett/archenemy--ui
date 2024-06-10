import { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "../../Button";
import { Target, Vector } from "../lib/types";
import styles from "./arrowCarousel.module.css";

interface Props {
  activeArrow: number;
  setActiveArrow: Dispatch<SetStateAction<number | null>>;
  arrows?: (Vector | undefined)[];
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  setNo: number;
  setSetNo: Dispatch<SetStateAction<number>>;
  setSize: number;
  setTouchIsActive: Dispatch<SetStateAction<boolean>>;
  target: Target;
}
const ArrowCarousel: FC<Props> = (props) => {
  const {
    activeArrow,
    setActiveArrow,
    arrows,
    offset,
    setOffset,
    setNo,
    setSetNo,
    setSize,
    setTouchIsActive,
    target,
  } = props;
  const curSetLim = setSize * setNo;
  const curSet = new Array(curSetLim).fill(null).map((_, i) => {
    const arrow = arrows ? arrows[i] : undefined;
    const isActive = i === activeArrow;
    const activeStyle = isActive ? styles.active : "";
    const activateArrow = () => {
      setActiveArrow(i + 1);
      setTouchIsActive(true);
    };
    if (!arrow)
      return (
        <div
          // onClick={activateArrow}
          className={`${styles.main_arrow} ${styles.empty} ${activeStyle}`}
          key={i}
        />
      );
    const arrowActual = target.rings + 1 - target.rings * arrow.distance;
    const arrowVal = Math.floor(arrowActual);
    return (
      <div
        onClick={activateArrow}
        className={`${styles.main_arrow} ${activeStyle}`}
        key={i}
      >
        {arrowVal > target.maxVal ? target.maxVal : arrowVal}
      </div>
    );
  });

  const buttonProps: {
    [k: string]: { disabled?: boolean; onClick: () => void; type?: "primary" };
  } = {
    confirmSet: {
      disabled: setNo * setSize > (arrows?.length || 0),
      onClick: () => setSetNo(setNo + 1),
      type: "primary",
    },
    offsetPlus: {
      onClick: () => {
        const t = offset - 1;
        setOffset(t);
        // if (t === 1 && arrows!.length < setNo * setSize) {
        setActiveArrow(arrows!.length + 1);
        // return;
        // }
      },
    },
  };
  return (
    <div className={styles.main}>
      <Button
        onClick={() => {
          if (offset >= setNo) return;
          setOffset(offset + 1);
          setActiveArrow(arrows!.length + 1);
        }}
        disabled={setNo * setSize === offset * setSize}
      >
        {"<"}
      </Button>
      {curSet?.slice(
        -(setSize * offset),
        offset > 1 ? -(setSize * offset) + setSize : undefined
      )}
      <Button {...buttonProps[offset > 1 ? "offsetPlus" : "confirmSet"]}>
        {offset > 1 ? ">" : "\u2713"}
      </Button>
    </div>
  );
};
export default ArrowCarousel;
