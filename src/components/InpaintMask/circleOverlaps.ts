import { MaskCircle } from "interfaces";

export const circleOverlaps = (newCircle: MaskCircle, circles: MaskCircle[]) =>
  circles.some((circle) => {
    const distance = Math.sqrt(
      (circle.x - newCircle.x) ** 2 + (circle.y - newCircle.y) ** 2,
    );
    return distance < circle.radius + newCircle.radius;
  });
