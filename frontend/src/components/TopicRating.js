import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Chart from 'react-apexcharts'
import { Component } from 'react';
import { Rating } from '@mui/material';
import Box from '@mui/material/Box';
import axios from "axios";
import {backendServer} from "../webConfig.js"

class TopicRating extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      options : { maintainAspectRatio: false },
      topicsAndRatings : [],
      brandname : localStorage.getItem("brand"),
      reviewtype : this.props.reviews
    }

  }

  componentDidMount()
  {
    console.log("reviews are from",this.state.reviews);
    axios
    .get(`${backendServer}/reviews/${this.state.brandname}/${this.state.reviewtype}`)
    .then((response,error) => {
      console.log("Pro are::", response.data);
      this.setState({
        topicsAndRatings : response.data[0].topicsAndRatings
      });
      console.log("topicandratings"+this.state.topicsAndRatings);
    });
  }

  render()
  {
    let topicsandratings = this.state.topicsAndRatings.map((row) =>
    {
      
   
    return (
      <React.Fragment>
              

        <Typography sx={{
         align : 'top',
          fontWeight: 'medium',
            
        }} color="inherit" noWrap><span style={{marginRight:'10px'}}><span>{row.topic_name}</span> </span> 

      <Rating 
  name="text-feedback"
  value={row.topic_rating}
  readOnly
  precision={0.5}
  >  </Rating>

</Typography>
   </React.Fragment>
    )});
      
      return(

        <div>
          <Title>Ratings</Title>
        {topicsandratings}
        </div>
      );
  }
}
export default TopicRating;

