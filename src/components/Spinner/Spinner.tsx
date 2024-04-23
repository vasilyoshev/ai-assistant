import { useEffect, useState } from "react";
import { Transition, Variants, motion } from "framer-motion";
import { useMotionStyle } from "hooks";
import { useHealthCheckQuery } from "api";
import styles from "./Spinner.module.scss";

export const Spinner = () => {
  const { motionStyle } = useMotionStyle();

  const ContainerVariants: Variants = { animate: { transition: { staggerChildren: 0.2 } } };
  const { isSuccess: isHealthCheckSuccess } = useHealthCheckQuery();
  const [loadingPercentage, setLoadingPercentage] = useState(0);

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

  // If health check is successful, fill up to 100% in 17 seconds (estimated time to generate image)
  // If health check is unsuccessful, fill up to 100% in 30 seconds (estimated time to wake up backend)
  useEffect(() => {
    setLoadingPercentage(0);
    const generationTime = 17;
    const backendWakeUpTime = 30;
    const targetTime = isHealthCheckSuccess ? generationTime : backendWakeUpTime;
    const interval = setInterval(
      () => {
        setLoadingPercentage((prevPercentage) => {
          if (prevPercentage < 99) {
            return prevPercentage + 1;
          } else {
            clearInterval(interval);
            return prevPercentage;
          }
        });
      },
      (targetTime / 100) * 1000,
    );

    return () => clearInterval(interval);
  }, [isHealthCheckSuccess]);

  return (
    <div className={styles.wrapper}>
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
      <div>{(isHealthCheckSuccess ? "Generating image" : "Waking up backend") + ` (${loadingPercentage}%)`}</div>
    </div>
  );
};
