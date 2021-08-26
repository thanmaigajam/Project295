const axios = require("axios")
// https://api.yelp.com/v3/businesses/E3qAg28gb3x9t1opBDDVnQ/reviews

axios.get('https://api.yelp.com/v3/businesses/search', {
    headers: {
      Authorization: `Bearer jxVHqC_bXqsX_Tz_BEaa--KBitarJvK3ae3FVE07TUhv50jggQqCwrQG42Ghf9Bi-NGctz-FM8pOljyb1jc-Wqj9V9SnuY2ojlfXi2r8KkYBw5sXzHzsvQC3MSGwYHYx`
 },
    params: {
      term : "starbucks",
      location: "san jose"
 }})
 .then((res) => {
  console.log(res.data)
 })
 .catch((err) => {
  console.log ('error')
 })