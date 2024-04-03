import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loseLife, selectDifferences, selectLives, setDifferenceClickedById, setGameStatus } from "slices";
import { ClickFeedback } from "components";
import { GameStatus } from "enums";
import { MaskCircle, PicturesResponse } from "interfaces";
import styles from "./DiffPicturesContainer.module.scss";

interface DiffPicturesContainerProps {
  generatedPics: PicturesResponse;
}
export const DiffPicturesContainer = ({ generatedPics }: DiffPicturesContainerProps) => {
  const dispatch = useDispatch();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const currentCircles = useSelector(selectDifferences);
  const lives = useSelector(selectLives);
  const canvasOriginalRef = useRef<HTMLCanvasElement>(null);
  const canvasMaskedRef = useRef<HTMLCanvasElement>(null);

  // TODO extract to separate component
  const drawCircle = (canvas: HTMLCanvasElement, circle: MaskCircle) => {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const quart = Math.PI / 2;
      const circ = Math.PI * 2;
      let percentage = 0;
      const draw = () => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, -quart, circ * (percentage / 100) - quart, false);
        ctx.strokeStyle = "green";
        ctx.lineWidth = 5;
        ctx.stroke();

        percentage++;

        if (percentage <= 100) requestAnimationFrame(draw);
      };
      draw();
    }
  };

  const onCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();

    // Calculate the normalized x-coordinate of the click event relative to the canvas.
    const x = ((event.clientX - rect.left) / canvas.offsetWidth) * 1024;
    const y = ((event.clientY - rect.top) / canvas.offsetHeight) * 1024;

    const clickedCircle = currentCircles.find((circle) => Math.hypot(circle.x - x, circle.y - y) <= circle.radius);

    if (clickedCircle) {
      if (!clickedCircle.isClicked) {
        drawCircle(canvasOriginalRef.current, clickedCircle);
        drawCircle(canvasMaskedRef.current, clickedCircle);

        dispatch(setDifferenceClickedById(clickedCircle.id));
        setIsCorrect(true);
        setCursorPosition({ x: event.clientX, y: event.clientY });
      }
    } else {
      dispatch(loseLife());
      setIsCorrect(false);
      setCursorPosition({ x: event.clientX, y: event.clientY });
    }
  };

  useEffect(() => {
    if (lives === 0) {
      dispatch(setGameStatus(GameStatus.LevelFailed));
    }
  }, [lives]);

  useEffect(() => {
    if (canvasOriginalRef.current && canvasMaskedRef.current) {
      canvasOriginalRef.current.height = 1024;
      canvasOriginalRef.current.width = 1024;
      canvasMaskedRef.current.height = 1024;
      canvasMaskedRef.current.width = 1024;
    }
  }, []);

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

      <ClickFeedback isCorrect={isCorrect} cursorPosition={cursorPosition} />
    </div>
  );
};
