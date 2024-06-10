import { FC } from "react";
import styles from "./carouselContext.module.css";

interface Props {
  offset: number;
  setNo: number;
}
const CarouselContext: FC<Props> = (props) => {
  const { offset, setNo } = props;
  return (
    <div className={styles.main}>
      <p>{`Current set number : ${setNo} `}</p>
      {offset > 1 && (
        <p>{`Inspecting set number : ${(setNo || 1) + 1 - (offset || 1)}`}</p>
      )}
    </div>
  );
};

export default CarouselContext;
