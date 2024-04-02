import { useSelector } from "react-redux";
import { GameStatus } from "enums";
import { selectGameStatus } from "slices";
import { GameWon, Level, LevelCleared, LevelFailed, LevelIntro } from "components";

export const FindTheDifferencesRoute = () => {
  const gameStatus = useSelector(selectGameStatus);

  return (
    <>
      {gameStatus === GameStatus.Waiting && <LevelIntro />}
      {gameStatus === GameStatus.Playing && <Level />}
      {gameStatus === GameStatus.LevelCleared && <LevelCleared />}
      {gameStatus === GameStatus.LevelFailed && <LevelFailed />}
      {gameStatus === GameStatus.GameWon && <GameWon />}
    </>
  );
};
