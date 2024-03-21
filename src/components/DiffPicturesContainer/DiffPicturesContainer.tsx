import { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentCircles, setCircleClickedById } from "slices";
import { useGeneratePicsMutation } from "api";
import { InpaintMask } from "components";
import { Style } from "enums";
import styles from "./DiffPicturesContainer.module.scss";
import { MaskCircle } from "interfaces";

export const DiffPicturesContainer = () => {
  const dispatch = useDispatch();
  const [generatePics, generatedPics] = useGeneratePicsMutation();
  const currentCircles = useSelector(selectCurrentCircles);
  const [mask, setMask] = useState<string>();
  const canvasOriginalRef = useRef<HTMLCanvasElement>(null);
  const canvasMaskedRef = useRef<HTMLCanvasElement>(null);

  const onMaskGenerated = (canvas: HTMLCanvasElement) => {
    setMask(canvas.toDataURL().split(",")[1]);
  };

  // TODO try animations and extract to separate component
  const drawCircle = (canvas: HTMLCanvasElement, circle: MaskCircle) => {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  };

  const onCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();

    // Calculate the normalized x-coordinate of the click event relative to the canvas.
    const x = ((event.clientX - rect.left) / canvas.offsetWidth) * 1024;
    const y = ((event.clientY - rect.top) / canvas.offsetHeight) * 1024;

    const clickedCircle = currentCircles.find((circle) => Math.hypot(circle.x - x, circle.y - y) <= circle.radius);

    if (clickedCircle && !clickedCircle.isClicked) {
      if (canvasOriginalRef.current) {
        drawCircle(canvasOriginalRef.current, clickedCircle);
      }
      if (canvasMaskedRef.current) {
        drawCircle(canvasMaskedRef.current, clickedCircle);
      }
      dispatch(setCircleClickedById(clickedCircle.id));
    } else {
      // Lose 1 life TODO
    }
  };

  useEffect(() => {
    if (canvasOriginalRef.current && canvasMaskedRef.current) {
      canvasOriginalRef.current.height = 1024;
      canvasOriginalRef.current.width = 1024;
      canvasMaskedRef.current.height = 1024;
      canvasMaskedRef.current.width = 1024;
    }
  }, [generatedPics.isSuccess]);

  useEffect(() => {
    if (!mask) return;

    generatePics({ maskImage: mask, style: Style.Neonpunk, topic: "city" });
  }, [mask]);

  return (
    <div className={styles.wrapper}>
      {generatedPics.isSuccess && (
        <>
          <div className={styles.imgContainer}>
            <img
              src={`data:image/png;base64, ${generatedPics.data?.originalPic.artifacts[0].base64}`}
              alt="original"
              className={styles.image}
            />
            <canvas ref={canvasOriginalRef} className={styles.overlayCanvas} onClick={onCanvasClick} />
          </div>
          <div className={styles.imgContainer}>
            <img
              src={`data:image/png;base64, ${generatedPics.data?.maskedPic.artifacts[0].base64}`}
              alt="inpainted"
              className={styles.image}
            />
            <canvas ref={canvasMaskedRef} className={styles.overlayCanvas} onClick={onCanvasClick} />
          </div>
        </>
      )}
      <InpaintMask onMaskGenerated={onMaskGenerated} />
    </div>
  );
};
