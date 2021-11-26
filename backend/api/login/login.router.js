const router = require("express").Router();

const {
    login,
} = require("./login.controller");



router.get("/", login);

module.exports = router;