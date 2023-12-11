import styles from "./DiffPicture.module.scss";

export const DiffPicture = () => (
  <img
    src={process.env.PUBLIC_URL + "/mockImage.png"}
    alt="original"
    className={styles.image}
  />
);
