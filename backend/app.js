const http = require("http");
var express = require("express");
var app = express();
// var cors = require("cors");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  // res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header("Access-Control-Expose-Headers", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
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
app.use("/register", registerRouter);
app.use("/login", loginRouter);
