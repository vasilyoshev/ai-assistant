import { Transition, Variants, motion } from "framer-motion";
import { useMotionStyle } from "hooks";
import styles from "./Spinner.module.scss";

export const Spinner = () => {
  const { motionStyle } = useMotionStyle();

  const ContainerVariants: Variants = { animate: { transition: { staggerChildren: 0.2 } } };
  const DotVariants: Variants = {
    initial: { y: "0%" },
    animate: { y: "100%" },
  };
  const DotTransition: Transition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  };

  return (
    <motion.div className={styles.loadingContainer} variants={ContainerVariants} initial="initial" animate="animate">
      <motion.span
        className={styles.loadingDot}
        style={{ backgroundColor: motionStyle.color }}
        variants={DotVariants}
        transition={DotTransition}
      />
      <motion.span
        className={styles.loadingDot}
        style={{ backgroundColor: motionStyle.color }}
        variants={DotVariants}
        transition={DotTransition}
      />
      <motion.span
        className={styles.loadingDot}
        style={{ backgroundColor: motionStyle.color }}
        variants={DotVariants}
        transition={DotTransition}
      />
    </motion.div>
  );
};
