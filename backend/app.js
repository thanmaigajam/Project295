const http = require("http");
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors({ origin: "3.128.168.202:8080", credentials: true }));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "3.128.168.202:8080");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.set("view engine", "ejs");
app.use(express.json());
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
var axios = require("axios");
const port = 3001;
module.exports = app.listen(port);
console.log("sever listening on", `${port}`);
const { mongoDB } = require("./config/ConnectionValues");
const mongoose = require("mongoose");

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,

};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

var reviewsRouter = require("./api/reviews/reviews.router");
var registerRouter = require("./api/register/register.router");
var loginRouter = require("./api/login/login.router");
app.use("/reviews", reviewsRouter);
app.use("/register",registerRouter);
app.use("/login",loginRouter);

