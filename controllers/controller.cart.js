var shortid = require('shortid');
var db = require('../db');

module.exports.addToCart = function (req, res, next) {
    var id = req.params.id;
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId){
        res.redirect("/books")
    }else{
    var count = db.get("sessions")
                    .find({sessionId:sessionId})
                    .get("cart."+id,0)
                    .value();
    db.get("sessions")
        .find({sessionId: sessionId})
        .set("cart." + id, count + 1)
        .write();
     var numCart = Object.values(
            db
             .get("sessions")
             .find({ sessionId: sessionId })
             .get("cart")
             .value()
           ).reduce((acc, cur) => acc + cur, 0);
             
    res.cookie("numCart",numCart);
    console.log(res.cookie("numCart",numCart))
    res.redirect("/books")
    }
};