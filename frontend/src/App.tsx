import './App.css';
import BallotForm from "./BallotForm";
import Jumbotron from "./Jumbotron";
import Ledger from "./Ledger";

const App = () => {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">
          <img src="https://getbootstrap.com/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy"/>
          BlockBallot
        </a>
      </nav>
      <Jumbotron/>
      <BallotForm/>
      <Ledger/>
    </div>
  )
}

export default App;
