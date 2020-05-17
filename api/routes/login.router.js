var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var controller = require("../controllers/controller.login")
var validation = require("../../validation/validation.user")



// router.get("/", controller.getlogin);

router.post("/", validation.checkWrongpass,controller.postlogin);

module.exports = router;
