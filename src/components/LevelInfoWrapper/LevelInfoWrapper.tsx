import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMotionStyle } from "hooks";
import styles from "./LevelInfoWrapper.module.scss";

interface LevelInfoWrapperProps {
  children: ReactNode;
}
export const LevelInfoWrapper = ({ children }: LevelInfoWrapperProps) => {
  const { motionStyle } = useMotionStyle();

  return (
    <motion.div style={{ boxShadow: motionStyle.boxShadow }} className={styles.introWindow}>
      {children}
    </motion.div>
  );
};
