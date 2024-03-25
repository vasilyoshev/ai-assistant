import { Link } from "react-router-dom";
import { motion, useMotionTemplate } from "framer-motion";
import { AnimatedButton } from "components";
import { usePrimaryColor } from "utils";
import styles from "./HomeRoute.module.scss";

export const HomeRoute = () => {
  const colorMotionValue = usePrimaryColor();
  const textColor = useMotionTemplate`${colorMotionValue}`;

  const variants = {
    hidden: { opacity: 0, y: -50, x: -50 },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 1, delay: 0.5 } },
  };

  return (
    <div className={styles.wrapper}>
      <motion.span className={styles.name} variants={variants} initial="hidden" animate="visible">
        pl<motion.span style={{ color: textColor }}>AI</motion.span>box
      </motion.span>
      <Link to="/classic">
        <AnimatedButton>Find the differences</AnimatedButton>
      </Link>
      <AnimatedButton>About</AnimatedButton>
    </div>
  );
};
