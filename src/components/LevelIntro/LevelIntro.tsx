import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AnimatedButton, DevTools } from "components";
import { useMotionStyle } from "hooks";
import { selectLevel, setGameStatus, setTopic } from "slices";
import { GameStatus, Style } from "enums";
import styles from "./LevelIntro.module.scss";

export const LevelIntro = () => {
  const dispatch = useDispatch();
  const level = useSelector(selectLevel);
  const [inputTopic, setInputTopic] = useState("");
  const { motionStyle } = useMotionStyle();

  const changeTopic = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTopic(event.target.value);
  };

  const handleStartClick = () => {
    dispatch(setTopic(inputTopic));
    dispatch(setGameStatus(GameStatus.Playing));
  };

  return (
    <div className={styles.wrapper}>
      <motion.div style={{ boxShadow: motionStyle.boxShadow }} className={styles.introWindow}>
        <DevTools />
        <span className={styles.gameName}>Find the differences</span>
        <span className={styles.level}>Level {level}</span>
        <span>The style of this level is {Object.values(Style)[level - 1]}</span>
        <motion.input
          className={styles.topicInput}
          style={{ ...motionStyle }}
          type="text"
          placeholder="Type a topic..."
          value={inputTopic}
          onChange={changeTopic}
        />
        <AnimatedButton onClick={handleStartClick}>Start</AnimatedButton>
      </motion.div>
    </div>
  );
};
