const router = require("express").Router();

const {
    get_topic_rating_data,
    get_donut_data,
    getpositivenegativedata,
    get_choropleth_data,
    get_linegraph_data
} = require("./reviews.controller");

router.get("/get_topic_rating/:brandname/:reviewtype", get_topic_rating_data);
router.get("/get_donut/:brandname/:reviewtype", get_donut_data);
router.get("/get_postive_negative/:brandname/:reviewtype", getpositivenegativedata);
router.get("/get_choropleth/:brandname", get_choropleth_data);
router.get("/get_line_graph/:brandname/:reviewtype",get_linegraph_data);
module.exports = router;
