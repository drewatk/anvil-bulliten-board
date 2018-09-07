import React, { Component } from "react";
import { List } from "./List";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to The Anvil Bulletin Board</h1>
        </header>
        <List />
      </div>
    );
  }
}

export default App;
