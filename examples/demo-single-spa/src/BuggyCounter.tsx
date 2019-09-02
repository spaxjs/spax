import React from "react";

export default class BuggyCounter extends React.Component {
  state = { counter: 0 };

  handleClick = () => {
    this.setState(({counter}: any) => ({
      counter: counter + 1,
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error("I crashed!");
    }
    return (
      <h1 onClick={this.handleClick}>{this.state.counter}</h1>
    );
  }
}
