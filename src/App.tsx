import { Route, Routes } from "react-router-dom";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ClassicRoute, HomeRoute } from "routes";
import { usePrimaryColor } from "utils";
import { Meteors } from "components";
import styles from "./App.module.scss";
import { useEffect } from "react";

export const App = () => {
  const colorMotionValue = usePrimaryColor();
  const gradientMotionValue = useMotionValue(0);
  const backgroundImage = useMotionTemplate`
    radial-gradient(
      ${gradientMotionValue}% 100% at 50% 30%, 
      #020617 60%, 
      ${colorMotionValue}
    )
  `;

  useEffect(() => {
    animate(gradientMotionValue, 150, {
      ease: "easeInOut",
      duration: 1,
    });
  }, []);

  return (
    <motion.div className={styles.wrapper} style={{ backgroundImage }}>
      <Routes>
        <Route path="/classic" element={<ClassicRoute />} />
        <Route path="/" element={<HomeRoute />} />
      </Routes>
      <Meteors number={20} />
    </motion.div>
  );
};
