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
    console.log("reviews are from",this.state.reviewtype);
    axios
    .get(`${backendServer}/reviews/get_topic_rating/${this.state.brandname}/${this.state.reviewtype}`)
    .then((response,error) => {
      console.log("Pro are::", response.data);
      if(response.data != null)
      {
        console.log("rating")
      this.setState({
        topicsAndRatings : response.data.data.topicWiseRatings
      });
      console.log("topicandratings are -------------"+this.state.topicsAndRatings);

    }
     
    });
    // this.setState({
    //   topicsAndRatings : null
    // });
  }

  render()
  {
    let topicsandratings =  this.state.topicsAndRatings?.map((row) =>
    {
      
    return (
      <React.Fragment>
              

        <Typography sx={{
         align : 'top',
          fontWeight: 'medium',
            
        }} color="inherit" noWrap><span style={{marginRight:'10px'}}><span>{row.topic}</span> </span> 

      <Rating 
  name="text-feedback"
  value={row.rating}
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

