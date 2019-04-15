import React, { Component } from "react";
import Dice from "./Dice";
import PlayerSignIn from "./PlayerSignIn";
import { Grid, Button } from "semantic-ui-react";
import io from "socket.io-client";

export default class Table extends Component {
  constructor() {
    super();

    // Set this port to http://localhost:5000 for development
    // this.socket = io("http://localhost:5000");
    // this.socket = io("http://letsplaydice.herokuapp.com:80");

    if (process.env.NODE_ENV === "production") {
      this.socket = io("http://letsplaydice.herokuapp.com:80");
    } else {
      this.socket = io("http://localhost:5000");
    }

    this.state = {
      player: null,
      players: ["none"],
      numberOfDice: 5,
      diceSet: [1, 2, 3, 4, 5],
      everyonesDice: null,
      table: null,
      playerRolled: " ",
      id: null
    };

    this.socket.on("id assignment", id => {
      console.log("id assigned: ", id)
      this.setState({ id })
    })

    this.socket.on("new player", players => {
      this.setState({
        players: players
      });
    });
  }


  componentDidMount() {
    this.socket.on("player left", players => {
      this.setState({ players });
    });

    this.socket.on("player rolled", player => {
      this.setState(
        {
          playerRolled: player + " just rolled"
        },
        () => {
          setTimeout(() => {
            this.setState({ playerRolled: " " });
          }, 500);
        }
      );
    });

    // Show everyone's dice when someone calls bullshit
    this.socket.on("reveal score", gameBoard => {
      const everyonesDice = Object.keys(gameBoard).map((playerId, j) => {
        console.log(gameBoard);
        const onePersonsDice = gameBoard[playerId].dice.map((dice, i) => {
          return (
            <Grid.Column key={i}>
              <Dice value={dice} />
            </Grid.Column>
          );
        });

        return (
          <div key={j}>
            <h2 style={{ marginTop: "20px" }}>{gameBoard[playerId].name}</h2>
            <Grid container style={{ marginTop: "0px" }}>
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
        this.socket.emit("dice action", this.state.id, newDiceSet);
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
        <Grid container columns={5} doubling style={{ marginTop: "20px" }}>
          {dice}
        </Grid>
      );
      this.setState({ table });
    }
  };

  setPlayer = player => {
    this.setState({ player });
    console.log(player);

    // Declare to server a new player has joined and send over initial dice set
    this.socket.emit("new player", player);
  };

  revealDice = () => {
    this.socket.emit("game action", "reveal");
  };

  showPlayerNames = () => {
    const players = this.state.players.map(playerObj => playerObj.name).join(", ");
    return players
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {!this.state.player && (
          <PlayerSignIn players={this.state.players} setPlayer={this.setPlayer} styel={{ width: "50px" }} />
        )}
        {this.state.player && <h2>{this.state.player}</h2>}
        <p>Players online: {this.showPlayerNames()}</p>
        <div style={{ marginTop: "10px" }} />
        <Button primary disabled={!this.state.player} onClick={this.rollDice}>
          Roll Dice
        </Button>
        <p >{this.state.playerRolled}</p>
        <ul>{this.state.everyonesDice}</ul>
        <Button disabled={!this.state.player} onClick={this.revealDice}> Call Bullshit</Button>

        {this.state.table}
      </div>
    );
  }
}
