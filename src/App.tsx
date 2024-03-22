import { Route, Routes } from "react-router-dom";
import { ClassicRoute, HomeRoute } from "routes";
import styles from "./App.module.scss";

export const App = () => (
  <div className={styles.wrapper}>
    <Routes>
      <Route path="/classic" element={<ClassicRoute />} />
      <Route path="/" element={<HomeRoute />} />
    </Routes>
  </div>
);
