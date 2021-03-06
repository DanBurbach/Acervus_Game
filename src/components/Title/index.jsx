import React, { Component } from 'react';

import '../../assets/Title.css'
import "./../../assets/crt.css";

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.easyGame = this.easyGame.bind(this);
    this.hardGame = this.hardGame.bind(this);
    this.impossibleGame = this.impossibleGame.bind(this);
  }

  easyGame = () =>{
      this.props.history.push('./Easy');
  }

  hardGame = () => {
      this.props.history.push('./Hard');
  }

  impossibleGame = () => {
      this.props.history.push('./Impossible')
  }

  render() {
      return (
        <div className="frame">
          <div className="crt">
            <div className="title_main_container">
              <ul>
                <ol>
                  <h1>Acervus</h1>
                </ol>
                <ol>
                  <div className="title_definition">
                    Def: A multitude of objects of the same kind, rising in a
                    heap...
                  </div>
                </ol>
                <br/>
                <br/>
                <ol>
                  <button className="title_easy_game" onClick={this.easyGame}>
                    Easy Game
                  </button>
                </ol>
                <ol>
                  <button className="title_hard_game" onClick={this.hardGame}>
                    Hard Game
                  </button>
                </ol>
                <ol>
                  <button
                    className="title_impossible_game"
                    onClick={this.impossibleGame}
                  >
                    <div className="glitch">Impossible Game</div>
                  </button>
                </ol>
              </ul>
            </div>
          </div>
        </div>
      );
  }
}

export default Title;
