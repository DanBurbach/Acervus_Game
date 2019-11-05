import Matter from "matter-js";

export default function createMouseDragConstraint(canvas, engine) {
  let mouse = Matter.Mouse.create(canvas),
    mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    
  return mouseConstraint;
}
