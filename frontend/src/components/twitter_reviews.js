import * as React from "react";
import {useEffect} from 'react';
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import TopicRating from "./TopicRating";
import Deposits from "./Donut";
import Orders from "./Orders";
import Navbar from "./navbar";
import LineGraph from "./LineGraph";
import ChoroplethMap from "./ChoroplethMap";
import Title from "./Title";
import axios from "axios";
import {backendServer} from "../webConfig.js"
import CircularProgress from '@mui/material/CircularProgress';


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();


function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [loading,setLoading] = React.useState(true);
  const [data, setData] = React.useState("");
  const [reviewtype,setReviewtype] = React.useState("twitter");
  const brandname = localStorage.getItem("brand");


  useEffect(async () => {
    const result = await axios(
      `${backendServer}/reviews/get_topic_rating/${brandname}/${reviewtype}`,
    );
   console.log("data",result.data.data);
    setData(result.data.data);
    setLoading(false)
  },[]);


  function CircularIndeterminate() {
    return (
      <Box sx={{ display: 'flex', textAlign : 'center' }}>
        <CircularProgress> Please Wait...</CircularProgress>
      </Box>
    );
  }


  return (
    <div>
      
      <Navbar />
      <container id="myDiv"></container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {loading ? <CircularIndeterminate /> : 
         
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
                  <TopicRating reviews="twitter" reviewdata={data} />
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
                  <Deposits reviews="twitter"  reviewdata={data} />
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
                  <Orders reviews="twitter"  reviewdata={data} />
                </Paper>
              </Grid>

            </Grid>
}
            </Container>
            </div>
        
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
