import { useDispatch } from "react-redux";
import { AnimatedButton, LevelInfoWrapper } from "components";
import { resetLevelState } from "slices";
import styles from "./LevelFailed.module.scss";

export const LevelFailed = () => {
  const dispatch = useDispatch();

  const handleTryAgainClick = () => {
    dispatch(resetLevelState());
  };

  return (
    <LevelInfoWrapper>
      <span className={styles.title}>Level failed!</span>
      <span>gif4e</span>
      <AnimatedButton onClick={handleTryAgainClick}>Try again</AnimatedButton>
    </LevelInfoWrapper>
  );
};
