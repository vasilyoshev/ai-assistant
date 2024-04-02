import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AnimatedButton, DevTools } from "components";
import { useMotionStyle } from "hooks";
import { selectLevel, selectStyle, selectTopic, setGameStatus, setStyle, setTopic } from "slices";
import { GameStatus } from "enums";
import { getRandomStyle, getRandomTopic } from "utils";
import styles from "./LevelIntro.module.scss";

export const LevelIntro = () => {
  const dispatch = useDispatch();
  const level = useSelector(selectLevel);
  const style = useSelector(selectStyle);
  const topic = useSelector(selectTopic);
  const { motionStyle } = useMotionStyle();

  const handleStartClick = () => {
    dispatch(setGameStatus(GameStatus.Playing));
  };

  useEffect(() => {
    dispatch(setStyle(getRandomStyle()));
    dispatch(setTopic(getRandomTopic()));
  }, []);

  return (
    <div className={styles.wrapper}>
      <motion.div style={{ boxShadow: motionStyle.boxShadow }} className={styles.introWindow}>
        <DevTools />
        <span className={styles.gameName}>Find the differences</span>
        <span className={styles.level}>Level {level}</span>
        <div>
          <div>Style: {style}</div>
          <div>Topic: {topic}</div>
        </div>
        <AnimatedButton onClick={handleStartClick}>Start</AnimatedButton>
      </motion.div>
    </div>
  );
};
