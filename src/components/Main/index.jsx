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
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
        // world = engine.world;

    const render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: 1000,
        height: 600,
        wireframes: false
      }
    });
    Render.run(render);


    // GENERATED OBJECTS ON LOAD OF PAGE ==========================

    // let ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });

    // let ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });

    // let obstacles = Composites.stack(10, 75, 15, 3, 10, 10, function(x, y, column ) {
    //   var sides = Math.round(Common.random(2, 7)),
    //     options = {
    //       render: {
    //         fillStyle: Common.choose([
    //           "#006BA6",
    //           "#0496FF",
    //           "#D81159",
    //           "#8F2D56"
    //         ])
    //       }
    //     };

    //   switch (Math.round(Common.random(0, 1))) {
    //     case 0:
    //       if (Common.random() < 0.8) {
    //         return Bodies.rectangle(
    //           x,
    //           y,
    //           Common.random(25, 50),
    //           Common.random(25, 50),
    //           options
    //         );
    //       } else {
    //         return Bodies.rectangle(
    //           x,
    //           y,
    //           Common.random(80, 120),
    //           Common.random(25, 30),
    //           options
    //         );
    //       }
    //     case 1:
    //       return Bodies.polygon(x, y, sides, Common.random(25, 50),
    //         options
    //       );
    //   }
    // });

    // World.add(engine.world, [ballA, obstacles, ballB]);


// GENERATE FIELD BOX ==================================
    World.add(engine.world, [
      // walls
      Bodies.rectangle(1000, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(200, 600, 500, 50, { isStatic: true }),
      Bodies.rectangle(1000, 600, -800, 50, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);


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

// click to generate item layouts------------
    // let rectangles = (engine.world,
    //         Bodies.rectangle(90, 50, Common.random(10, 70), Common.random(12, 90), {
    //           restitution: 0.5
    //         }));

    // let circles = (engine.world,(
    //         Bodies.circle(90, 30, Common.random(20), { restitution: 0.9 })));

    // let polygons = (engine.world,
    //         Bodies.polygon(90, 30, Common.random(7), Common.random(45), {
    //           restitution: 0.7
    //         }));

    Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      World.add(engine.world, Bodies.rectangle(90, 50, Common.random(10,70), Common.random(12,90), { restitution: 0.5 }));

      World.add(engine.world, Bodies.circle(90, 30, Common.random(20), { restitution: 0.9 }));

      World.add(engine.world, Bodies.polygon(90, 30, Common.random(7), Common.random(45), { restitution: 0.7 }))
  });

    Engine.run(engine);
  }

  render() {
    return (
    <div className="main_container">
      <div ref="scene" />
      <button>Add More Items</button>
    </div>
  )};
}
export default Main;
