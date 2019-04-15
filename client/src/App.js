import React, { Component } from "react";
import Table from "./components/Table";
import { Container } from "semantic-ui-react";
// import io from "socket.io-client";

class App extends Component {

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
