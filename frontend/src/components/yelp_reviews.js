import  React , {useState} from "react";
import { styled, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Deposits from './Donut';
import Orders from './Orders';
import Navbar from './navbar';
import LineGraph from './LineGraph';
import MapChart from './ChoroplethMap';
import ReactTooltip from "react-tooltip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiDrawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import TopicRating from "./TopicRating";
import MuiAppBar from "@mui/material/AppBar";
import {backendServer} from "../webConfig.js"
import {useEffect} from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { minWidth } from "@mui/system";


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const drawerWidth = 240;
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
  
  const mdTheme = createTheme();
  
   const datachoropleth = [
      ["TX", 75], ["CA", 43], ["VA", 50], ["IL", 88],["OH",49]]
   const states = ["alabama","alaska","arizona","california","colorado","delaware","florida","georgia","hawaii","illinois","indiana","maryland",
      "michigan","minnesota","mississippi","nebraska","new york","oregon","ohio","utah","texas","washington","virginia","vermont","oklahoma"]

    
  function YelpReviews() {
    const [open, setOpen] = React.useState(true);
    const [location, setLocation] = React.useState('san jose');
    const [content, setContent] = useState("");
    const [loading,setLoading] = React.useState(true);
    const [data, setData] = React.useState("");
    const [reviewtype,setReviewtype] = React.useState("yelp");
    const brandname = localStorage.getItem("brand");
    const [options, series, labels] = React.useState({
      options: {},
      series: [44, 55, 41, 17, 15],
      labels: ['A', 'B', 'C', 'D', 'E']
    });
   
  
    const handleChange = async(event) => {
      console.log(event.target.value)
      await setLocation(event.target.value);
      setLoading(true)
    };  

    


    useEffect(async () => {
      console.log("yelp reviews------------>");
      console.log(location)
      const result = await axios(
        `${backendServer}/reviews/get_data_for_yelp/${brandname}/${reviewtype}/${location}`,
      );
     console.log("data",result.data.data);
      setData(result.data.data);
      setLoading(false)
    },[location]);
   


    function CircularIndeterminate() {
      return (
        <Box sx={{ display: 'flex', textAlign : 'center' }}>
          <CircularProgress> Please Wait...</CircularProgress>
        </Box>
      );
    }

   
   
    return (
      <div>
        <Navbar/>
        <container id="myDiv"></container>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {loading ? <CircularIndeterminate /> : 
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid 
item xs={12} md={4} lg={5}>
                <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Select Location</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={location}
    label="location"
    onChange={handleChange}
  >
      {states.map(item => {
                return (<MenuItem key={item} value={item}>{item}</MenuItem>);
              })}
  </Select>
</FormControl>
</Grid>
                <Grid item xs={12} md={4} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <TopicRating reviews="yelp" reviewdata={data}/>
                  </Paper>
                </Grid>
            
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Deposits reviews="yelp" reviewdata={data}/>
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      
                      display: 'flex',
                      flexDirection: 'column',
                      
                    }}
                  >
                    <Orders reviews="yelp" reviewdata={data}/>
                  </Paper>
                </Grid>            
  
                <Grid item xs={12}>
                <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height : 500
                    }}
                  >
      <MapChart reviews="yelp" setTooltipContent={setContent} reviewdata={data} />
      <ReactTooltip>{content}</ReactTooltip>
      </Paper>
    </Grid>
         
  
          
              </Grid>
  }
              </Container>
              </div>
          
    );
  }

  export default function Dashboard() {
    return <YelpReviews />;
  }

