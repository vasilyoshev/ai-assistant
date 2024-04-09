import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loseLife, selectDifferences, selectLives, setDifferenceClickedById } from "slices";
import { ClickFeedback } from "components";
import { Click, PicturesResponse } from "interfaces";
import { drawCircle } from "utils";
import styles from "./DiffPicturesContainer.module.scss";

interface DiffPicturesContainerProps {
  generatedPics: PicturesResponse;
}
export const DiffPicturesContainer = ({ generatedPics }: DiffPicturesContainerProps) => {
  const dispatch = useDispatch();
  const [click, setClick] = useState<Click>({ isCorrect: true, x: 0, y: 0 });
  const currentCircles = useSelector(selectDifferences);
  const lives = useSelector(selectLives);
  const canvasOriginalRef = useRef<HTMLCanvasElement>(null);
  const canvasMaskedRef = useRef<HTMLCanvasElement>(null);

  const onCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();

    // Calculate the normalized x-coordinate of the click event relative to the canvas.
    const x = ((event.clientX - rect.left) / canvas.offsetWidth) * 1024;
    const y = ((event.clientY - rect.top) / canvas.offsetHeight) * 1024;

    // Check if the click event is inside one of the circles (if Euclidean distance <= radius)
    const clickedCircle = currentCircles.find((circle) => Math.hypot(circle.x - x, circle.y - y) <= circle.radius);

    if (clickedCircle) {
      if (!clickedCircle.isClicked) {
        drawCircle(canvasOriginalRef.current, clickedCircle, "green");
        drawCircle(canvasMaskedRef.current, clickedCircle, "green");

        dispatch(setDifferenceClickedById(clickedCircle.id));
        setClick({ x: event.clientX, y: event.clientY, isCorrect: true });
      }
    } else {
      dispatch(loseLife());
      setClick({ x: event.clientX, y: event.clientY, isCorrect: false });
    }
  };

  useEffect(() => {
    if (canvasOriginalRef.current && canvasMaskedRef.current) {
      canvasOriginalRef.current.height = 1024;
      canvasOriginalRef.current.width = 1024;
      canvasMaskedRef.current.height = 1024;
      canvasMaskedRef.current.width = 1024;
    }
  }, []);

  useEffect(() => {
    if (lives === 0) {
      currentCircles.forEach((circle) => {
        if (!circle.isClicked) {
          drawCircle(canvasOriginalRef.current, circle, "red");
          drawCircle(canvasMaskedRef.current, circle, "red");
        }
      });
    }
  }, [lives]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img
          src={`data:image/png;base64, ${generatedPics.originalPic.artifacts[0].base64}`}
          alt="original"
          className={styles.image}
        />
        <canvas ref={canvasOriginalRef} className={styles.overlayCanvas} onClick={onCanvasClick} />
      </div>
      <div className={styles.imgContainer}>
        <img
          src={`data:image/png;base64, ${generatedPics.maskedPic.artifacts[0].base64}`}
          alt="inpainted"
          className={styles.image}
        />
        <canvas ref={canvasMaskedRef} className={styles.overlayCanvas} onClick={onCanvasClick} />
      </div>

      <ClickFeedback isCorrect={click.isCorrect} cursorPosition={{ x: click.x, y: click.y }} />
    </div>
  );
};
