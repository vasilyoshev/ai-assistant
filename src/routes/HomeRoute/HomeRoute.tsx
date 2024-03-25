import { Link } from "react-router-dom";
import styles from "./HomeRoute.module.scss";
import { AnimatedButton } from "components";

export const HomeRoute = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.name}>plAIbox</span>
      <Link to="/classic">
        <AnimatedButton>Find the differences</AnimatedButton>
      </Link>
      <AnimatedButton>About</AnimatedButton>
    </div>
  );
};
