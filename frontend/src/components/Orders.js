import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Component } from 'react';
import axios from "axios";
import {backendServer} from "../webConfig.js"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

class Orders extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            negativeSentences : [],
            positiveSentences : []
        }
    }

    componentDidMount()
    {
        axios
        .get(`${backendServer}/twitter`)
        .then((response) => {
          console.log("Pro are::", response.data);
          this.setState({
            negativeSentences: response.data[0].negativeSentences,
            positiveSentences : response.data[0].positiveSentences
          });
          console.log("Pro are::", this.state.negativeSentences);
          console.log(this.state.positiveSentences)
        });
    }

    render()
    {
        let positiveSentences =    this.state.positiveSentences.map((row) => {
        return (
            <React.Fragment>
            
              <Table size="small">
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Ship To</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell align="right">Sale Amount</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
              
                    <TableRow key={row.id}>
                      <TableCell>{row}</TableCell>
                      {/* <TableCell>{row.name}</TableCell>
                      <TableCell>{row.shipTo}</TableCell>
                      <TableCell>{row.paymentMethod}</TableCell>
                      <TableCell align="right">{`$${row.amount}`}</TableCell> */}
                    </TableRow>
                </TableBody>
              </Table>
              
              {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
              </Link> */}
            </React.Fragment>)});

   let negativeSentences =    this.state.negativeSentences.map((row) => {
    return (
        <React.Fragment>
        
          <Table size="small">
            {/* <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ship To</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Sale Amount</TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
          
                <TableRow key={row.id}>
                  <TableCell>{row}</TableCell>
                  {/* <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell align="right">{`$${row.amount}`}</TableCell> */}
                </TableRow>
            </TableBody>
          </Table>
          
          {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
            See more orders
          </Link> */}
        </React.Fragment>)});

return (
<Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={6}>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height : 300}}>
    <Title>Top 5 Positive Sentences</Title>
    {positiveSentences}
    </Paper>
  </Grid>
  <Grid item xs={12} md={6} lg={6}>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
    <Title>Top 5 Negative Sentences</Title>
    {negativeSentences}
    </Paper>
  </Grid>  
  </Grid>
);
    }
}
export default Orders;