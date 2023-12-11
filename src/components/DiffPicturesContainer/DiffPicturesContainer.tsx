import { DiffPicture, InpaintMask } from "components";
import styles from "./DiffPicturesContainer.module.scss";

export const DiffPicturesContainer = () => (
  <div className={styles.wrapper}>
    <DiffPicture />
    <InpaintMask />
  </div>
);
