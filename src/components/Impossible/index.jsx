import React, { Component } from "react";
import Matter, { Engine, Render, World, Bodies, Events, Runner } from "matter-js";
import ReactModal from "react-modal";

import createRender from "../Gameplay/createRender";
import Drag from "../Gameplay/mouse";
import Circle from "../Gameplay/circle";
import Rectangle from "../Gameplay/rectangle";
import Polygon from "../Gameplay/polygon";
import Trapezoid from "../Gameplay/trapezoid";

import "./../../assets/Easy.css";
import "./../../assets/gameEnd.css";
import "./../../assets/crt.css";

class Impossible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      world: World,
      bodies: Bodies,
      engine: Matter.Engine.create(),
      runner: Runner,
      score: 0,
      play_game: false,
      newscore: false,
      winOpen: false,
      loseOpen: false,
      counter: 0
    };
    this.canvasSetUp = this.canvasSetUp.bind(this);
    this.gameSetUp = this.gameSetUp.bind(this);
    this.gameContainer = this.gameContainer.bind(this);
    this.runnerPlatform = this.runnerPlatform.bind(this);
    this.gameBodiesRemover = this.gameBodiesRemover.bind(this);
    this.decreaseScore = this.decreaseScore.bind(this);
    this.gameEnder = this.gameEnder.bind(this);
    this.anotherGame = this.anotherGame.bind(this);
  }

  componentDidMount() {
    if (window.confirm("You want to start an impossible game?")) {
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
      this.anotherGame();
    }
  }

  canvasSetUp = canvas => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  gameSetUp = canvas => {
    this.gameContainer(canvas);
    this.runnerPlatform(canvas);
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
      Bodies.rectangle(0, 600, 400, 30, { isStatic: true }),
      //Holder wall
      Bodies.rectangle(200, 585, 15, 50, { isStatic: true })
    ]);
  };

  runnerPlatform = () => {
    var runner = Runner.create();

    Runner.run(runner, this.state.engine);

    let counter = this.state.counter;

    let body = Bodies.rectangle(600, 500, 120, 15, {
      isStatic: true,
      friction: 1,
      restitution: 0.8,
      render: {
        fillStyle: "transparent",
        strokeStyle: '#66EE66',
        lineWidth: 1,
      }
    });
      counter = -0.125;

      World.add(this.state.engine.world, [body])

      Events.on(this.state.engine, "beforeUpdate", function(event) {
        counter += 0.005;

        if (counter < 0) {
          return;
        }

        var px = 550 + 200 * Math.sin(counter);

        // body is static so must manually update velocity for friction to work
        Matter.Body.setVelocity(body, { x: px - body.position.x, y: 0 });
        Matter.Body.setPosition(body, { x: px, y: body.position.y });
      });
  };

  gameBodiesRemover = () => {
    let gameEnder = this.gameEnder.bind(this);
    let decreaseScore = this.decreaseScore.bind(this);
    const setState = this.setState.bind(this);
    const newscore = this.state.newscore;

    let scoreChanger = function() {
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
          console.log("touching: " + newscore);
          scoreChanger();
          decreaseScore();
        } else if (pair.bodyB === collider) {
          pair.bodyA.render.strokeStyle = "green";
        }
      }
    });

    Events.on(this.state.engine, "collisionEnd", function(event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i !== j; ++i) {
        var pair = pairs[i];
        if (pair.bodyA === collider) {
          //removes object after they stop touching the removal rectangle;
          World.remove(this.world, pair.bodyB);
          pair.bodyA.render.strokeStyle = "red";
          lowerScore();
          gameEnder();
          console.log("touched, now deleted: " + newscore);
        } else if (pair.bodyB === collider) {
          pair.bodyA.render.strokeStyle = "red";
        }
      }
    });
  };

  addObject = () => {
    let rndomNumber = Math.floor(Math.random() * 4) + 1;
    if (rndomNumber === 1) {
      let circle = new Circle();
      Matter.World.add(this.state.engine.world, [circle]);
      this.setState({ score: this.state.score + 100 }, () => {
        console.log(this.state.score);
      });
      this.gameEnder();
    } else if (rndomNumber === 2) {
      let polygon = new Polygon(90, 20);
      Matter.World.add(this.state.engine.world, [polygon]);
      this.setState({ score: this.state.score + 50 }, () => {
        console.log(this.state.score);
      });
      this.gameEnder();
    } else if (rndomNumber === 3) {
      let rectangle = new Rectangle(90, 20);
      Matter.World.add(this.state.engine.world, [rectangle]);
      this.setState({ score: this.state.score + 20 }, () => {
        console.log(this.state.score);
      });
      this.gameEnder();
    } else if (rndomNumber === 4) {
      let trapezoid = new Trapezoid(90, 20);
      Matter.World.add(this.state.engine.world, [trapezoid]);
      this.setState({ score: this.state.score + 30 }, () => {
        console.log(this.state.score);
      });
      this.gameEnder();
    }
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

  gameEnder = () => {
    if (this.state.score >= 1000) {
      this.setState({
        winOpen: true
      });
      return <div>You won!</div>;
    } else if (
      -1000 >= this.state.score ||
      this.state.engine.world.bodies >= 500
    ) {
      this.setState({
        loseOpen: true
      });
      return <div>You lost!</div>;
    } else {
      return <div>Score: {this.state.score} </div>;
    }
  };

  anotherGame = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="frame">
        <div className="crt">
          <div className="easy_container">
            <ReactModal
              className="Modal_win"
              isOpen={this.state.winOpen}
              ariaHideApp={false}
            >
              <div className="gameEnd_frame">
                <div className="crt">
                  <div id="userEndGameTitle">You Won!</div>
                  <button className="another_game" onClick={this.anotherGame}>
                    End Game
                  </button>
                  <div className="userWin_back"></div>
                </div>
              </div>
            </ReactModal>
            <ReactModal
              className="Modal_lose"
              isOpen={this.state.loseOpen}
              ariaHideApp={false}
            >
              <div className="gameEnd_frame">
                <div className="crt">
                  <div id="userEndGameTitle">You Lost!</div>
                  <button className="another_game" onClick={this.anotherGame}>
                    End Game
                  </button>
                  <div className="userLose_back"></div>
                </div>
              </div>
            </ReactModal>
            <div className="easy_component">
              <div className="canvas_component">
                <canvas id="canvas" className="canvas"></canvas>
              </div>
            </div>
            <div className="easy_component">
              <div className="board_component">
                <ul>
                  <ol>
                    <div className="title_component">Acervus Game</div>
                  </ol>
                  <ol>
                    <div id="userScore">Win: Score 1000 Lose: Score -1000</div>
                  </ol>
                  <ol>
                    <div id="userScore">Score: {this.state.score}</div>
                  </ol>
                  <ol>
                    <button className="add-object" onClick={this.addObject}>
                      Add Random Object
                    </button>
                  </ol>
                  <ol>
                    <button className="quit_game" onClick={this.anotherGame}>
                      Quit
                    </button>
                  </ol>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Impossible;
