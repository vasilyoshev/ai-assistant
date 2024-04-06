import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { GameStatus } from "enums";
import { getRandomPercent } from "utils";
import styles from "./FloatingEmojis.module.scss";

interface FloatingEmojisProps {
  levelEndStatus: GameStatus;
}
export const FloatingEmojis = ({ levelEndStatus }: FloatingEmojisProps) => {
  const animationControls = useAnimationControls();
  const overlayInitialStyles = {
    scale: 0.1,
  };

  const loseEmojis = ["🔎🤔", "❌🤦", "😕🤏", "💀💩", "💣💥"];
  const winEmojis = ["🥳🎉", "🧐🧠", "🔥🔝", "🔎✅", "👏🍾"];
  const emojis = (levelEndStatus === GameStatus.LevelFailed ? loseEmojis : winEmojis).sort(() => Math.random() - 0.5);

  useEffect(() => {
    animationControls.start((i) => ({
      scale: [0, 1, 1, 1, 1],
      y: ["-0%", "-200%", "-400%", "-600%", "-800%"],
      opacity: [1, 1, 1, 0, 0],
      transition: {
        duration: 4 + Math.random() * 2,
        delay: i === 0 ? 0 : (i + Math.random()) / 2,
        times: [0, 0.05, 0.8, 0.85, 1],
      },
    }));
  }, []);

  return (
    <>
      {emojis.map((emoji, index) => (
        <motion.div
          key={index}
          className={styles.emoji}
          style={{ ...overlayInitialStyles, top: getRandomPercent(30, 90), left: getRandomPercent(-3, 70) }}
          animate={animationControls}
          custom={index}
        >
          {emoji}
        </motion.div>
      ))}
    </>
  );
};
