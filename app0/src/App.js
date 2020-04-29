import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { name: "Max", age: 28 },
      { name: "Manu I react to click", age: 29 },
      { name: "Stephanie", age: 26 },
    ],
    otherState:
      "setState merges current state with the update, this is not removed",
  };

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: "Manu", age: 29 },
        { name: "Stephanie", age: 27 },
      ],
    });
  };

  render() {
    return (
      <div className="App">
        <h1>I'm a react app</h1>
        <p>This is really working</p>
        <button onClick={() => this.switchNameHandler("Maximilian")}>
          Switch name
        </button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
        />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, "Max!!!!")}
        >
          My hobbies: Racing
        </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        />
        <p>{this.state.otherState}</p>
      </div>
    );
  }
}

export default App;
