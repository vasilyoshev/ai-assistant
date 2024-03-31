// TODO describe context usage in readme
import { createContext, useContext, useEffect, ReactNode } from "react";
import { useMotionValue, animate, MotionValue } from "framer-motion";

const PrimaryColorContext = createContext<MotionValue<string>>(null);
const COLORS_TOP = ["#454ADE", "#B00772", "#E05200", "#F4B02A", "#306B34"];

export const usePrimaryColor = () => useContext(PrimaryColorContext);

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const colorMotionValue = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    // stop animation in development due to dev tools problems
    if (process.env.NODE_ENV === "development") return;

    animate(colorMotionValue, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  return <PrimaryColorContext.Provider value={colorMotionValue}>{children}</PrimaryColorContext.Provider>;
};
