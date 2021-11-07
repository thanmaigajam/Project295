const twittermodel = require("../../models/twittermodel.js");
const { get_flaskend_service } = require("./reviews.service");

module.exports = {
  get_donut_data: (req, res) => {
    const body = req.params;
    console.log(body, req.params);
    var text = body.brandname;
    let srcname = body.reviewtype;
    text = text.toLowerCase();

    console.log("in get donu_reviews backend")
    twittermodel.findOne(
      { brand: text, source: srcname },
      (error, results) => {
        if (error) {
          console.log(error);
          return;
        } else if (results == null) {
          get_flaskend_service(body, (err, results) => {
            if (err) {
              console.log(err);
              return;
            } else {
              return res.json({
                success: 1,
                data: results,
              });
            }
          });
        } else if (results) {
          console.log("checking dates", results);
          console.log(results.timeStamp);
          var prev = new Date(results.timeStamp);
          console.log("prev", prev.getDate());
          prev = prev.getDate();
          var d = new Date(); /* midnight in China on April 13th */
          console.log("d", d.getDate());
          d = d.getDate();
          if (d - prev > 1) {
            get_flaskend_service(body, (err, results) => {
              if (err) {
                console.log(err);
                return;
              } else {
                return res.json({
                  success: 1,
                  data: results,
                });
              }
            });
          } else {
            return res.json({
              success: 1,
              data: results,
            });
          }
        } else {
          return res.json({
            success: 1,
            data: results,
          });
        }
       
      }
    );
  },

  getpositivenegativedata: (req, res) => {
    const body = req.params;
    console.log(body, req.params);
    var text = body.brandname;
    text = text.toLowerCase();
    console.log("in get positive neagative data")
    twittermodel.findOne(
      { brand: text, source: body.reviewtype},
      (error, results) => {
        if (error) {
          console.log(error);
          return;
        } else if (results == null) {
          get_flaskend_service(body, (err, results) => {
            if (err) {
              console.log(err);
              return;
            } else {
              return res.json({
                success: 1,
                data: results,
              });
            }
          });
        } else if (results) {
          console.log("checking dates", results);
          console.log(results.timeStamp);
          var prev = new Date(results.timeStamp);
          console.log("prev", prev.getDate());
          prev = prev.getDate();
          var d = new Date(); /* midnight in China on April 13th */
          console.log("d", d.getDate());
          d = d.getDate();
          if (d - prev > 1) {
            get_flaskend_service(body, (err, results) => {
              if (err) {
                console.log(err);
                return;
              } else {
                return res.json({
                  success: 1,
                  data: results,
                });
              }
            });
          } else {
            return res.json({
              success: 1,
              data: results,
            });
          }
        } else {
          return res.json({
            success: 1,
            data: results,
          });
        }
       
      }
    );
  },

  get_choropleth_data: (req, res) => {

    const body = req.params;
    console.log(body, req.params);
    var text = body.brandname;
    text = text.toLowerCase();
    console.log("in get choropleth data")
    twittermodel.findOne(
      { brand: text, source: "yelp" },
      (error, results) => {
        if (error) {
          console.log(error);
          return;
        } else if (results == null) {
          get_flaskend_service(body, (err, results) => {
            if (err) {
              console.log(err);
              return;
            } else {
              return res.json({
                success: 1,
                data: results,
              });
            }
          });
        } else if (results) {
          console.log("checking dates", results);
          console.log(results.timeStamp);
          var prev = new Date(results.timeStamp);
          console.log("prev", prev.getDate());
          prev = prev.getDate();
          var d = new Date(); /* midnight in China on April 13th */
          console.log("d", d.getDate());
          d = d.getDate();
          if (d - prev > 1) {
            get_flaskend_service(body, (err, results) => {
              if (err) {
                console.log(err);
                return;
              } else {
                return res.json({
                  success: 1,
                  data: results,
                });
              }
            });
          } else {
            return res.json({
              success: 1,
              data: results,
            });
          }
        } else {
          return res.json({
            success: 1,
            data: results,
          });
        }
       
      }
    );

  },

  get_linegraph_data: (req, res) => {},

  get_topic_rating_data: (req, res) => {
    const body = req.params;
    console.log(body, req.params);
    var text = body.brandname;
    text = text.toLowerCase();
    twittermodel.findOne(
      { brand: text, source: body.reviewtype },
      (error, results) => {
        if (error) {
          console.log(error);
          return;
        } else if (results == null) {
          get_flaskend_service(body, (err, results) => {
            if (err) {
              console.log(err);
              return;
            } else {
              return res.json({
                success: 1,
                data: results,
              });
            }
          });
        } else if (results) {
          console.log("checking dates", results);
          console.log(results.timeStamp);
          var prev = new Date(results.timeStamp);
          console.log("prev", prev.getDate());
          prev = prev.getDate();
          var d = new Date(); /* midnight in China on April 13th */
          console.log("d", d.getDate());
          d = d.getDate();
          if (d - prev > 1) {
            console.log(d-prev, " d-prev");
            get_flaskend_service(body, (err, results) => {
              if (err) {
                console.log(err);
                return;
              } else {
                return res.json({
                  success: 1,
                  data: results,
                });
              }
            });
          } else {
            return res.json({
              success: 1,
              data: results,
            });
          }
        } else {
          return res.json({
            success: 1,
            data: results,
          });
        }
       
      }
    );
  },

  get_line_graph_data: (req, res) => {
    console.log("in the get topic rating data");

    console.log(req.params.brandname);
    console.log(req.params.reviewtype);
    let reviewtype = req.params.reviewtype;
    var text = req.params.brandname;
    text = text.toLowerCase();
    console.log("text", text);
    twittermodel.findOne(
      { brand: text, source: reviewtype },
      (error, results) => {
        // diff/(60*60*1000)
        if (results == null) {
          if (reviewtype == "yelp") {
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
          } else if (reviewtype == "twitter") {
            axios
              .get(
                "http://127.0.0.1:5000/get_processed_data_twitter?brand=" + text
              )
              .then((res) => {
                console.log(res.data);
                response.send(res.data + "from twitter");
              })
              .catch((ex) => {
                console.log(ex);
              });
          } else if (reviewtype == "reddit") {
            axios
              .get(
                "http://127.0.0.1:5000/get_processed_data_reddit?brand=" + text
              )
              .then((res) => {
                console.log(res.data);
                response.send(res.data + "from twitter");
              })
              .catch((ex) => {
                console.log(ex);
              });
          }
        } else {
          var date = new Date();
          console.log(date);
          var prevdate = results;
          console.log(prevdate.timeStamp);
          // console.log(date-timeStamp/(60*60*1000));
          // console.log()
        }
        // console.log("my reviews",results);
        res.send(results);
        res.end();
      }
    );
  },

  getchoroplethdata: (req, res) => {
    let brand = req.params.brandname;
    brand = brand.toLowerCase();
    console.log("get choropleth data - Backend function");
    twittermodel.findOne({ brand: brand, source: "yelp" }, (error, results) => {
      if (results) {
        res.send(results);
      }
      res.end();
    });
  },
};
