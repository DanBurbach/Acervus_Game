import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import * as ROUTES from "../constants/routes";

import Title from './Title';
import Easy from "./Easy";
import Hard from "./Hard";
import Impossible from "./Impossible";
import Test from './Impossible/test';
import Error404 from "./Error404";

import "./../assets/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={ROUTES.TITLE} component={Title} />
            <Route exact path={ROUTES.EASY} component={Easy} />
            <Route exact path={ROUTES.HARD} component={Hard} />
            <Route exact path={ROUTES.IMPOSSIBLE} component={Impossible} />
            <Route exact path={ROUTES.TEST} component={Test} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
