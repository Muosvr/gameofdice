import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";

export default class PlayerSignIn extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.name, "has signed in");
    this.props.setPlayer(this.state.name);
  };
  render() {
    return (
      <div>
        <Input
          focus
          name="name"
          value={this.state.name}
          placeholder="Please enter your name"
        >
          <input onChange={this.handleChange} />
          <Button primary onClick={this.handleSubmit} type="submit">
            Submit
          </Button>
        </Input>
      </div>
    );
  }
}
