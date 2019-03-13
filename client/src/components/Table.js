import React, { Component } from "react";
import Dice from "./Dice";
import { Grid, Button } from "semantic-ui-react";
import io from "socket.io-client";

export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      numberOfDice: 5,
      diceSet: [1, 2, 3, 4, 5]
    };
  }
  connect = () => {
    const socket = io("http://localhost:3000");
    this.setState({ socket });
  };

  rollDice = () => {
    const newDiceSet = this.state.diceSet.map(item => {
      return Math.floor(Math.random() * 6) + 1;
    });
    this.setState({
      diceSet: newDiceSet
    });
    console.log(newDiceSet);
    if (this.state.socket) {
      this.state.socket.emit("dice action", newDiceSet);
    }
  };

  displayTable = () => {
    const table = this.state.diceSet.map((value, i) => {
      return (
        <Grid.Column key={i}>
          <Dice value={value} />
        </Grid.Column>
      );
    });
    return table;
  };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Button primary onClick={this.connect}>
          Connect
        </Button>
        <Button primary onClick={this.rollDice}>
          Roll Dice
        </Button>
        <Grid
          container
          columns={3}
          doubling
          stackable
          style={{ marginTop: "20px" }}
        >
          {this.displayTable()}
        </Grid>
      </div>
    );
  }
}
