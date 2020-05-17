var db = require('../db');
var shortid = require('shortid');


module.exports = function(req, res, next){
    if (!req.signedCookies.sessionId){
        var id = shortid.generate();
        res.cookie("sessionId", id,{
            signed:true
        });
        db.get("sessions").push({sessionId: id}).write();
        res.redirect('/');
    } else {next()}
}