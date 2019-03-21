import React, { Component } from "react";
import Dice from "./Dice";
import { Grid, Button, Input } from "semantic-ui-react";
import io from "socket.io-client";
// import { subToAction } from "./subToAction";

export default class Table extends Component {
  constructor() {
    super();

    // Set this port to http://localhost:5000 for development
    // this.socket = io("http://localhost:5000");
    this.socket = io("http://letsplaydice.herokuapp.com:80");

    // if (process.env.NODE_ENV === "production") {
    //   this.socket = io("https://letsplaydice.herokuapp.com:80");
    // } else {
    //   this.socket = io("http://localhost:5000");
    // }

    this.state = {
      player: null,
      numberOfDice: 5,
      diceSet: [3, 1, 2, 4, 6],
      everyonesDice: null,
      table: null
    };
  }

  componentDidMount() {
    this.socket.on("reveal score", gameBoard => {
      // const everyonesDice = Object.keys(gameBoard).map(key => {
      //   return (
      //     <li key={Math.random()} style={{ listStyleType: "none" }}>
      //       {key + ": " + gameBoard[key].join(" ")}
      //     </li>
      //   );
      // });

      // this.setState({ everyonesDice }, () => {
      //   console.log(gameBoard);
      // });

      const everyonesDice = Object.keys(gameBoard).map((player, j) => {
        const onePersonsDice = gameBoard[player].map((dice, i) => {
          return (
            <Grid.Column key={i}>
              <Dice value={dice} />
            </Grid.Column>
          );
        });

        return (
          <div>
            <h2 style={{ marginTop: "20px" }}>{player}</h2>
            <Grid
              container
              columns={3}
              doubling
              stackable
              style={{ marginTop: "0px" }}
            >
              <Grid.Row columns={5} key={j}>
                {onePersonsDice}
              </Grid.Row>
            </Grid>
          </div>
        );
      });

      this.setState({
        table: everyonesDice
      });
      console.log("socket.on called");
    });
    this.setTable();
  }

  rollDice = () => {
    if (this.state.player) {
      this.setState({
        everyonesDice: null
      });
      const newDiceSet = this.state.diceSet.map(item => {
        return Math.floor(Math.random() * 6) + 1;
      });
      this.setState(
        {
          diceSet: newDiceSet
        },
        () => this.setTable()
      );
      console.log(newDiceSet);
      if (this.socket) {
        this.socket.emit("dice action", this.state.player, newDiceSet);
      }
    }
  };

  setTable = () => {
    if (this.state.diceSet) {
      const dice = this.state.diceSet.map((value, i) => {
        return (
          <Grid.Column key={i}>
            <Dice value={value} />
          </Grid.Column>
        );
      });
      const table = (
        <Grid
          container
          columns={3}
          doubling
          stackable
          style={{ marginTop: "20px" }}
        >
          {dice}
        </Grid>
      );
      this.setState({ table });
    }
  };

  setPlayer = e => {
    this.setState({
      player: e.target.value
    });
    console.log(e.target.value);
  };

  revealDice = () => {
    this.socket.emit("game action", "reveal");
  };
  // clearHistory = () => {
  //   this.socket.emit("game action", "clear history");
  // };

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

        <ul>{this.state.everyonesDice}</ul>
        <Button onClick={this.revealDice}> Call Bullshit</Button>
        {/* <Button onClick={this.clearHistory}>Clear history</Button> */}
        {/* <Grid
          container
          columns={3}
          doubling
          stackable
          style={{ marginTop: "20px" }}
        >
          {this.state.table}
        </Grid> */}
        {/* <Grid container doubling stackable style={{ marginTop: "20px" }}> */}
        {this.state.table}
        {/* </Grid> */}
      </div>
    );
  }
}
