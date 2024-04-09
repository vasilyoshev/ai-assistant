import { MaskCircle } from "interfaces";

export const drawCircle = (canvas: HTMLCanvasElement, circle: MaskCircle, color: "green" | "red") => {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const quart = Math.PI / 2;
    const circ = Math.PI * 2;
    let percentage = 0;
    const draw = () => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, -quart, circ * (percentage / 100) - quart, false);
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.stroke();

      percentage++;

      if (percentage <= 100) requestAnimationFrame(draw);
    };
    draw();
  }
};
