import Matter, { Common } from "matter-js";

export default function polygon(x, y) {
  this.body = Matter.Bodies.polygon(
    90,
    30,
    Common.random(3,7),
    Common.random(45),
    {
      friction: 0.1,
      restitution: 0.7
    }
  );
    
  return this.body;
}