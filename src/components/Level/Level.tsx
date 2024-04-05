import { Ref, forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useAnimationControls } from "framer-motion";
import {
  selectDifferences,
  selectDifficulty,
  selectLevel,
  selectLives,
  selectStyle,
  selectTopic,
  setGameStatus,
} from "slices";
import { useGeneratePicsMutation } from "api";
import { difficultyToLivesMap } from "utils";
import { GameStatus } from "enums";
import { DiffPicturesContainer, InpaintMask, Rating, Spinner } from "components";
import styles from "./Level.module.scss";

export const Level = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  const dispatch = useDispatch();
  const [generatePics, generatedPics] = useGeneratePicsMutation();
  const lives = useSelector(selectLives);
  const level = useSelector(selectLevel);
  const differences = useSelector(selectDifferences);
  const difficulty = useSelector(selectDifficulty);
  const topic = useSelector(selectTopic);
  const style = useSelector(selectStyle);
  const [mask, setMask] = useState<string>();
  const [levelEndStatus, setLevelEndStatus] = useState<GameStatus>();
  const overlayAnimationControls = useAnimationControls();
  const foundDifferences = differences.filter((difference) => difference.isClicked);
  const overlayInitialState = { opacity: 0, scale: 50 };

  const onMaskGenerated = (canvas: HTMLCanvasElement) => {
    setMask(canvas.toDataURL().split(",")[1]);
  };

  const updateGameStatus = () => {
    dispatch(setGameStatus(levelEndStatus));
  };

  useEffect(() => {
    if (!mask) return;

    generatePics({ maskImage: mask, style, topic });
  }, [mask]);

  useEffect(() => {
    if (!differences?.length) return;

    if (differences.length === foundDifferences.length) {
      setLevelEndStatus(level === 10 ? GameStatus.GameWon : GameStatus.LevelCleared);
    }
  }, [differences, foundDifferences]);

  useEffect(() => {
    if (lives === 0) {
      setLevelEndStatus(GameStatus.LevelFailed);
    }
  }, [lives]);

  useEffect(() => {
    if (!levelEndStatus) return;

    const introDuration = 1;
    const shakeDuration = 0.5;
    const repeatDelay = 5;

    overlayAnimationControls.start(() => ({
      opacity: 1,
      scale: 1,
      transition: { duration: introDuration },
    }));
    overlayAnimationControls.start(() => ({
      rotate: [0, 10, -10, 10, -10, 10, 0],
      transition: { duration: shakeDuration, delay: introDuration + repeatDelay, repeat: Infinity, repeatDelay },
    }));
  }, [levelEndStatus]);

  return (
    <div className={styles.wrapper} ref={ref}>
      <InpaintMask onMaskGenerated={onMaskGenerated} />
      {generatedPics.isSuccess && (
        <>
          <Rating type="star" totalItems={differences.length} checkedItems={foundDifferences.length} />
          <Rating type="heart" totalItems={difficultyToLivesMap[difficulty]} checkedItems={lives} />
          <DiffPicturesContainer generatedPics={generatedPics.data} />
          {levelEndStatus && (
            <div className={styles.overlay} onClick={updateGameStatus}>
              <motion.span
                className={styles.overlayContent}
                style={overlayInitialState}
                animate={overlayAnimationControls}
              >
                <span>{levelEndStatus === GameStatus.LevelFailed ? "Too bad..." : "Nice!"}</span>
                <span>Tap to continue</span>
              </motion.span>
            </div>
          )}
        </>
      )}
      {!generatedPics.isSuccess && <Spinner />}
    </div>
  );
});
