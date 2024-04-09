import { useEffect } from "react";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Meteors } from "components";
import { AppRouter, usePrimaryColor } from "utils";
import { backgroundColor, initialAnimationDelay } from "consts";
import styles from "./App.module.scss";

export const App = () => {
  const colorMotionValue = usePrimaryColor();
  const gradientMotionValue = useMotionValue(0);
  const backgroundImage = useMotionTemplate`
    radial-gradient(
      ${gradientMotionValue}% 80% at 50% 50%, 
      ${backgroundColor} 80%, 
      ${colorMotionValue}
    )
  `;

  useEffect(() => {
    animate(gradientMotionValue, 80, {
      ease: "easeInOut",
      duration: 0.5,
      delay: initialAnimationDelay,
    });
  }, []);

  return (
    <motion.div className={styles.wrapper} style={{ backgroundImage }}>
      <AppRouter />
      <Meteors number={20} />
    </motion.div>
  );
};
