import React, { Component } from "react";
import LaunchPad from "./component/LaunchPad";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import DisplayMessage from "./component/DisplayMessage";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand fas fa-home" to="/">
              Home
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a
                    className="nav-link"
                    rel="noopener noreferrer"
                    href="https://www.geektrust.in/"
                    target="_blank"
                  >
                    GeekTrust Home
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <hr />

          <Route exact path="/" component={LaunchPad} />
          <Route exact path="/DisplayMessage" component={DisplayMessage} />
        </div>
      </Router>
    );
  }
}

export default App;
