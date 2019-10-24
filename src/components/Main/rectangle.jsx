import Matter, {Common} from "matter-js";

export default function polygon(x, y) {
  this.body = Matter.Bodies.rectangle(
    90,
    50,
    Common.random(9, 90),
    Common.random(12, 120),
    { restitution: 0.5,
      constraint: 1, 
      friction: 0.1 }
  );
  return this.body;
}
