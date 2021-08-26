const http = require("http");
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.set("view engine","ejs")
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
var axios = require("axios")
const port = 8080;
module.exports = app.listen(port)
console.log("sever listening on",`${port}`);

// const getReviews = app.get('http://127.0.0.1:5000/helloworld').then((res) =>{
//   return res.data;
// })
// .catch((ex) => {
//   console.log(ex)
// })

app.get('/getreviews_twitter', async function(request,response){
  console.log("inside get reviews_twitter")

  await axios.get('http://127.0.0.1:5000/getreviews_reddit').then((res) =>{
    console.log(res.data)
    response.send(res.data);
  })
  .catch((ex) =>
  {
    console.log(ex)
  })

})
