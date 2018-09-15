var express = require("express");
var router = express.Router();
var db = require("monk")("localhost:27017/test"); // Connection
var userData = db.get('user-data'); // get collection



/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/get-data", function(req, res, next) {
  var data = userData.find({}); // boş nesne göndererek tüm entry leri istiyoruz diyoruz.Ya da koşul  tanımlayarak istedğini getirebilirsin. name:'isim'
  data.on('success',function(docs){
    res.render('index',{items:docs});
  });
});

router.post("/insert", function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  userData.insert(item);
  res.redirect("/");
});

router.post("/update", function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.item.id;
  //userData.update({"_id": db.id(id)},item);
  // Alternative
  userData.updateById(id,item);
 

});

router.post("/delete", function(req, res, next) {
  var id = req.item.id;
  //userData.remove({"_id": db.id(id)});
  //Alternative
  userData.removeById(id);
});

module.exports = router;
