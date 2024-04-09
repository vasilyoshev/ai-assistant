import { Ref, forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDifferences, selectDifficulty, selectLevel, selectLives, selectStyle, selectTopic } from "slices";
import { useGeneratePicsMutation } from "api";
import { difficultyToLivesMap } from "utils";
import { GameStatus } from "enums";
import { LevelEndStatus } from "types";
import { DiffPicturesContainer, InpaintMask, LevelEndOverlay, Rating, Spinner } from "components";
import styles from "./Level.module.scss";

export const Level = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  const [generatePics, generatedPics] = useGeneratePicsMutation();
  const lives = useSelector(selectLives);
  const level = useSelector(selectLevel);
  const differences = useSelector(selectDifferences);
  const difficulty = useSelector(selectDifficulty);
  const topic = useSelector(selectTopic);
  const style = useSelector(selectStyle);
  const [mask, setMask] = useState<string>();
  const [levelEndStatus, setLevelEndStatus] = useState<LevelEndStatus>();
  const foundDifferences = differences.filter((difference) => difference.isClicked);

  const onMaskGenerated = (canvas: HTMLCanvasElement) => {
    setMask(canvas.toDataURL().split(",")[1]);
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
          <div className={styles.gameData}>
            <div className={styles.level}>{level}</div>
            <div>
              <Rating type="star" totalItems={differences.length} checkedItems={foundDifferences.length} />
              <Rating type="heart" totalItems={difficultyToLivesMap[difficulty]} checkedItems={lives} />
            </div>
          </div>
          <DiffPicturesContainer generatedPics={generatedPics.data} />
          {levelEndStatus && <LevelEndOverlay levelEndStatus={levelEndStatus} />}
        </>
      )}
      {!generatedPics.isSuccess && <Spinner />}
    </div>
  );
});
