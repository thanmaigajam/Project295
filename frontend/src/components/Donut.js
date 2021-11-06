import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import Chart from "react-apexcharts";
import { Component } from "react";
import axios from "axios";
import { backendServer } from "../webConfig.js";

function preventDefault(event) {
  event.preventDefault();
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
      series: [],
   
      reviewtype: this.props.reviews,
      brandname : localStorage.getItem('brand')
    };
  }

  componentDidMount()
{

  console.log("in get donut");
  axios
      .get(
        `${backendServer}/reviews/get_donut/${this.state.brandname}/${this.state.reviewtype}`
      )
      .then((response) => {
        console.log("Pro are::", response.data);
        if (response.data != null) {
          this.setState({
            donutSentimentCounts: response.data.data.donutSentimentCounts,
          });
        }
        console.log("Sentiment counts are::", this.state.donutSentimentCounts);
        this.state.donutSentimentCounts.forEach( element => {
         this.state.series.push(element.reviewCount);
        });
      });
}

  render() {
    return (
      <React.Fragment>
        <Title>Percentage of Polarity</Title>
        <div className="donut">
          <Chart 
            options={this.state.options}
            series={this.state.series}
            type="donut"
            width={260}
          />
        </div>{" "}
      </React.Fragment>
    );
  }
}
export default Donut;
