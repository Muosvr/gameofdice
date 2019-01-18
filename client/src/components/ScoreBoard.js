import React, { Component } from "react";

export default class ScoreBoard extends Component {
  constructor() {
    super();
    this.state = {
      player1: [1, 3, 6, 1, 4],
      player2: [2, 1, 3, 2, 2]
    };
  }
  render() {
    return <div />;
  }
}
