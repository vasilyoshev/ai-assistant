import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatedButton, DevTools, DifficultySelector, LevelInfoWrapper } from "components";
import { selectLevel, selectStyle, selectTopic, setGameStatus, setStyle, setTopic } from "slices";
import { GameStatus } from "enums";
import { getRandomStyle, getRandomTopic } from "utils";
import styles from "./LevelIntro.module.scss";

export const LevelIntro = () => {
  const dispatch = useDispatch();
  const level = useSelector(selectLevel);
  const style = useSelector(selectStyle);
  const topic = useSelector(selectTopic);

  const handleStartClick = () => {
    dispatch(setGameStatus(GameStatus.Playing));
  };

  useEffect(() => {
    dispatch(setStyle(getRandomStyle()));
    dispatch(setTopic(getRandomTopic()));
  }, []);

  return (
    <LevelInfoWrapper>
      <DevTools />
      <span className={styles.gameName}>Find the differences</span>
      <span className={styles.level}>Level {level}</span>
      <div>
        <div>Style: {style}</div>
        <div>Topic: {topic}</div>
      </div>
      <DifficultySelector />
      <AnimatedButton onClick={handleStartClick}>Start</AnimatedButton>
    </LevelInfoWrapper>
  );
};
