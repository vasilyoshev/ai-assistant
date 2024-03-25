import { Route, Routes } from "react-router-dom";
import { motion, useMotionTemplate } from "framer-motion";
import { ClassicRoute, HomeRoute } from "routes";
import { usePrimaryColor } from "utils";
import styles from "./App.module.scss";

export const App = () => {
  const colorMotionValue = usePrimaryColor();
  const backgroundImage = useMotionTemplate`radial-gradient(125% 100% at 50% 30%, #020617 50%, ${colorMotionValue})`;

  return (
    <motion.div className={styles.wrapper} style={{ backgroundImage }}>
      <Routes>
        <Route path="/classic" element={<ClassicRoute />} />
        <Route path="/" element={<HomeRoute />} />
      </Routes>
    </motion.div>
  );
};
