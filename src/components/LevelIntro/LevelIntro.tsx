import { motion, useMotionTemplate } from "framer-motion";
import { usePrimaryColor } from "utils";
import { DevTools } from "components";
import styles from "./LevelIntro.module.scss";

export const LevelIntro = () => {
  const colorMotionValue = usePrimaryColor();
  const boxShadow = useMotionTemplate`0 0 50px ${colorMotionValue}, 0 0 0 ${colorMotionValue}`;
  const color = useMotionTemplate`${colorMotionValue}`;

  return (
    <div className={styles.wrapper}>
      <motion.div style={{ boxShadow, color }} className={styles.introWindow}>
        LevelIntro
        <DevTools />
      </motion.div>
    </div>
  );
};
