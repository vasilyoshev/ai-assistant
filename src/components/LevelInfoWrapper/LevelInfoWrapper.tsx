import { ReactNode, Ref, forwardRef } from "react";
import { motion } from "framer-motion";
import { useMotionStyle } from "hooks";
import styles from "./LevelInfoWrapper.module.scss";

interface LevelInfoWrapperProps {
  children: ReactNode;
}
export const LevelInfoWrapper = forwardRef(({ children }: LevelInfoWrapperProps, ref: Ref<HTMLDivElement>) => {
  const { motionStyle } = useMotionStyle();

  return (
    <motion.div ref={ref} style={{ boxShadow: motionStyle.boxShadow }} className={styles.container}>
      {children}
    </motion.div>
  );
});
