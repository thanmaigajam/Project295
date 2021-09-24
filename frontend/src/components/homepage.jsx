import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    // axios
    //   .get(
    //     Env.host +
    //       "/project-create/getproject_bycompanyid/" +
    //       this.state.companyid
    //   )
    //   .then(async (response) => {
    //     console.log("response from all projects", response);
    //     await this.setState({
    //       allprojects: response.data,
    //     });
    //     console.log("all projects", this.state.allprojects);
    //   });
  }

  render() {
    return (
      <React.Fragment>
        <div>
         
          <Link to="/twitter_reviews" className="remove-link-style ml-3">
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
        {/*<div className="mt-3">
          <div className="project-view-card d-flex flex-wrap">
            {/* {this.state.allprojects.map((project) => {
          <MediaCard projectName={project.name}></MediaCard>;
        })} 
            {this.state?.allprojects?.map((project) => (
              <MediaCard
                projectName={project.name}
                projectDesc={project.description}
                projectId={project.id}
              />
            ))}
          </div>
            </div>*/}
      </React.Fragment>
    );
  }
}

export default HomePage;