import Matter, { Common } from "matter-js";

export default function Polygon(x, y) {
  this.body = Matter.Bodies.polygon(
    90,
    30,
    Common.random(3,7),
    Common.random(45),
    {
      friction: 0.9,
      restitution: 0.5
    }
  );
    
  return this.body;
}