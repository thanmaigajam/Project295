const twittermodel = require("../../models/twittermodel.js");
const { get_flaskend_service } = require("./reviews.service");

module.exports = {
  get_data_for_yelp: (req, res) => {
    const body = req.params;
    console.log("in yelp router");
    console.log(body, "req.params in body");
    var text = body.brandname;
    var location = body.location;
    text = text.toLowerCase();
    twittermodel.findOne(
      { brand: text, source: body.reviewtype, state: location },
      (error, results) => {
        if (error) {
          console.log(error);
          return;
        } else if (results == null) {
          console.log("results", results);
          get_flaskend_service(body, (err, results) => {
            if (err) {
              console.log(err);
              return;
            } else {
              twittermodel.findOne(
                { brand: text, source: body.reviewtype, state: location },
                (error, results) => {
                  if (results) {
                    console.log("results from yelp", results);

                    return res.json({
                      success: 1,
                      data: results,
                    });
                  }
                }
              );
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
            console.log(d - prev, " d-prev");
            get_flaskend_service(body, (err, results) => {
              if (err) {
                console.log(err);
                return;
              } else {
                twittermodel.findOne(
                  { brand: text, source: body.reviewtype, state: location },
                  (error, results) => {
                    if (results) {
                      console.log("results from yelp", results);
                      return res.json({
                        success: 1,
                        data: results,
                      });
                    }
                  }
                );
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
              twittermodel.findOne(
                { brand: text, source: body.reviewtype },
                (error, results) => {
                  if (results) {
                    console.log("results from yelp", results);

                    return res.json({
                      success: 1,
                      data: results,
                    });
                  }
                }
              );
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
            console.log(d - prev, " d-prev");
            get_flaskend_service(body, (err, results) => {
              if (err) {
                console.log(err);
                return;
              } else {
                twittermodel.findOne(
                  { brand: text, source: body.reviewtype },
                  (error, results) => {
                    if (results) {
                      console.log("results from yelp", results);

                      return res.json({
                        success: 1,
                        data: results,
                      });
                    }
                  }
                );
              }
            });
          } else {
            console.log("returning results on same day");
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
    let loc = req.params.location;
    brand = brand.toLowerCase();
    console.log("get choropleth data - Backend function");
    console.log("location", loc);
    twittermodel.findOne(
      { brand: brand, source: "yelp", state: loc },
      (error, results) => {
        if (results) {
          res.send(results);
        }
        res.end();
      }
    );
  },
};
