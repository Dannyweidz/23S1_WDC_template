var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let users = {
  duckman: {password: 'goob383'},
  duckduck: {password: 'shoob'}
};

router.post("/login", function(req, res, next) {

  if (req.body.username in users && req.body.password === users[req.body.username].password){

    req.session.username = req.body.username;
      res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.get("/register", function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

module.exports = router;
