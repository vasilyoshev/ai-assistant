import { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, useAnimationControls } from "framer-motion";
import { selectGameStatus } from "slices";
import { LevelEndStatus } from "types";
import { GameStatus } from "enums";
import styles from "./LevelEndText.module.scss";

interface LevelEndTextProps {
  levelEndStatus: LevelEndStatus;
}
export const LevelEndText = ({ levelEndStatus }: LevelEndTextProps) => {
  const gameStatus = useSelector(selectGameStatus);
  const overlayAnimationControls = useAnimationControls();
  const overlayInitialStyles = { y: -50, scale: 0 };

  useEffect(() => {
    const introStiffness = 300;
    const introDamping = 10;
    const shakeDuration = 0.5;
    const shakeDelay = 5;

    overlayAnimationControls.start(() => ({
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: introStiffness, damping: introDamping },
    }));
    overlayAnimationControls.start(() => ({
      rotate: [0, 10, -10, 10, -10, 10, 0],
      transition: { duration: shakeDuration, delay: shakeDelay, repeatDelay: shakeDelay, repeat: Infinity },
    }));
  }, [gameStatus]);

  return (
    <motion.span className={styles.wrapper} style={overlayInitialStyles} animate={overlayAnimationControls}>
      <span>{levelEndStatus === GameStatus.LevelFailed ? "Almost..." : "Excellent!"}</span>
      <span>Tap to {levelEndStatus === GameStatus.LevelFailed ? "try again" : "continue"}</span>
    </motion.span>
  );
};
