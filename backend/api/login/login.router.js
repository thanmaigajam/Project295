const router = require("express").Router();

const {
    login,
} = require("./login.controller");



router.get("/:email", login);

module.exports = router;