import Matter, {Common} from "matter-js";

export default function polygon(x, y) {
  this.body = Matter.Bodies.rectangle(
    90,
    50,
    Common.random(10, 70),
    Common.random(12, 90),
    { restitution: 0.5, 
      friction: 0.1 }
  );
  return this.body;
}
