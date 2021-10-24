import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CovidSymptomChecker from "./covid-symptom-checker";
import Navbar from "./navbar";
import YelpReviews from "./yelp_reviews";
import TweetReviews from "./twitter_reviews";
import Signup from "./Signup";
import Login from "./Login";
import HomePage from "./HomePage";
import Sample from "./Sample";
import RedditReviews from "./reddit_reviews";

class Routes extends Component {
  render() {
    return (
      <div>
        {localStorage.getItem("token") && (
          <Fragment>
            <Navbar></Navbar>
            <Route path="/homepage" component={HomePage} />
            <Route path="/reddit_reviews" component={RedditReviews} />

            {/* <Route exact path="/" component={Login} /> */}
            <Route path="/sample" component={Sample} />
            <Route
              path="/covidSymptomChecker"
              component={CovidSymptomChecker}
            />
            <Route path="/yelp_reviews" component={YelpReviews} />
            <Route path="/twitter_reviews" component={TweetReviews} />
          </Fragment>
        )}

        {!localStorage.getItem("token") && (
          <Fragment>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
          </Fragment>
        )}
      </div>
    );
  }
}

export default Routes;
