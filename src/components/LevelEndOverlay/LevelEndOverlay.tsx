import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion, useAnimationControls } from "framer-motion";
import { setGameStatus } from "slices";
import { GameStatus } from "enums";
import styles from "./LevelEndOverlay.module.scss";

interface LevelEndOverlayProps {
  levelEndStatus: GameStatus;
}
export const LevelEndOverlay = ({ levelEndStatus }: LevelEndOverlayProps) => {
  const dispatch = useDispatch();
  const overlayAnimationControls = useAnimationControls();
  const overlayInitialState = { opacity: 0, scale: 50 };

  const updateGameStatus = () => {
    dispatch(setGameStatus(levelEndStatus));
  };

  useEffect(() => {
    if (!levelEndStatus) return;

    const introDuration = 1;
    const shakeDuration = 0.5;
    const repeatDelay = 5;

    overlayAnimationControls.start(() => ({
      opacity: 1,
      scale: 1,
      transition: { duration: introDuration },
    }));
    overlayAnimationControls.start(() => ({
      rotate: [0, 10, -10, 10, -10, 10, 0],
      transition: { duration: shakeDuration, delay: introDuration + repeatDelay, repeat: Infinity, repeatDelay },
    }));
  }, [levelEndStatus]);

  return (
    <div className={styles.overlay} onClick={updateGameStatus}>
      <motion.span className={styles.overlayContent} style={overlayInitialState} animate={overlayAnimationControls}>
        <span>{levelEndStatus === GameStatus.LevelFailed ? "Too bad..." : "Nice!"}</span>
        <span>Tap to continue</span>
      </motion.span>
    </div>
  );
};
