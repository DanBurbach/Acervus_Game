import React, { Component } from "react";
import Matter, {Engine, Render, World, Bodies, Common, Mouse, MouseConstraint} from "matter-js";
import $ from 'jquery';


import "./../../assets/Main.css";

const engine = Engine.create();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: 1000,
        height: 600,
        wireframes: false
      }
    });
    Matter.Render.run(render);

    let rndomNumber = Math.floor(Math.random() * 3) + 1;

    let mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        rndomNumber: rndomNumber,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });
    World.add(engine.world, mouseConstraint);


// GENERATE FIELD BOX ==================================
    World.add(engine.world, [
      Bodies.rectangle(1000, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(200, 600, 500, 50, { isStatic: true }),
      Bodies.rectangle(1000, 600, -800, 50, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);
    // Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      // World.add(engine.world, Bodies.rectangle(90, 50, Common.random(10,70), Common.random(12,90), { restitution: 0.5 }));

      // World.add(engine.world, Bodies.circle(90, 30, Common.random(20), { restitution: 0.9 }));

      // World.add(engine.world, Bodies.polygon(90, 30, Common.random(7), Common.random(45), { restitution: 0.7 }));


    let addCircle = function() {
      let circle = 
        Bodies.circle(90, 30, Common.random(20), { restitution: 0.9 });
      return circle;
    };

    let addRectangle = function() {
      let rectangle = 
        Bodies.rectangle(
              90, 50, Common.random(10, 70), Common.random(12, 90),
              { restitution: 0.5 });
      return rectangle;
    };

    let addPolygon = function() {
      let polygon = 
        Bodies.polygon(90, 30, Common.random(7), Common.random(45), { restitution: 0.7 });
      return polygon;
    };

    $('.add-circle').on('click', function() {
        World.add(engine.world, addCircle());
      })

    $('.add-rectangle').on('click', function() {
        World.add(engine.world, addRectangle());
      })

    $('.add-polygon').on('click', function() {
        World.add(engine.world, addPolygon());
      })

      Engine.run(engine);
  };

  render() {
    return (
    <div className="main_container">
      <div ref="scene" />
      <button className="add-circle">Add Circle</button>
      <button className="add-rectangle">Add Rectangle</button>
      <button className="add-polygon">Add Polygon</button>
    </div>
  )};
}
export default Main;
