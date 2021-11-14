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
      series: [
        {
          name: "Positive",
          data: [],
        },
        {
          name: "Negative",
          data: [],
        },
        {
          name: "Neutral",
          data: [],
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
          categories: [""],
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val;
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
    console.log("in linegraph data");
  const {LineGraphDataPolarityDates} = this.props.reviewdata;
    this.setState({
      loading: false,
      LineGraphDataPolarityDates:   this.props.reviewdata.LineGraphDataPolarityDates,
    });

    console.log(LineGraphDataPolarityDates)



    var d = {};
    var a_len = LineGraphDataPolarityDates.length;
    console.log(a_len);
    var date_str = '';
    for(var i=0; i<a_len; i++){
      var inner_l_len = LineGraphDataPolarityDates[i].length;
      for(var j=0; j<inner_l_len; j++){
        date_str = LineGraphDataPolarityDates[i][j];
        if (date_str in d){
          d[date_str][i] += 1;
        }
        else{
          d[date_str] = [0, 0, 0];
          d[date_str][i] = 1;
        }
      }
    }

    console.log(d,"dictionary");
    
//     // Building final dict
    console.log(d);
  
    var a1 = [];
    var a2 = [];
    var a3 = [];
    for(const k in d){
      this.state.options["xaxis"]["categories"].push(k);
      this.state.series[0].data.push(d[k][0]);
      this.state.series[1].data.push(d[k][1]);
      this.state.series[2].data.push(d[k][2]);
    }
    console.log( "options-xaxis-categories",this.state.options["xaxis"]["categories"])
    console.log(a1,a2,a3)
    console.log(this.state.series);
  }


  render() {
  console.log("series in render", this.state.series)
  console.log("options in render",this.state.options.categories)

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
