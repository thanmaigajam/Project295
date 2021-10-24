const router = require("express").Router();

const {
    gettwitterdata
} = require("./reviews.controller");

router.get("/:brandname/:reviewtype", gettwitterdata);

module.exports = router;
