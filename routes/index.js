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

router.post("/registered", function(req, res, next){
  if (req.body.username in users) {
    res.sendStatus(401);
  } else {
    req.session.username = req.body.username;
    users[req.body.username] = { password: req.body.password };
    res.sendStatus(200);
  }
});

router.use('/', function(req, res, next){
  if (req.session && req.session.username){
    next();
  } else {
    res.redirect('/');
  }
});

//EVERYTHING BELOW THIS IS SECURE

router.post('/logout', function(req, res, next) {
      delete req.session.username;
      res.end();
});


router.get("/homepage", function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/homepage.html'));
});

module.exports = router;
