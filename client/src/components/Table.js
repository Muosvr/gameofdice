import React, { Component } from "react";
import Dice from "./Dice";
import { Grid, Button, Input } from "semantic-ui-react";
import io from "socket.io-client";
// import { subToAction } from "./subToAction";

export default class Table extends Component {
  constructor() {
    super();

    // Set this port to http://localhost:5000 for development
    this.socket = io("http://letsplaydice.herokuapp.com:80");

    // if (process.env.NODE_ENV === "production") {
    //   this.socket = io("https://letsplaydice.herokuapp.com:80");
    // } else {
    //   this.socket = io("http://localhost:5000");
    // }

    this.state = {
      player: null,
      numberOfDice: 5,
      diceSet: [1, 2, 3, 4, 5],
      scoreBoard: null
    };
  }

  componentDidMount() {
    this.socket.on("reveal score", score => {
      const scoreBoard = Object.keys(score).map(key => {
        return (
          <li key={Math.random()} style={{ listStyleType: "none" }}>
            {key + ": " + score[key].join(" ")}
          </li>
        );
      });

      this.setState({ scoreBoard }, () => {
        console.log(score);
      });
      console.log("socket.on called");
    });
  }

  rollDice = () => {
    const newDiceSet = this.state.diceSet.map(item => {
      return Math.floor(Math.random() * 6) + 1;
    });
    this.setState({
      diceSet: newDiceSet
    });
    console.log(newDiceSet);
    if (this.socket) {
      this.socket.emit("dice action", this.state.player, newDiceSet);
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
    this.socket.emit("game action", "Revealed");
  };

  render() {
    // const socket = io("http://localhost:5000");
    // socket.on("game action", action => {
    //   console.log(action);
    // });
    // console.log("test");
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
        <ul>{this.state.scoreBoard}</ul>
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
