import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
  ReactZoomPanPinchState,
} from "react-zoom-pan-pinch";
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
  const [rzppState, setRzppState] = useState<ReactZoomPanPinchState>({
    scale: 1,
    positionX: 0,
    positionY: 0,
    previousScale: undefined,
  });
  const [isDragging, setIsDragging] = useState(false);
  const currentCircles = useSelector(selectDifferences);
  const lives = useSelector(selectLives);
  const originalRzppRef = useRef<ReactZoomPanPinchRef>(null);
  const maskedRzppRef = useRef<ReactZoomPanPinchRef>(null);
  const canvasOriginalRef = useRef<HTMLCanvasElement>(null);
  const canvasMaskedRef = useRef<HTMLCanvasElement>(null);
  const mouseDownCoordsRef = useRef({ x: 0, y: 0 });

  const onCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) return;

    const canvas = event.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();

    // Calculate the normalized x-coordinate of the click event relative to the canvas.
    // Zoom scale is taken into account to get the correct coordinate.
    const x = ((event.clientX - rect.left) / (canvas.offsetWidth * rzppState.scale)) * 1024;
    const y = ((event.clientY - rect.top) / (canvas.offsetHeight * rzppState.scale)) * 1024;

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

  const onRzppTransform = (ref: ReactZoomPanPinchRef) => {
    // Destructuring required, otherwise React doesn't recognize state update due to shallow comparison
    setRzppState({ ...ref.state });
  };

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    mouseDownCoordsRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    const { x, y } = mouseDownCoordsRef.current;
    // If there is a difference in coordinates between mouseDown and mouseUp set isDragging to true
    setIsDragging(!!Math.abs(e.clientX - x) && !!Math.abs(e.clientY - y));
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

  useEffect(() => {
    if (!rzppState) return;

    originalRzppRef.current.instance.transformState.scale = rzppState.scale;
    originalRzppRef.current.instance.transformState.positionX = rzppState.positionX;
    originalRzppRef.current.instance.transformState.positionY = rzppState.positionY;
    originalRzppRef.current.instance.applyTransformation();
    maskedRzppRef.current.instance.transformState.scale = rzppState.scale;
    maskedRzppRef.current.instance.transformState.positionX = rzppState.positionX;
    maskedRzppRef.current.instance.transformState.positionY = rzppState.positionY;
    maskedRzppRef.current.instance.applyTransformation();
  }, [rzppState]);

  return (
    <div className={styles.wrapper} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <TransformWrapper
        ref={originalRzppRef}
        onTransformed={onRzppTransform}
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true }}
        maxScale={4}
        disablePadding
      >
        <TransformComponent wrapperStyle={{ aspectRatio: 1 }}>
          <div className={styles.imgContainer}>
            <img
              src={`data:image/png;base64, ${generatedPics.originalPic.artifacts[0].base64}`}
              alt="original"
              className={styles.image}
            />
            <canvas ref={canvasOriginalRef} className={styles.overlayCanvas} onClick={onCanvasClick} />
          </div>
        </TransformComponent>
      </TransformWrapper>
      <TransformWrapper
        ref={maskedRzppRef}
        onTransformed={onRzppTransform}
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true }}
        maxScale={4}
        disablePadding
      >
        <TransformComponent wrapperStyle={{ aspectRatio: 1 }}>
          <div className={styles.imgContainer}>
            <img
              src={`data:image/png;base64, ${generatedPics.maskedPic.artifacts[0].base64}`}
              alt="inpainted"
              className={styles.image}
            />
            <canvas ref={canvasMaskedRef} className={styles.overlayCanvas} onClick={onCanvasClick} />
          </div>
        </TransformComponent>
      </TransformWrapper>
      <ClickFeedback isCorrect={click.isCorrect} cursorPosition={{ x: click.x, y: click.y }} />
    </div>
  );
};
