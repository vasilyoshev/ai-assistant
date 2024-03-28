import { Link } from "react-router-dom";
import { AnimatedButton } from "components";
import styles from "./HomeRoute.module.scss";

export const HomeRoute = () => (
  <div className={styles.wrapper}>
    <Link to="/find-the-differences">
      <AnimatedButton>Find the differences</AnimatedButton>
    </Link>
  </div>
);
