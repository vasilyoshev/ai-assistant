import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnimatedButton, LevelInfoWrapper, YTPlayer } from "components";
import { resetGameState } from "slices";
import styles from "./GameWon.module.scss";

export const GameWon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlayAgainClick = () => {
    dispatch(resetGameState());
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <LevelInfoWrapper>
      <span className={styles.title}>Game won!</span>
      <YTPlayer />
      <span className={styles.actionButtons}>
        <AnimatedButton onClick={handlePlayAgainClick}>Play again</AnimatedButton>
        <AnimatedButton onClick={handleHomeClick}>Home</AnimatedButton>
      </span>
    </LevelInfoWrapper>
  );
};
