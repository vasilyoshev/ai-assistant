import { Link } from "react-router-dom";
import { motion, useMotionTemplate } from "framer-motion";
import { AnimatedButton } from "components";
import { usePrimaryColor } from "utils";
import styles from "./HomeRoute.module.scss";

export const HomeRoute = () => {
  const colorMotionValue = usePrimaryColor();
  const textColor = useMotionTemplate`${colorMotionValue}`;

  return (
    <div className={styles.wrapper}>
      <span className={styles.name}>
        pl<motion.span style={{ color: textColor }}>AI</motion.span>box
      </span>
      <Link to="/classic">
        <AnimatedButton>Find the differences</AnimatedButton>
      </Link>
      <AnimatedButton>About</AnimatedButton>
    </div>
  );
};
