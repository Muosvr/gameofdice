import React, { Component } from "react";

export default class Dice extends Component {
  constructor() {
    super();
    this.state = {
      faceValue: 2
    };
  }
  render() {
    return (
      <div style={{ display: "inlineBlock" }}>
        <img src={"./images/" + this.props.value + ".png"} alt="Dice" />
      </div>
    );
  }
}
