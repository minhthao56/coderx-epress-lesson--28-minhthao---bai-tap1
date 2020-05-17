var express = require('express');
var router = express.Router();
var controller = require("../controllers/controller.book")
var controller = require("../controllers/controller.cart")
var db = require('../db');

router.get("/add/:id", controller.addToCart);

module.exports = router;
