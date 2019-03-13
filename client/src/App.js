import React, { Component } from "react";
import Table from "./components/Table";
import { Container } from "semantic-ui-react";
import io from "socket.io-client";

class App extends Component {
  state = {
    socket: null
  };
  // componentWillMount() {
  //   const socket = io("http://localhost:3000");
  // }
  connect = () => {
    const socket = io("http://localhost:3000");
    this.setState({
      socket: socket
    });
  };
  diceRolled = () => {
    if (this.state.socket) {
      this.state.socket.emit("dice action", "Rolled");
    }
  };
  render() {
    // this.connect();
    return (
      <div className="App">
        <Container style={{ marginTop: "30px", textAlign: "center" }}>
          <button onClick={this.connect}>Connect</button>
          <button onClick={this.diceRolled}>Roll</button>
          <h1 style={{ marginBottom: "50px" }}>Let's Play Dice!</h1>
          <Table />
        </Container>
      </div>
    );
  }
}

export default App;
