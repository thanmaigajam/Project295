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

  get_data_for_yelp: (req, res) => {
    const body = req.params;
    console.log("in yelp router");
    console.log(body, "req.params in body");
    var text = body.brandname;
    var location = body.location;
    text = text.toLowerCase();
    twittermodel.findOne(
      { brand: text, source: body.reviewtype, state:location },
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
