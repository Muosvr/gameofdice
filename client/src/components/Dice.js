import React, { Component } from "react";
import { Image } from "semantic-ui-react";

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
        <Image src={"./images/" + this.props.value + ".png"} alt="Dice" />
      </div>
    );
  }
}
