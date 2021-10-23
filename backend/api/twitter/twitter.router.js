const router = require("express").Router();

const {
    gettwitterdata
} = require("./twitter.controller");

router.get("/:brandname", gettwitterdata);

module.exports = router;
