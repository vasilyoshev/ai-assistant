import { FunctionComponent } from "react";
import styles from "./DiffPicture.module.scss";

export const DiffPicture: FunctionComponent<{ src: string }> = ({ src }) => (
  <img
    src={src}
    alt="original"
    className={styles.image}
  />
);
