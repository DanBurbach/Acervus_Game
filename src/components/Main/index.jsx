import React, { Component } from "react";
import Matter from "matter-js";

import "./../../assets/Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Common = Matter.Common,
      Composites = Matter.Composites,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
        // world = engine.world;

    const render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false
      }
    });
    Render.run(render);


    let ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });

    let ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });

    let obstacles = Composites.stack(10, 75, 15, 3, 10, 10, function(x, y, column ) {
      var sides = Math.round(Common.random(2, 7)),
        options = {
          render: {
            fillStyle: Common.choose([
              "#006BA6",
              "#0496FF",
              "#D81159",
              "#8F2D56"
            ])
          }
        };

      switch (Math.round(Common.random(0, 1))) {
        case 0:
          if (Common.random() < 0.8) {
            return Bodies.rectangle(
              x,
              y,
              Common.random(25, 50),
              Common.random(25, 50),
              options
            );
          } else {
            return Bodies.rectangle(
              x,
              y,
              Common.random(80, 120),
              Common.random(25, 30),
              options
            );
          }
        case 1:
          return Bodies.polygon(x, y, sides, Common.random(25, 50),
            options
          );
      }
    });


    World.add(engine.world, [
      // walls
      // Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
      Bodies.rectangle(200, 600, 600, 50, { isStatic: true }),
      // Bodies.rectangle(260, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    World.add(engine.world, [ballA, obstacles, ballB]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    World.add(engine.world, mouseConstraint);

    Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      World.add(engine.world, Bodies.rectangle(90, 50, Common.random(5,70), Common.random(6,90), { restitution: 0.7 }));
      // World.add(engine.world, Bodies.circle(90, 30, 30, { restitution: 0.7 }));
    });

    Engine.run(engine);
  }

  render() {
    return <div ref="scene" />;
  }
}
export default Main;
