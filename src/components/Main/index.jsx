import React, { Component } from "react";
import Matter, {Engine, Render, World, Bodies, Events} from "matter-js";

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
      play_game: false,
      newscore: false
    };
    this.canvasSetUp = this.canvasSetUp.bind(this);
    this.gameSetUp = this.gameSetUp.bind(this);
    this.gameContainer = this.gameContainer.bind(this);
    this.gameBodiesRemover = this.gameBodiesRemover.bind(this);
    this.decreaseScore = this.decreaseScore.bind(this);
  }

  componentDidMount() {
    if (window.confirm("You want to start game?")) {
      this.setState({ play_game: true }, () => {
        console.log(this.state.play_game);
        console.log(this.state.score);
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
    this.gameBodiesRemover(canvas);
    var dragConstraint = Drag(canvas, this.state.engine);
    Matter.World.add(this.state.engine.world, [dragConstraint]);
  };

  gameContainer = canvas => {
    let containerW = canvas.width * 1.75;
    let containerH = canvas.height * 1.75;

    World.add(this.state.engine.world, [
      //Top
      Bodies.rectangle(0, 0, containerW, 20, { isStatic: true }),
      //Left Wall
      Bodies.rectangle(0, 0, 20, containerH, { isStatic: true }),
      //Right Wall
      Bodies.rectangle(900, 0, 20, containerH, { isStatic: true }),
      //Bottom Left Floor
      Bodies.rectangle(0, 600, 600, 30, { isStatic: true }),
      //Platform
      Bodies.rectangle(600, 500, 80, 15, { isStatic: true }),
      //Holder wall
      Bodies.rectangle(300, 400, 15, 425, { isStatic: true })
    ]);
  };
  
  gameBodiesRemover = () => {
    let decreaseScore = this.decreaseScore.bind(this);
    const setState = this.setState.bind(this);
    const newscore = this.state.newscore;

    let scoreChanger = function(){
      setState({ newscore: true });
    };

    let lowerScore = function() {
      setState({ newscore: false });
    };

    //deletion boundary rectangle
    const collider = Bodies.rectangle(600, 650, 1600, 10, {
      isSensor: true,
      isStatic: true,
      render: {
        fillStyle: "transparent",
        strokeStyle: "red",
        lineWidth: 2
      }
    });
    World.add(this.state.engine.world, [collider]);

    Events.on(this.state.engine, "collisionStart", function(event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i !== j; ++i) {
        var pair = pairs[i];
        if (pair.bodyA === collider) {
          pair.bodyB.render.strokeStyle = "green";
          console.log('touching: ' + newscore);
          scoreChanger();
          decreaseScore();
        } else if (pair.bodyB === collider) {
          pair.bodyA.render.strokeStyle = "green";
        }
      }}
    );
    
    Events.on(this.state.engine, "collisionEnd", function(event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i !== j; ++i) {
        var pair = pairs[i];
        if (pair.bodyA === collider) { 
          //removes object after they stop touching the removal rectangle;
          World.remove(this.world, pair.bodyB);          
          pair.bodyA.render.strokeStyle = "red";
          lowerScore();
          console.log('touched, now deleted: ' + newscore);
        } else if (pair.bodyB === collider) {
          pair.bodyA.render.strokeStyle = "red";
        }
      }}
    );
  };

  addObject = () => {
    let rndomNumber = Math.floor(Math.random() * 3) + 1;
    if (rndomNumber === 1) {
      this.addCircle();
    } else if (rndomNumber === 2) {
      this.addPolygon();
    } else if (rndomNumber === 3) {
      this.addRectangle();
    }
  };

  addCircle = () => {
    let circle = new Circle();
    Matter.World.add(this.state.engine.world, [circle]);
    this.setState({ score: this.state.score + 100 }, () => {
      console.log(this.state.score);
    });
  };

  addRectangle = () => {
    let rectangle = new Rectangle(90, 20);
    Matter.World.add(this.state.engine.world, [rectangle]);
    this.setState({ score: this.state.score + 20 }, () => {
      console.log(this.state.score);
    });
  };

  addPolygon = () => {
    let polygon = new Polygon(90, 20);
    Matter.World.add(this.state.engine.world, [polygon]);
    this.setState({ score: this.state.score + 50 }, () => {
      console.log(this.state.score);
    });
  };

  decreaseScore = () => {
    if (this.state.newscore === true) {
      this.setState({ score: this.state.score - 150 }, () => {
        console.log(this.state.score);
      });
    } else {
        console.log("status of newscore: " + this.state.newscore);
    }
  };

  render() {

    return (
      <div className="main_container">
        <div className="main_component">
          <canvas id="canvas" className="canvas"></canvas>
        </div>
        <div className="main_component">
          <ul>
            <ol>
              <div id='userScore'>
                Score: {this.state.score}
              </div>
            </ol>
            <ol>
              <button className="add-circle" onClick={this.addCircle}>
                Add Circle
              </button>
            </ol>
            <ol>
              <button className="add-rectangle" onClick={this.addRectangle}>
                Add Rectangle
              </button>
            </ol>
            <ol>
              <button className="add-polygon" onClick={this.addPolygon}>
                Add Polygon
              </button>
            </ol>
            <ol>
              <button className="add-object" onClick={this.addObject}>
                Add Random Object
              </button>
            </ol>
          </ul>
        </div>
      </div>
    );
  }
}

export default Main;
