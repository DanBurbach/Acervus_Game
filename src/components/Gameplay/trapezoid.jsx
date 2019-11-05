import Matter, { Common } from "matter-js";

export default function Trapezoid() {
  this.body = Matter.Bodies.trapezoid(
    90,
    50,
    Common.random(5, 100),
    Common.random(5, 80),
    Common.random(1, 8),
    { restitution: 0.2, constraint: 1, friction: 1 }
  );
  return this.body;
}
