import { DiffPicturesContainer, PictureInfo } from "components";
import styles from "./App.module.scss";

export const App = () => (
  <div className={styles.wrapper}>
    <DiffPicturesContainer />
    <PictureInfo />
  </div>
);
