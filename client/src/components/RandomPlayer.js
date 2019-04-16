import React, { Component } from 'react'
import GenRandomDice from './utils/GenRandomDice';
import GenRandomName from './utils/GenRandomName';
import io from "socket.io-client";

// Need to put everything to in the backend

export default class RandomPlayer extends Component {
  NAMES = []
  constructor() {
    super();
    this.state = {
      diceSet: GenRandomDice(6),
      name: GenRandomName(),
      id: null
    }

    if (process.env.NODE_ENV === "production") {
      this.socket = io("http://letsplaydice.herokuapp.com:80");
    } else {
      this.socket = io("http://localhost:5000");
    }

    this.socket.on("id assignment", id => {
      console.log("id assigned: ", id)
      this.setState({ id })
    })

    this.socket.emit("new player", this.state.name)

    // this.socket.on("player rolled", player => {
    //   const diceSet = GenRandomDice(6);
    //   this.setState({ diceSet });
    //   this.socket.emit("dice action", this.state.id, diceSet);
    // })
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}
