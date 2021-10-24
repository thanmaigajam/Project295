const twittermodel = require("../../models/twittermodel.js");

 module.exports = {
      gettwitterdata : (req,res) => {
        console.log("in the get review data");
       
        console.log(req.params.brandname);
        console.log(req.params.reviewtype);
        let reviewtype = req.params.reviewtype;
        var text = req.params.brandname;
        text = text.toLowerCase();
        console.log("text",text)
         twittermodel.findOne({brand : text,source : reviewtype},(error,results) =>{
          
           
          
            // diff/(60*60*1000)
            if(results == null)
            {
            if(reviewtype == "yelp")
            {
                 axios
                .get(
                  "http://127.0.0.1:5000/get_processed_data_yelp?brand=" +
                    text +
                    "&location=" +
                    arizona
                )
                .then((res) => {
                  console.log("inside yelp reviews 1");
                  console.log(res.data);
                  response.send(res.data + "from yelp");
                })
                .catch((ex) => {
                  console.log(ex);
                });
            }
            else if(reviewtype == "twitter")
            {
                axios
    .get(
      "http://127.0.0.1:5000/get_processed_data_twitter?brand=" +
        text
    )
    .then((res) => {
      console.log(res.data);
      response.send(res.data + "from twitter");
    })
    .catch((ex) => {
      console.log(ex);
    });
            }
            else if(reviewtype == "reddit")
            {
                axios
                .get(
                  "http://127.0.0.1:5000/get_processed_data_reddit?brand=" +
                    text
                )
                .then((res) => {
                  console.log(res.data);
                  response.send(res.data + "from twitter");
                })
                .catch((ex) => {
                  console.log(ex);
                });
                     
            }
        }

        else
        {
            var date = new Date();
            console.log(date)
            var prevdate = results;
            console.log(prevdate.timeStamp);
            // console.log(date-timeStamp/(60*60*1000));
            // console.log()
        }
            console.log("my reviews",results);
            res.send(results);
            res.end();
        })
      
    }
}