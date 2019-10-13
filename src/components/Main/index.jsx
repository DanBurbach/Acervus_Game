import React, { Component } from "react";
import Matter, {Engine, Render, World, Bodies} from "matter-js";

import createRender from './createRender';
import Drag from './mouse';
import Circle from './circle';
import Rectangle from './rectangle';
import Polygon from './polygon'

import "./../../assets/Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      world: World,
      bodies: Bodies,
      engine: Matter.Engine.create(),
      score: 0,
      play_game: false
    };
    this.canvasSetUp = this.canvasSetUp.bind(this);
    this.gameSetUp = this.gameSetUp.bind(this);
    this.gameContainer = this.gameContainer.bind(this);
  }

  componentDidMount() {
    if (window.confirm("You want to start game?")) {
      this.setState({ play_game: true }, () => {
        console.log(this.state.play_game);
      });
      let canvas = document.getElementById("canvas");
      this.canvasSetUp(canvas);
      this.gameSetUp(canvas);
      let renderer = createRender(canvas, this.state.engine);
      Engine.run(this.state.engine);
      Render.run(renderer);

      window.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        Render.run(renderer);
      });
    } else {
      return null;
    }
  }

  canvasSetUp = canvas => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  gameSetUp = canvas => {
    this.gameContainer(canvas);
    var dragConstraint = Drag(canvas, this.state.engine);
    Matter.World.add(this.state.engine.world, [dragConstraint]);
  };

  gameContainer = canvas => {
    let containerW = canvas.width * 1.85;
    let containerH = canvas.height * 1.75;

    World.add(this.state.engine.world, [
      Bodies.rectangle(
        0,
        0,
        containerW,
        20, //Top
        { isStatic: true }
      ),
      Bodies.rectangle(
        0,
        0,
        20,
        containerH, //Left
        { isStatic: true }
      ),
      Bodies.rectangle(
        900,
        0,
        20,
        containerH, //Right
        { isStatic: true }
      ),
      Bodies.rectangle(0, 600, 750, 30, { isStatic: true }), //Bottom Left
      Bodies.rectangle(
        900,
        600,
        700,
        30, //Bottom Right
        { isStatic: true }
      )
    ]);
  };

  addObject = () => {
    let rndomNumber = Math.floor(Math.random() * 3) + 1;
    let circle = new Circle(90, 20);
    let rectangle = new Rectangle(90, 20);
    let polygon = new Polygon(90, 20);

    if (rndomNumber === 1) {
      Matter.World.add(this.state.engine.world, [circle]);
    } else if (rndomNumber === 2) {
      Matter.World.add(this.state.engine.world, [polygon]);
    } else if (rndomNumber === 3) {
      Matter.World.add(this.state.engine.world, [rectangle]);
    }
  };

  addCircle = () => {
    let circle = new Circle(90, 20);
    Matter.World.add(this.state.engine.world, [circle]);
  };

  addRectangle = () => {
    let rectangle = new Rectangle(90, 20);
      Matter.World.add(this.state.engine.world, [rectangle]);
  };

  addPolygon = () => {
    let polygon = new Polygon(90, 20);
      Matter.World.add(this.state.engine.world, [polygon]);
  };

  render() {
    return (
      <div className="main_container">
        <div ref="scene" />
        <canvas id="canvas" className="canvas"></canvas>
        <button className="add-circle" onClick={this.addCircle}>
          Add Circle
        </button>
        <button className="add-rectangle" onClick={this.addRectangle}>
          Add Rectangle
        </button>
        <button className="add-polygon" onClick={this.addPolygon}>
          Add Polygon
        </button>
        <button className="add-object" onClick={this.addObject}>
          Add Random Object
        </button>
      </div>
    );
  }
}


export default Main;
