import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import axios from "axios";
import { backendServer } from "../webConfig.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function preventDefault(event) {
  event.preventDefault();
}

function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex", textAlign: "center" }}>
      <CircularProgress> Please Wait...</CircularProgress>
    </Box>
  );
}

class LineGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      LineGraphDataPolarityDates : {},
      dates_polarity : {},
      mySet1 : new Set(),
       map1 : new Map(),
      series: [
        {
          name: "first",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
        },
        {
          name: "second",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
        },
        {
          name: "third",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: "straight",
          dashArray: [0, 8, 5],
        },
        title: {
          text: "",
          align: "left",
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - <strong>" +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              "</strong>"
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: [
            "01 Jan",
            "02 Jan",
            "03 Jan",
            "04 Jan",
            "05 Jan",
            "06 Jan",
            "07 Jan",
            "08 Jan",
            "09 Jan",
            "10 Jan",
            "11 Jan",
            "12 Jan",
          ],
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    };
  }


  componentDidMount() {
    console.log("in donut data");
 const {LineGraphDataPolarityDates} = this.props.reviewdata;
    this.setState({
      loading: false,
      LineGraphDataPolarityDates:   this.props.reviewdata.LineGraphDataPolarityDates,
    });


    LineGraphDataPolarityDates.forEach(element => {
      console.log("element",element);
       element.forEach(ele => {
         this.state.mySet1.add(ele);
       });
    });

    this.state.mySet1.forEach(element => {
      console.log(element)
      this.state.map1.set(element,0)
    });

    LineGraphDataPolarityDates.forEach(element => {
      element.forEach(ele => {
        this.state.map1.set(ele,this.state.map1.get(ele)+1);
      });
    })

    this.state.map1.forEach(element => {
      console.log(element)
    });

  console.log(this.state.mySet1.size);
  }


  render() {
    console.log(
    
      "the props value"
    );

    return (
      <Grid>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title>Sentiment Scores</Title>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={350}
          />
        </Paper>
      </Grid>
    );
  }
}
export default LineGraph;
