const router = require("express").Router();

console.log('test api');
const {
    register,
} = require("./register.controller");



router.post("/", register);

module.exports = router;