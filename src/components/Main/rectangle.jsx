import Matter, {Common} from "matter-js";

export default function polygon(x, y) {
  this.body = Matter.Bodies.rectangle(
    90,
    50,
    Common.random(10, 70),
    Common.random(12, 90),
    { restitution: 0.5 }
  );
  return this.body;
}
