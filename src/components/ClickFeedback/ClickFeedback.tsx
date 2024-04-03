import { useEffect, useState } from "react";
import { AnimationPlaybackControls, AnimationScope, animate, motion, useAnimate, useMotionValue } from "framer-motion";
import styles from "./ClickFeedback.module.scss";

interface ClickFeedbackProps {
  isCorrect: boolean;
  cursorPosition: { x: number; y: number };
}
export const ClickFeedback = ({ isCorrect, cursorPosition }: ClickFeedbackProps) => {
  const [scope, animate] = useAnimate<SVGPathElement>();
  const cursorOpacity = useMotionValue(0);
  const cursorPathLength = useMotionValue(0);
  const [ongoingAnimations, setOngoingAnimations] = useState<AnimationPlaybackControls[]>([]);

  const svgSize = 100;
  const svgStyle = {
    top: cursorPosition?.y - svgSize / 2,
    left: cursorPosition?.x - svgSize / 2,
    height: svgSize,
    width: svgSize,
  };
  const pathStyle = {
    opacity: cursorOpacity,
    pathLength: cursorPathLength,
    stroke: isCorrect ? "green" : "red",
  };

  const cursorAnimation = () => {
    ongoingAnimations.forEach((animation) => animation.cancel());
    setOngoingAnimations([]);

    cursorOpacity.set(1);
    cursorPathLength.set(0);

    const pathLengthAnimation = animate(cursorPathLength, 1, { duration: 0.5 });
    const opacityAnimation = animate(cursorOpacity, 0, { duration: 0.5, delay: 0.5 });

    setOngoingAnimations([pathLengthAnimation, opacityAnimation]);
  };

  useEffect(() => {
    if (cursorPosition) {
      cursorAnimation();
    }
  }, [cursorPosition]);

  return (
    <svg className={styles.cursorEffect} style={svgStyle} viewBox="0 0 100 100">
      {isCorrect && (
        <motion.path ref={scope} style={pathStyle} initial={{ opacity: 0, pathLength: 0 }} d="M20,50 L40,70 L80,30" />
      )}
      {isCorrect === false && (
        <>
          <motion.path ref={scope} style={pathStyle} initial={{ opacity: 0, pathLength: 0 }} d="M20,20 L80,80" />
          <motion.path ref={scope} style={pathStyle} initial={{ opacity: 0, pathLength: 0 }} d="M80,20 L20,80" />
        </>
      )}
    </svg>
  );
};
