import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMotionStyle } from "hooks";
import styles from "./AnimatedButton.module.scss";

export const AnimatedButton = ({ children }: { children: ReactNode }) => {
  const { motionStyle } = useMotionStyle();

  return (
    <motion.button
      className={styles.button}
      style={{ ...motionStyle }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial="hidden"
      animate="visible"
    >
      <motion.span className={styles.text}>{children}</motion.span>
    </motion.button>
  );
};
