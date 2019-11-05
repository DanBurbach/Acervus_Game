import Matter from "matter-js";

export default function createRender(canvas, engine) {
  return Matter.Render.create({
    canvas: canvas,
    options: {
      width: 900,
      height: 600,
      wireframes: false,
    },
    engine: engine
  });
}
