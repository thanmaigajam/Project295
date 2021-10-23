import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Chart from 'react-apexcharts'
import { Component } from 'react';


function preventDefault(event) {
  event.preventDefault();
}

class Donut extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      options : { maintainAspectRatio: false },
      series : [44, 55, 41, 17, 15],
      labels : ['A','B','C','D','E']
    }

  }

  render()
  {
    return (
      <React.Fragment>
      <Title>Donut</Title>
    <div className="donut">
    <Chart options={this.state.options} series={this.state.series} type="donut" width="270" />
  </div>    </React.Fragment>
    );
  }
}
export default Donut;

