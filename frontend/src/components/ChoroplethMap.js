import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";
import DataCSV from "../unemployment-by-county-2017.csv";
import Title from "./Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {backendServer} from "../webConfig.js"

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3.0.0/states-10m.json";
//counties - > object
// let counties = {
//   "Nevada" : 21,
//   "Vermont" : 54
// }
let counties = [];


function get_rate(num) {
  console.log("in func", num);
  let ans = "";
  counties.forEach((element) => {
    if (element.country === num) {
      console.log("rate ", element.reviewCount);
      ans = element.reviewCount;
    }
  });
  console.log("ans", ans);
  return ans;
}

const MapChart = ({ setTooltipContent }, props) => {
  let [data, setData] = useState([]);
  const [brandname, setBrandname] = useState(localStorage.getItem("brand"));
  const [ reviewtype, setReviewtype] = useState("yelp");
  // https://www.bls.gov/lau/
  // csv("/unemployment-by-county-2017.csv").then((counties) => {
  // setData(counties);
  // console.log(counties);

  useEffect(() => {
    // https://www.bls.gov/lau/
    // csv(DataCSV).then((counties) => {
    //   setData(counties);
    // });
    axios
    .get(
      `${backendServer}/reviews/get_choropleth/${brandname}`
    )
    .then((response) => {
      console.log("Pro are::", response.data);
      if (response.data != null) {
        console.log("response data",response.data.choroplethData);
        response.data.choroplethData.forEach(element => {
          counties.push(element)
        });
      // counties.push(response.data.data.choropleth_data)
      }
      console.log("Pro are::", counties);
    });

  }, []);

  console.log(counties);
  // let temp = []
  // temp.concat({ id: 32, unemployment_rate: 37 });
  // setData(temp)
  const colorScale = scaleQuantile()
    .domain(counties.map((d) => d.reviewCount))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618",
    ]);

  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 500,
        }}
      >
        <Title>Number of Reviews Based on Region</Title>
        <ComposableMap data-tip="" projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                let cur = counties.find((s) => s.country === geo.properties.name);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { name } = geo.properties;
                      setTooltipContent(`${name} - ${get_rate(name)}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    fill={cur ? colorScale(cur.reviewCount) : "#EEE"}
                    style={{
                    
                      hover: {
                        fill: "#F53",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </Paper>
    </Grid>
  );
};

export default MapChart;
