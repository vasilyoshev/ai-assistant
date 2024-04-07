import Confetti from "react-confetti";
import { useWindowDimensions } from "hooks";
import { LevelEndStatus } from "types";
import { GameStatus } from "enums";

interface ConfettiWrapperProps {
  levelEndStatus: LevelEndStatus;
}
export const ConfettiWrapper = ({ levelEndStatus }: ConfettiWrapperProps) => {
  const { width, height } = useWindowDimensions();
  const isLevelFailed = levelEndStatus === GameStatus.LevelFailed;

  return (
    <Confetti
      initialVelocityX={isLevelFailed ? 2 : 8}
      initialVelocityY={isLevelFailed ? 0 : 8}
      width={width}
      height={height}
      confettiSource={{
        w: 10,
        h: 10,
        x: width / 2,
        y: isLevelFailed ? 0 : height / 5,
      }}
      gravity={isLevelFailed ? 0.15 : 0.2}
      recycle={false}
      numberOfPieces={100}
      colors={isLevelFailed ? ["#27251F", "#232B2B", "#36454F", "#242124"] : undefined}
    />
  );
};
