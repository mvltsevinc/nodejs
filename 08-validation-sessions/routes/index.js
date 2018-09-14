var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "Form Validation",
    success: req.session.success,
    errors: req.session.errors
  });
  req.session.errors = null;
});

router.post("/submit", function(req, res, next) {
  // Check validity
  req.check('email','Invalid Email Address').isEmail();
  //req.check('password','Invalid Password').isLength({min:4}).equals(req.body.confirmPassword);
  // ikisini de dene tarfını seç :)
  req.check('password','Şifre 4 karakterden fazla olmalı').isLength({min:4});
  req.check('password','Eşleşmeyen şifre').equals(req.body.confirmPassword);

  var errors = req.validationErrors();
  if(errors){
    req.session.errors = errors;
    req.session.success = false;
  }
  else{
    req.session.success = true;
  }
  res.redirect("/");
});

module.exports = router;
