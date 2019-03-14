import React, { Component } from "react";
import Table from "./components/Table";
import { Container } from "semantic-ui-react";
// import io from "socket.io-client";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   const socket = io("http://localhost:3000");
  //   this.setState({ socket });
  // }
  // componentWillMount() {
  //   const socket = io("http://localhost:3000");
  // }
  // connect = () => {
  //   const socket = io("http://localhost:3000");
  //   this.setState({
  //     socket: socket
  //   });
  // };
  // diceRolled = () => {
  //   if (this.state.socket) {
  //     this.state.socket.emit("dice action", "Rolled");
  //   }
  // };
  // setGameState = action => {
  //   this.setState({
  //     reveal: action.reveal
  //   });
  // };
  render() {
    // this.connect();
    return (
      <div className="App">
        <Container style={{ marginTop: "30px", textAlign: "center" }}>
          <h1 style={{ marginBottom: "50px" }}>Let's Play Dice!</h1>
          <Table />
        </Container>
      </div>
    );
  }
}

export default App;
