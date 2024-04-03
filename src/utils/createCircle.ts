import { Difficulty } from "enums";
import { MaskCircle } from "interfaces";
import { getMaxDifferenceRadius } from "utils";

export const createCircle = (circles: MaskCircle[], id: number, level: number, difficulty: Difficulty): MaskCircle => {
  const minRadius = 30;
  const maxRadius = getMaxDifferenceRadius(level, difficulty);
  const canvasWidth = 1024;
  const canvasHeight = 1024;
  let newCircle;
  let overlaps;

  do {
    newCircle = {
      x: Math.random() * (canvasWidth - maxRadius * 2) + maxRadius,
      y: Math.random() * (canvasHeight - maxRadius * 2) + maxRadius,
      radius: Math.random() * (maxRadius - minRadius) + minRadius,
      isClicked: false,
      id,
    };
    overlaps = circleOverlaps(newCircle, circles);
  } while (overlaps);

  return newCircle;
};

const circleOverlaps = (newCircle: MaskCircle, circles: MaskCircle[]) =>
  circles.some((circle) => {
    const distance = Math.sqrt((circle.x - newCircle.x) ** 2 + (circle.y - newCircle.y) ** 2);
    return distance < circle.radius + newCircle.radius;
  });
