import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TopicRating from "./TopicRating";
import Deposits from "./Donut";
import Orders from "./Orders";
import Navbar from "./navbar";
import LineGraph from "./LineGraph";
import ChoroplethMap from "./ChoroplethMap";
import Title from "./Title";
import {backendServer} from "../webConfig.js";
import CircularProgress from '@mui/material/CircularProgress';


function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', textAlign : 'center' }}>
      <CircularProgress> Please Wait...</CircularProgress>
    </Box>
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
   this.state = {
     loading : true,
     data : {},
     reviewtype : "all",
     brandname : localStorage.getItem('brand'),
     location:"unitedstates"
   }
  }


  
 componentDidMount() {
   console.log("in home page")
   axios
     .get(`${backendServer}/reviews/get_topic_rating/${this.state.brandname}/${this.state.reviewtype}`)
     .then((response,error) => {
       console.log("Pro are::", response.data);
       if(response.data != null)
       {
         console.log("rating")
       this.setState({
         data : response.data.data,
         loading : false,
         
       });
       console.log("topicandratings are -------------"+this.state.topicsAndRatings);
 
     }
      
     });
    }



  render() {
    
    return (
      <React.Fragment>
        <div style = {{marginTop : "100px"}}>
         
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

          <Navbar />
      <container id="myDiv"></container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {this.state.loading ? <CircularIndeterminate /> : 
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={4} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <TopicRating reviews="all" reviewdata={this.state.data}/>
                </Paper>
              </Grid>
          
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits reviews="all" reviewdata={this.state.data}/>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    
                    display: 'flex',
                    flexDirection: 'column',
                    
                  }}
                >
                  <Orders reviews="all" reviewdata={this.state.data}/>
                </Paper>
              </Grid>


            
       
           

          

         
            </Grid>}
            </Container>
        </div>
      
      </React.Fragment>
    );
  }
}

export default HomePage;