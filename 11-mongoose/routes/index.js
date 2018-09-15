var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("localhost:27017/test", {useNewUrlParser:true});
var Schema = mongoose.Schema;

// Taslak olusturuldu // Layout gibi
var userDataSchema = new Schema(
  {
    title: { type: String, required: true },
    content: String,
    author: String
  },
  { collection: "user-data" }
);

// Taslagin gercek modeli olusturuldu. Bu modeli sonra instatiate için kullanacagız
var UserData = mongoose.model("UserData", userDataSchema);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/get-data", function(req, res, next) {
  UserData.find().then(function(doc) {
    res.render("index", { items: doc });
  });
});

router.post("/insert", function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var data = new UserData(item);
  data.save();

  res.redirect("/");
});

router.post("/update", function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.item.id;

  UserData.findById(id, function(err, doc){
    if(err){
      console.error('error, no entry found');
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.content;
    doc.save();
    res.redirect("/");
  });
});

router.post("/delete", function(req, res, next) {
  var id = req.item.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect("/");
});

module.exports = router;
