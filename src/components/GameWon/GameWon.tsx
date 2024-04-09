import { Ref, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnimatedButton, LevelInfoWrapper, MalcolmVideo } from "components";
import { resetGameState } from "slices";
import styles from "./GameWon.module.scss";

export const GameWon = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlayAgainClick = () => {
    dispatch(resetGameState());
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <LevelInfoWrapper ref={ref}>
      <span className={styles.title}>Game won!</span>
      <MalcolmVideo />
      <span className={styles.actionButtons}>
        <AnimatedButton onClick={handlePlayAgainClick}>Play again</AnimatedButton>
        <AnimatedButton onClick={handleHomeClick}>Home</AnimatedButton>
      </span>
    </LevelInfoWrapper>
  );
});
