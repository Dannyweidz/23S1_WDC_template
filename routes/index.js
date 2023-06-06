var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/login", function(req, res, next) {
  res.send();
});

router.get("/login.html", function(req, res, next){
  res.sendStatus(403);
  res.redirect("/");
});

module.exports = router;
