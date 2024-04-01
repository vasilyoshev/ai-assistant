import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DiffPicturesContainer, InpaintMask, Rating, Spinner } from "components";
import { selectDifferences, selectLives, selectStyle, selectTopic } from "slices";
import { useGeneratePicsMutation } from "api";
import styles from "./Level.module.scss";

export const Level = () => {
  const [generatePics, generatedPics] = useGeneratePicsMutation();
  const lives = useSelector(selectLives);
  const differences = useSelector(selectDifferences);
  const topic = useSelector(selectTopic);
  const style = useSelector(selectStyle);
  const [mask, setMask] = useState<string>();
  const foundDifferences = differences.filter((difference) => difference.isClicked);

  const onMaskGenerated = (canvas: HTMLCanvasElement) => {
    setMask(canvas.toDataURL().split(",")[1]);
  };

  useEffect(() => {
    if (!mask) return;

    generatePics({ maskImage: mask, style, topic });
  }, [mask]);

  return (
    <div className={styles.wrapper}>
      <InpaintMask onMaskGenerated={onMaskGenerated} />
      {generatedPics.isSuccess && (
        <>
          <Rating type="star" totalItems={differences.length} checkedItems={foundDifferences.length} />
          <Rating type="heart" totalItems={3} checkedItems={lives} />
          <DiffPicturesContainer generatedPics={generatedPics.data} />
        </>
      )}
      {!generatedPics.isSuccess && <Spinner />}
    </div>
  );
};
