import { useDispatch } from "react-redux";
import Confetti from "react-confetti";
import { levelUp, resetLevelState, setGameStatus } from "slices";
import { GameStatus } from "enums";
import { LevelEndStatus } from "types";
import { FloatingEmojis, LevelEndText } from "components";
import styles from "./LevelEndOverlay.module.scss";
interface LevelEndOverlayProps {
  levelEndStatus: LevelEndStatus;
}
export const LevelEndOverlay = ({ levelEndStatus }: LevelEndOverlayProps) => {
  const dispatch = useDispatch();

  const handleOverlayClick = () => {
    if (levelEndStatus === GameStatus.LevelFailed) {
      dispatch(resetLevelState());
    } else if (levelEndStatus === GameStatus.LevelCleared) {
      dispatch(levelUp());
      dispatch(resetLevelState());
    } else if (levelEndStatus === GameStatus.GameWon) {
      dispatch(setGameStatus(GameStatus.GameWon));
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <LevelEndText levelEndStatus={levelEndStatus} />
      <FloatingEmojis levelEndStatus={levelEndStatus} />
      <Confetti
        recycle={false}
        numberOfPieces={500}
        colors={levelEndStatus === GameStatus.LevelFailed ? ["#27251F", "#232B2B", "#36454F", "#242124"] : undefined}
      />
    </div>
  );
};
