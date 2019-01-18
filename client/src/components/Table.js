import React, { Component } from "react";
import Dice from "./Dice";
import { Grid, Button } from "semantic-ui-react";


export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      numberOfDice: 5,
      diceSet: [1, 2, 3, 4, 5]
    };
  }
  rollDice = () => {
    const newDiceSet = this.state.diceSet.map(item => {
      return Math.floor(Math.random() * 6) + 1;
    });
    this.setState({
      diceSet: newDiceSet
    });
    console.log(newDiceSet);

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
