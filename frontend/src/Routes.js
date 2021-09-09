import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CovidSymptomChecker from "./components/covid-symptom-checker";
import Navbar from "./components/navbar";
import HomePage from "./components/homepage";
import YelpReviews from "./components/yelp_reviews";
import { Redirect, withRouter } from "react-router";

class Routes extends React.Component {
  render() {
    return (
      <div className="app-routes">
        <Router>
        
         <Navbar/>
          <Redirect to = '/homepage'/>
          <Route path="/covidSymptomChecker" component={CovidSymptomChecker} />
          
          <Route path="/yelp_reviews" component={YelpReviews}/>
          </Router>     
      </div>
    );
  }
}

export default Routes;
