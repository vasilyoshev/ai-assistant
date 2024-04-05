import { Ref, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { AnimatedButton, LevelInfoWrapper } from "components";
import { levelUp, resetLevelState } from "slices";
import styles from "./LevelCleared.module.scss";

export const LevelCleared = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  const dispatch = useDispatch();

  const handleNextLevelClick = () => {
    dispatch(levelUp());
    dispatch(resetLevelState());
  };

  return (
    <LevelInfoWrapper ref={ref}>
      <span className={styles.title}>Level cleared!</span>
      <span>gif4e</span>
      <AnimatedButton onClick={handleNextLevelClick}>Next level</AnimatedButton>
    </LevelInfoWrapper>
  );
});
