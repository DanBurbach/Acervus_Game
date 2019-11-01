import React, { Component } from 'react';
// import { Route } from "react-router-dom";

// import * as ROUTES from "../../constants/routes";
// import Easy from "../Easy";

import '../../assets/Title.css'

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.easyGame = this.easyGame.bind(this);
  }

easyGame = () =>{
    this.props.history.push('/Easy');
}

render() {
    return (
        <div className="title_main_container">
            <ul>
                <ol>
                    <h1>Acervus</h1>
                </ol>
                <ol>
                    <div className="title_definition">
                        Def: A multitude of objects of the same kind, rising in a heap...
                    </div>
                </ol>
                <ol>
                    <button
                        className="title_easy_game"
                        onClick={this.easyGame}
                    >Easy Game</button>
                </ol>
            </ul>
        </div>
    );
}
}

export default Title;
