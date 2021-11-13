const router = require("express").Router();

const {
    get_topic_rating_data,
    get_data_for_yelp
} = require("./reviews.controller");

router.get("/get_topic_rating/:brandname/:reviewtype", get_topic_rating_data);
router.get("/get_data_for_yelp/:brandname/:reviewtype/:location",get_data_for_yelp);
module.exports = router;
