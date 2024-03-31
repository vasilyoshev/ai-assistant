import { motion } from "framer-motion";
import { DevTools } from "components";
import { useMotionStyle } from "hooks";
import styles from "./LevelIntro.module.scss";

export const LevelIntro = () => {
  const { motionStyle } = useMotionStyle();

  return (
    <div className={styles.wrapper}>
      <motion.div style={{ boxShadow: motionStyle.boxShadow }} className={styles.introWindow}>
        LevelIntro
        <DevTools />
      </motion.div>
    </div>
  );
};
