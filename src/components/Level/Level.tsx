import { Ref, forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DiffPicturesContainer, InpaintMask, Rating, Spinner } from "components";
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
import { GameStatus } from "enums";
import { difficultyToLivesMap } from "utils";
import styles from "./Level.module.scss";
import { motion } from "framer-motion";

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
  const foundDifferences = differences.filter((difference) => difference.isClicked);

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

  return (
    <div className={styles.wrapper} ref={ref}>
      <InpaintMask onMaskGenerated={onMaskGenerated} />
      {generatedPics.isSuccess && (
        <>
          <Rating type="star" totalItems={differences.length} checkedItems={foundDifferences.length} />
          <Rating type="heart" totalItems={difficultyToLivesMap[difficulty]} checkedItems={lives} />
          <DiffPicturesContainer generatedPics={generatedPics.data} />
          {levelEndStatus && (
            <motion.div
              className={styles.overlay}
              onClick={updateGameStatus}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Tap to continue
            </motion.div>
          )}
        </>
      )}
      {!generatedPics.isSuccess && <Spinner />}
    </div>
  );
});
