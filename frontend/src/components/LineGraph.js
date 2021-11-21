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


function formatDate(date){

  var dd = date.getDate();
  var mm = date.getMonth()+1;
  var yyyy = date.getFullYear();
  if(dd<10) {dd='0'+dd}
  if(mm<10) {mm='0'+mm}
  date = yyyy+'-'+mm+'-'+dd;
  return date
}

class LineGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      LineGraphDataPolarityDates : {},
      dates_polarity : {},
      dates_obj : {},
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
    var result = [];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        this.state.options["xaxis"]["categories"].push( formatDate(d) )
        this.state.dates_obj[formatDate(d)] = i;
    }
console.log(this.state.dates_obj  )
    console.log("in linegraph data");
  const {LineGraphDataPolarityDates} = this.props.reviewdata;
    this.setState({
      loading: false,
      LineGraphDataPolarityDates:   this.props.reviewdata.LineGraphDataPolarityDates,
    });

    console.log(LineGraphDataPolarityDates)
    let ans = [[],[],[]];
  
for(let i = 0;i<LineGraphDataPolarityDates.length;i++)
{
  
   
      // console.log(LineGraphDataPolarityDates[i])
      let arr = LineGraphDataPolarityDates[i];
      for(let k in arr)
      {
        for(let ob in arr[k])
        {
          console.log(ob,arr[k][ob])
          console.log("pos",this.state.dates_obj[ob])
          this.state.series[i].data[this.state.dates_obj[ob]] =arr[k][ob];
        console.log(arr[k][ob])
        }
      }
    
}
console.log("ans",ans)

    console.log(this.state.series);
    
//     // Building final dict
    // console.log(d);
  
    // var a1 = [];
    // var a2 = [];
    // var a3 = [];
    // for(const k in d){
    //   this.state.options["xaxis"]["categories"].push(k);
    //   this.state.series[0].data.push(d[k][0]);
    //   this.state.series[1].data.push(d[k][1]);
    //   this.state.series[2].data.push(d[k][2]);
    // }
    // console.log( "options-xaxis-categories",this.state.options["xaxis"]["categories"])
    // console.log(a1,a2,a3)
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
