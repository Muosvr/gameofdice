import React, { Component } from "react";
import Dice from "./Dice";
import { Grid, Button, Input } from "semantic-ui-react";
import io from "socket.io-client";
// import { subToAction } from "./subToAction";

export default class Table extends Component {
  constructor(props) {
    super(props);
    const socket = io("http://localhost:5000");
    // io.on("connection", socket => {
    //   socket.on("game action", action => {
    //     this.setState({ gameAction: action });
    //   });
    // });
    this.state = {
      player: null,
      socket: socket,
      numberOfDice: 5,
      diceSet: [1, 2, 3, 4, 5],
      gameAction: "Not revealed"
    };

    // subToAction(action => this.setState({ gameAction: action }));
    // socket.on("game action", (action) => {
    //   this.setState({ gameAction: action });
    // });
  }

  componentWillMount() {
    this.state.socket.on("game action", action => {
      this.setState({ gameAction: action }, () =>
        console.log("socket state changed")
      );
      console.log("socket.on called");
    });
  }
  // connect = () => {
  //   const socket = io("http://localhost:3000");
  //   this.setState({ socket });
  // };

  rollDice = () => {
    const newDiceSet = this.state.diceSet.map(item => {
      return Math.floor(Math.random() * 6) + 1;
    });
    this.setState({
      diceSet: newDiceSet
    });
    console.log(newDiceSet);
    if (this.state.socket) {
      this.state.socket.emit("dice action", this.state.player, newDiceSet);
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

  setPlayer = e => {
    this.setState({
      player: e.target.value
    });
    console.log(e.target.value);
  };

  revealDice = () => {
    this.state.socket.emit("game action", "Revealed");
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {/* <ul></ul> */}
        {/* <Button primary onClick={this.connect}>
          Connect
        </Button> */}
        <Input placeholder="Please enter your name" onChange={this.setPlayer} />
        <div style={{ marginTop: "10px" }} />
        <Button primary onClick={this.rollDice}>
          Roll Dice
        </Button>
        <p>{this.state.gameAction}</p>
        <Button onClick={this.revealDice}> Call Bullshit</Button>
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
