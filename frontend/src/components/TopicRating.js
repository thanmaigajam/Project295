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
    }

  }

  componentDidMount()
  {
    axios
    .get(`${backendServer}/twitter/`)
    .then((response) => {
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
