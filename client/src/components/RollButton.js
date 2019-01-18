import React, { Component } from "react";

export default class RollButton extends Component {
  constructor() {
    super();
    this.state = {
      diceSet: [1, 2, 3, 4, 5]
    };
  }
  rollDice = () => {
    const newDiceSet = this.state.diceSet.map(item => {
      return Math.floor(Math.random() * 6) + 1;
    });
    console.log(newDiceSet);
  };
  render() {
    return <div>{this.rollDice()} ABC</div>;
  }
}
