import "./App.css";
import Routes from "./Routes";
import { Router } from "react-router-dom";
import { history } from "./utils/history";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar></Navbar>
        <Router history={history}>
          <Routes />
          {/* <h1>Covid Symptom Checker</h1> */}
        </Router>
      </header>
    </div>
  );
}

export default App;
