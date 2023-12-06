import Paper from "@mui/material/Paper";
import styles from "./DiffPicture.module.scss";

export const PictureContainer = () => (
  <Paper elevation={0}>
    <img
      src={process.env.PUBLIC_URL + "/mockImage.png"}
      alt="original"
      className={styles.image}
    />
  </Paper>
);
