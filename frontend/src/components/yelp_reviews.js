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
  

  function YelpReviews() {
    const [open, setOpen] = React.useState(true);
    const [content, setContent] = useState("");

    const [options, series, labels] = React.useState({
      options: {},
      series: [44, 55, 41, 17, 15],
      labels: ['A', 'B', 'C', 'D', 'E']
    });
  
    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    return (
      <div>
        <Navbar/>
        <container id="myDiv"></container>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={4} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <TopicRating reviews="yelp"/>
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
                    <Deposits reviews="yelp" />
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
                    <Orders reviews="yelp"/>
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
      <MapChart reviews="yelp" setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
      </Paper>
    </Grid>
         
  
              <Grid item xs={12}>
                  <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      
                    }}
                  >
                    <LineGraph reviews="yelp" />
                  </Paper>
                </Grid>
              </Grid>
              </Container>
              </div>
          
    );
  }

  export default function Dashboard() {
    return <YelpReviews />;
  }

