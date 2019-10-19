import Matter, { Common } from "matter-js";

export default function circle() {
  let x = 30;
  let y = 30;
  let r = Common.random(30);
  this.body = Matter.Bodies.circle(x, y, r, {
    friction: 0.1,
    restitution: 0.9
  });
  return this.body;
}