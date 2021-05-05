import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CovidSymptomChecker from "./components/covid-symptom-checker";

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Route path="/covidSymptomChecker" component={CovidSymptomChecker} />
      </div>
    );
  }
}

export default Routes;
