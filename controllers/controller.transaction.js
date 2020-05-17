var shortid = require('shortid');
var db = require('../db');



//List book
module.exports.trans = function (req, res) {
    res.render("transactions/trans", {
        trans: db.get("trans").value()
    });
};
// Detail borrow
module.exports.detailborrow = function (req, res) {
    var bookId = req.params.bookId;
    var userId = req.params.userId;
    var id = req.params.id;
    var detailbook = db.get("titles").find({id: bookId}).value();
    var detailuser = db.get("users").find({id: userId}).value();
    var detailtran = db.get("trans").find({id: id}).value();
    res.render("transactions/detail", {
        title:detailbook,
        user: detailuser,
        tran:detailtran
    })    
  };
//Add
module.exports.getAdd = function (req, res) {
    var titles = db.get("titles").value()
    var users = db.get("users").value()
    res.render("transactions/add", {
        titles:titles,
        users: users
    });
};
module.exports.postAdd = function(req, res){
    req.body.id=shortid.generate();
    db.get('trans').push(req.body).write()
    res.redirect('/trans')
  };

module.exports.borrow = function(req, res){
    var userId = req.signedCookies.userId;
    var sessionId = req.signedCookies.sessionId;
    var objUser = db.get("users").find({id:userId}).value();
    var objTrans = db.get("trans").find({userId:userId}).value();
    var objCart = db.get("sessions")
                    .find({sessionId:sessionId})
                    .get("cart")
                    .value();             
     db.get("trans").find({userId:userId}).set("cart", objCart).write();
     var keys = Object.keys(objCart)
     var books =[];
     for(var key of keys){
         var book = db.get("titles").find({id:key}).value();
         books.push(book) 
     }
     res.render("transactions/detail",{
        objUser:objUser,
        objTrans:objTrans,
        books:books
     })
}


//Complete
module.exports.changeStatus = function(req, res){
    var id = req.params.id;
    var findtran = db.get("trans").find({id: id}).value();
    if(findtran===undefined){
        res.render("404")
    }else{
        db.get("trans").find({id: id}).assign({isComplete:'true'}).write()
    res.redirect('/trans')
    }
};