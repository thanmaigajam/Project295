import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Chart from 'react-apexcharts'
import { Component } from 'react';


function preventDefault(event) {
  event.preventDefault();
}

class Sample extends Component {
  constructor(props)
  {
    super(props);
  }

  render()
  {
      return(
   <div>
       Welcome
       </div>);
  }
}
export default Sample;

