import React, { useState } from 'react';
import './App.css';
import BallotForm from "./BallotForm";
import Jumbotron from "./Jumbotron";

function App() {
  const [window, setWindow] = useState("1");
  const handleClick = (event) => {
    event.preventDefault();
    setWindow(event.target.value);
  }
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" value="1" onClick={handleClick}>
          <img src="https://getbootstrap.com/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy"/>
          BlockBallot
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" value="2" onClick={handleClick}>Ledger</a>
            </li>
          </ul>
        </div>
      </nav>
      <Jumbotron/>
      {window === "1" &&
        <BallotForm/>
      }
      {window === "2" &&
        <p>Hello Ledger</p>
      }
    </div>
  );
}

export default App;
