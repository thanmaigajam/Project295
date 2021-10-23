const router = require("express").Router();

const {
    gettwitterdata
} = require("./twitter.controller");



router.get("/", gettwitterdata);

module.exports = router;