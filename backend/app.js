const http = require("http");
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.set("view engine", "ejs");
app.use(express.json());
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
var axios = require("axios");
const port = 8080;
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

app.get("/getreviews_reddit", async function (request, response) {
  console.log("inside get reviews_reddit");

  await axios
    .get(
      "http://127.0.0.1:5000/getreviews_reddit?limitval=" +
        request.query.limitval
    )
    .then((res) => {
      console.log(res.data);
      response.send(res.data);
    })
    .catch((ex) => {
      console.log(ex);
    });
});

app.get("/getreviews_yelp", async function (request, response) {
  console.log("inside yelp reviews");
  await axios
    .get(
      "http://127.0.0.1:5000/getreviews_yelp?term=" +
        request.query.term +
        "&location=" +
        request.query.location
    )
    .then((res) => {
      console.log("inside yelp reviews 1");
      console.log(res.data);
      response.send(res.data + "from yelp");
    })
    .catch((ex) => {
      console.log(ex);
    });
});

app.get("/getreviews_twitter", async function (request, response) {
  console.log("inside twitter reviews");
  const params = {
    query: "Starbucks",
    "tweet.fields": "author_id",
    max_results: 10,
  };
  await axios
    .get(
      "http://127.0.0.1:5000/getreviews_twitter?query=" +
        request.query.query +
        "&tweet.fields=" +
        request.query.tweets +
        "&max_results=" +
        request.query.max_results
    )
    .then((res) => {
      console.log(res.data);
      response.send(res.data + "from twitter");
    })
    .catch((ex) => {
      console.log(ex);
    });
});

var twitterRouter = require("./api/twitter/twitter.router");
app.use("/twitter", twitterRouter);

