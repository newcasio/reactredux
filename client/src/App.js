import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hello mutha
          </a>
          /* this link to our backend, will only work on local computer. (ie
          localhost:3000, not even 5000 which is the backend which we want) */
          <a href="auth/google">Sign in with google</a>
          /*Magic fix in react.txt. This will auto detect whether dev
          environment or production and add the right start url. Error may still
          occur, see oauth.txt*/
        </header>
      </div>
    );
  }
}

export default App;
