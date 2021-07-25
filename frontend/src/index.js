import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import teal from "@material-ui/core/colors/teal";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: purple,
    // secondary: {
    //   main: "#f44336",
    // },
    // accent: green,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
