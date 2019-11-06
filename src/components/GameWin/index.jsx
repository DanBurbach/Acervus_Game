import React, { Component } from "react";
import PropTypes from "prop-types";

import '../../assets/gameEnd.css';

class GameEndAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClose = event => {
    this.props.onClose && this.props.onClose(event);
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal" id="modal">
        <h2>Modal Window</h2>
        <div className="content">{this.props.children}</div>
        <div className="actions">
          <button className="toggle-button" onClick={this.onClose}>
            close
          </button>
        </div>
      </div>
    );
  }
}
GameEndAnnouncement.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default GameEndAnnouncement;

