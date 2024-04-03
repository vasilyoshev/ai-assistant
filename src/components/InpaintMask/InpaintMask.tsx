import { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaskCircle } from "interfaces";
import { createCircle, getNumberOfDifferences } from "utils";
import { setDifferences, selectMocksEnabled, selectLevel, selectDifficulty } from "slices";
import { mockCircles } from "mocks";
import styles from "./InpaintMask.module.scss";

export const InpaintMask: FunctionComponent<{
  onMaskGenerated: (context: HTMLCanvasElement) => void;
}> = ({ onMaskGenerated }) => {
  const maskRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch();
  const mocksEnabled = useSelector(selectMocksEnabled);
  const level = useSelector(selectLevel);
  const difficulty = useSelector(selectDifficulty);

  useEffect(() => {
    const canvas = maskRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    // Transparent bg doesn't work with masking endpoint
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const circles: MaskCircle[] = [];
    const numberOfDifferences = getNumberOfDifferences(level, difficulty);

    if (mocksEnabled) {
      circles.push(...mockCircles);
    } else {
      for (let i = 0; i < numberOfDifferences; i++) {
        const circle = createCircle(circles, i + 1, level, difficulty);
        circles.push(circle);
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        context.fillStyle = "black";
        context.fill();
        context.closePath();
      }
    }

    onMaskGenerated(canvas);
    dispatch(setDifferences(circles));
  }, []);

  return <canvas className={styles.canvas} ref={maskRef} width="1024" height="1024"></canvas>;
};
