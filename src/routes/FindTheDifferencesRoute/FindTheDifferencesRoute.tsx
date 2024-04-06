import { useSelector } from "react-redux";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { GameStatus } from "enums";
import { selectGameStatus } from "slices";
import { GameWon, Level, LevelIntro } from "components";

export const FindTheDifferencesRoute = () => {
  const gameStatus = useSelector(selectGameStatus);

  const MotionLevelIntro = motion(LevelIntro);
  const MotionLevel = motion(Level);
  const MotionGameWon = motion(GameWon);

  const variants = {
    hidden: { y: "-100vh", transition: { duration: 0.25 } },
    visible: { y: "0", transition: { duration: 0.25 } },
  };

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        {gameStatus === GameStatus.Waiting && (
          <MotionLevelIntro key="LevelIntro" variants={variants} initial="hidden" animate="visible" exit="hidden" />
        )}
        {gameStatus === GameStatus.Playing && (
          <MotionLevel key="Level" variants={variants} initial="hidden" animate="visible" exit="hidden" />
        )}
        {gameStatus === GameStatus.GameWon && (
          <MotionGameWon key="GameWon" variants={variants} initial="hidden" animate="visible" exit="hidden" />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};
