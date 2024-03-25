import { Route, Routes } from "react-router-dom";
import { ClassicRoute, HomeRoute } from "routes";
import styles from "./App.module.scss";
import { useEffect } from "react";
import { useMotionValue, motion, animate, useMotionTemplate } from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const App = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    //stop animation in development since it's annoying af
    if (process.env.NODE_ENV === "development") return;

    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 100% at 50% 30%, #020617 50%, ${color})`;

  return (
    <motion.div
      className={styles.wrapper}
      style={{
        backgroundImage,
      }}
    >
      <Routes>
        <Route path="/classic" element={<ClassicRoute />} />
        <Route path="/" element={<HomeRoute />} />
      </Routes>
    </motion.div>
  );
};
