import { useSelector } from "react-redux";
import { GameStatus } from "enums";
import { selectGameStatus } from "slices";
import { Level, LevelIntro, LevelSummary } from "components";
import styles from "./FindTheDifferencesRoute.module.scss";

export const FindTheDifferencesRoute = () => {
  const gameStatus = useSelector(selectGameStatus);

  return (
    <>
      {gameStatus === GameStatus.Waiting && <LevelIntro />}
      {gameStatus === GameStatus.Playing && <Level />}
      {gameStatus === GameStatus.Won || (gameStatus === GameStatus.Lost && <LevelSummary />)}
    </>
  );
};
