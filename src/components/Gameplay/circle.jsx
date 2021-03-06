import Matter, { Common } from "matter-js";

export default function Circle() {
  let x = 30;
  let y = 30;
  let r = Common.random(5, 40);
  this.body = Matter.Bodies.circle(x, y, r, {
    friction: 0.2,
    restitution: 0.7,
  });
  return this.body;
}