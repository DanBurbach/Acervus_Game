import React, { Component } from "react";
import Matter, {Engine, Render, World, Bodies, Common, Mouse, MouseConstraint} from "matter-js";
import $ from 'jquery';

import "./../../assets/Main.css";

// const engine = Engine.create();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      world: World,
      bodies: Bodies,
      engine: Engine.create(),
        renderer: Render.create({
          element: this.refs.scene,
          engine: this.engine,
          options: {
            width: 1000,
            height: 600,
            wireframes: false
            }
          }),
      score: 0,
      play_game: false
    };
  }


  componentDidMount() {
      if (window.confirm("You want to start game?")) {   
          this.setState({play_game: true}, () => {
            console.log(this.state.play_game);
          });
          this.buildWorld();
          this.startGame();
          this.setupWorld();
      }
    }

    buildWorld = (canvas) => {
      World.add(this.state.engine.world, [
        Bodies.rectangle(1000, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(200, 600, 500, 50, { isStatic: true }),
        Bodies.rectangle(1000, 600, -800, 50, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
      ]);
    }

  startGame = (canvas) => {
    // let canvas = document.getElementById("canvas");

    let renderMatter = createRender(canvas, this.engine);
    this.run(renderMatter);

      window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.run(renderMatter);
  });
}

  setupWorld(canvas) {
    let rndomNumber = Math.floor(Math.random() * 3) + 1;

    let mouse = Mouse.create(this.renderer.canvas),
      mouseConstraint = MouseConstraint.create(this.engine, {
        mouse: mouse,
        rndomNumber: rndomNumber,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });
    World.add(this.engine.world, mouseConstraint);

    // GENERATE FIELD BOX ==================================
    // World.add(this.engine.world, [
    //   Bodies.rectangle(1000, 300, 50, 600, { isStatic: true }),
    //   Bodies.rectangle(200, 600, 500, 50, { isStatic: true }),
    //   Bodies.rectangle(1000, 600, -800, 50, { isStatic: true }),
    //   Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    // ]);



    let addCircle = function() {
      let circle = Bodies.circle(90, 30, Common.random(20), {
        restitution: 0.9
      });
      return circle;
    };

    let addRectangle = function() {
      let rectangle = Bodies.rectangle(
        90,
        50,
        Common.random(10, 70),
        Common.random(12, 90),
        { restitution: 0.5 }
      );
      return rectangle;
    };

    let addPolygon = function() {
      let polygon = Bodies.polygon(
        90,
        30,
        Common.random(7),
        Common.random(45),
        { restitution: 0.7 }
      );
      return polygon;
    };

    $(".add-circle").on("click", function() {
      World.add(this.engine.world, addCircle());
    });

    $(".add-rectangle").on("click", function() {
      World.add(this.engine.world, addRectangle());
    });

    $(".add-polygon").on("click", function() {
      World.add(this.engine.world, addPolygon());
    });

    Engine.run(this.engine);
  }

  // addAPolygon = (event) => {
  //   event.preventDefault();
  //   World.add(engine.world, addPolygon());
  //   let addPolygon = Bodies.polygon(90, 30, Common.random(7), Common.random(45), {
  //     restitution: 0.7
  //   });
  // }

  render() {
    return (
      <div className="main_container">
        <div ref="scene" />
        <canvas id="canvas" className="canvas"></canvas>
        <button className="add-circle">Add Circle</button>
        <button className="add-rectangle">Add Rectangle</button>
        <button className="add-polygon">Add Polygon</button>
        {/* <button className="add-polygon" onClick={this.addAPolygon}>
          Add Polygon
        </button> */}
      </div>
    );
  }
}
export default Main;
