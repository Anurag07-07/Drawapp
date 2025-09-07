import axios from "axios"

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circ";
      centerX: number;
      centerY: number;
      radius: number;
    };

export async function drawInit(canvas: HTMLCanvasElement) {
  const existingShape: Shape[] = [];

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const width = endX - startX;
    const height = endY - startY;

    existingShape.push({
      type: "rect",
      x: startX,
      y: startY,
      width: width,
      height: height,
    });

    sendExistingShapes(existingShape);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const rect = canvas.getBoundingClientRect();
      const width = e.clientX - rect.left - startX;
      const height = e.clientY - rect.top - startY;

      clearCanvas(ctx, canvas, existingShape);

      ctx.strokeStyle = "rgba(255,255,255,1)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}

function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  existingShape: Shape[]
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShape.forEach((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255,255,255,1)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function sendExistingShapes(existingShape: Shape[]) {
  await axios.post("http://localhost:3000/storeshape", existingShape, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}