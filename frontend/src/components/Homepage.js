import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Navbar from "./navbar"


class HomePage extends Component{
  render() {

  return (
    <div>
      <Navbar/>
          <Link to="/dashboard" className="remove-link-style ml-3">
            <Button variant="outlined" color="primary">
              Twitter Reviews
            </Button>
          </Link> 
          <Link
            to="/yelp_reviews"
            className="remove-link-style ml-3"
          >
            <Button variant="outlined" color="primary">
              Yelp Reviews
            </Button>
          </Link>
          <Link
            to="/reddit_reviews"
            className="remove-link-style ml-3"
          >
            <Button variant="outlined" color="primary">
              Reddit Reviews
            </Button>
          </Link>
            </div>
        
  );
}
}

export default HomePage;