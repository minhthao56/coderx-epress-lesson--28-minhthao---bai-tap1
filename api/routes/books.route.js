var express = require('express');
var router = express.Router();
var controller = require("../controllers/controller.book")



// Api
router.get("/", controller.book);
router.post("/", controller.create);

module.exports = router;
