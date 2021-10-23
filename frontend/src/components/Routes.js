import React ,{Component, Fragment} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CovidSymptomChecker from "./covid-symptom-checker";
import Navbar from "./navbar";
import YelpReviews from "./yelp_reviews";
import TweetReviews from "./tweet_reviews";
import Dashboard from "./Dashboard";
import Signup from "./Signup";
import Login from "./Login";
import HomePage from "./Homepage";
import Sample from "./Sample";

class Routes extends Component {
  render() {
    return (
      <div>
        {localStorage.getItem("token") && (
          <Fragment>
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/sample" component={Sample}/>
            <Route path="/covidSymptomChecker" component={CovidSymptomChecker} />
            <Route path="/yelp_reviews" component={YelpReviews}/>
            <Route path="/twitter_reviews" component={TweetReviews}/>
            <Route path="/homepage" component={HomePage}/>


          </Fragment>
        )}
       

        {!localStorage.getItem("token") && (
          <Fragment>
            <Route exact path="/" component={Login} />
            <Route path = "/signup" component={Signup}/>
          </Fragment>
        )}
      </div>
    );
  }
}


    
    export default Routes;
  

