import { Link } from "react-router-dom";
import { Variants, motion, useMotionTemplate } from "framer-motion";
import { AnimatedButton } from "components";
import { usePrimaryColor } from "utils";
import styles from "./HomeRoute.module.scss";

export const HomeRoute = () => {
  const colorMotionValue = usePrimaryColor();
  const textColor = useMotionTemplate`${colorMotionValue}`;

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.4 } },
  };

  return (
    <div className={styles.wrapper}>
      <motion.span className={styles.name} variants={variants} initial="hidden" animate="visible">
        pl<motion.span style={{ color: textColor }}>AI</motion.span>box
      </motion.span>
      <Link to="/classic">
        <AnimatedButton variants={variants}>Find the differences</AnimatedButton>
      </Link>
      <AnimatedButton variants={variants}>About</AnimatedButton>
    </div>
  );
};
