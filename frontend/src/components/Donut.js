import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import Chart from "react-apexcharts";
import { Component } from "react";
import axios from "axios";
import { backendServer } from "../webConfig.js";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function preventDefault(event) {
  event.preventDefault();
}


function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', textAlign : 'center' }}>
      <CircularProgress> Please Wait...</CircularProgress>
    </Box>
  );
}

class Donut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donutSentimentCounts : [],
      options: { maintainAspectRatio: true,
        chart: {
          type: 'donut',
          width:300
        },                labels: ["Neutral","Positive", "Negative"],
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 500
        //     },
        //     legend: {
        //       position: 'bottom'
        //     }
        //   }
        // }]
      },
      loading : true,
      series: [],
   
      reviewtype: this.props.reviews,
      brandname : localStorage.getItem('brand')
    };
  }

  componentDidMount()
{
  console.log("in donut data");
  const {donutSentimentCounts} = this.props.reviewdata;
  console.log(donutSentimentCounts)
  this.setState({
    loading: false,
    donutSentimentCounts:donutSentimentCounts,
  });

 donutSentimentCounts.forEach( element => {
         this.state.series.push(element.reviewCount);
        });
      }

  render() {
    const { loading } = this.state;
    return (
      <React.Fragment>
        <Title>Percentage of Polarity</Title>
        <div className="donut">
        {loading ? <CircularIndeterminate /> : 
          <Chart 
            options={this.state.options}
            series={this.state.series}
            type="donut"
            width={260}
          />}
        </div>{" "}
      </React.Fragment>
    );
  }
}
export default Donut;
