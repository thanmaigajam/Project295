var axios = require("axios");

module.exports = {
  get_flaskend_service: (body, callBack) => {
    console.log("In flask service", body);
    let brand = body.brandname.toLowerCase();
    let source = body.reviewtype;
    let location = body.location;
    console.log("source",source)
    switch (source) {
      case "yelp":
        console.log("in yelp")
        axios
          .get(
            "http://127.0.0.1:5000/get_processed_data_yelp?brand=" +
              brand +"&location="+location
              
          )
          .then((res) => {
            return callBack(null, res);
          })
          .catch((ex) => {
            console.log(ex);
          });

        break;

      case "twitter":
        axios
          .get(
            "http://127.0.0.1:5000/get_processed_data_twitter?brand=" + brand
          )
          .then((res) => {
            return callBack(null, res);
          })
          .catch((ex) => {
            console.log(ex);
          });

        break;

      case "reddit":
        axios
          .get("http://127.0.0.1:5000/get_processed_data_reddit?brand=" + brand)
          .then((res) => {
            return callBack(null, res);
          })
          .catch((ex) => {
            console.log("is this the catch", ex);
          });

        break;
      
        case "all":
          console.log("into all")
          axios
            .get("http://127.0.0.1:5000/get_processed_data?brand=" + brand+"&location=unitedstates")
            .then((res) => {
              return callBack(null, res);
            })
            .catch((ex) => {
              console.log("is this the catch", ex);
            });
  
          break;
    }
  },
};
