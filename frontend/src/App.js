import "./App.css";
import Routes from "./Routes";
import { Router } from "react-router-dom";
import { history } from "./utils/history";
import Navbar from "./components/navbar";
import CovidSymptomChecker from "./components/covid-symptom-checker";
import HomePage from "./components/homepage";

function App() {
  return (
    <div className="App">
       <Routes/>
    </div>
  );
}

export default App;
