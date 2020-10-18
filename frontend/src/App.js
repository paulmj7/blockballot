import React, { Component } from 'react';
import './App.css';
import BallotForm from "./BallotForm";
import Jumbotron from "./Jumbotron";

class App extends Component {
  constructor() {
    super();
    this.state = {
      window: "1"
    };
    
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event) {
    event.preventDefault();
    this.setState({ window: event.target.value });
  };
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" value="1" onClick={this.handleChange}>
            <img src="https://getbootstrap.com/docs/4.5/assets/brand/bootstrap-solid.svg" value="1" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy"/>
            BlockBallot
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" value="2" onClick={this.handleChange}>Ledger</a>
              </li>
            </ul>
          </div>
        </nav>
        <Jumbotron/>
        {this.state.window === "1" &&
          <BallotForm/>
        }
        {this.state.window === "2" &&
          <p>Hello Ledger</p>
        }
      </div>
    );
  };
}

export default App;
