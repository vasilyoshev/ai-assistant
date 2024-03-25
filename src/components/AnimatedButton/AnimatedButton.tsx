import { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./AnimatedButton.module.scss";

export const AnimatedButton = ({ children }: { children: ReactNode }) => (
  <motion.button className={styles.button} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
    <span>{children}</span>
  </motion.button>
);
