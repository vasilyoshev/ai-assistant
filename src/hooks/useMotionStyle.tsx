// useCustomStyles.ts
import { MotionStyle, useMotionTemplate } from "framer-motion";
import { usePrimaryColor } from "utils";

export const useMotionStyle = () => {
  const colorMotionValue = usePrimaryColor();
  const motionStyle: MotionStyle = {};

  motionStyle.color = useMotionTemplate`${colorMotionValue}`;
  motionStyle.boxShadow = useMotionTemplate`0 0 15px ${colorMotionValue}, 0 0 0 ${colorMotionValue}`;

  return { motionStyle };
};
