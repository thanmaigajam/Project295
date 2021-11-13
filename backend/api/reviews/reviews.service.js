var axios = require("axios");

module.exports = {
  get_flaskend_service: (body, callBack) => {
    console.log("In topic rating service", body);
    let brand = body.brandname;
    let source = body.reviewtype;

    switch (source) {
      case "yelp":
        axios
          .get(
            "http://127.0.0.1:5000/get_processed_data_yelp?brand=" +
              brand +
              "&location=arizona"
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
    }
  },
};
