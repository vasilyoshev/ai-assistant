import { ReactNode } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { usePrimaryColor } from "utils";
import styles from "./AnimatedButton.module.scss";

export const AnimatedButton = ({ children }: { children: ReactNode }) => {
  const colorMotionValue = usePrimaryColor();
  const boxShadow = useMotionTemplate`0 0 50px ${colorMotionValue}, 0 0 0 ${colorMotionValue}`;
  const color = useMotionTemplate`${colorMotionValue}`;

  return (
    <motion.button
      className={styles.button}
      style={{ boxShadow }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span className={styles.text} style={{ color }}>
        {children}
      </motion.span>
    </motion.button>
  );
};
