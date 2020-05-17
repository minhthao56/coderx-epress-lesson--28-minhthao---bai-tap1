
var shortid = require('shortid');
var db = require('../../db');



//List book
module.exports.book = function (req, res) {
    var titles= db.get("titles").value()
    res.json(titles);
};
module.exports.create = function(req, res){
    var title= db.get("titles").push(req.body).write();
    res.json(title);
}
