import Matter, { Common } from "matter-js";

export default function ball(x, y) {
  this.body = Matter.Bodies.circle(90, 30, Common.random(20), {
    restitution: 0.9
  });
  return this.body;
}