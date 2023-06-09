var express = require('express');
var router = express.Router();
const path = require('path');
const CLIENT_ID = '79497311944-21t54bos8cnb2cf09gp5f9qlbv90sgcv.apps.googleusercontent.com';

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let users = {
  duckman: {password: 'goob383'},
  duckduck: {password: 'shoob'}
};

router.post("/login", async function(req, res, next) {

  if ('client_id' in req.body){

      const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();

      let query = "SELECT username FROM User WHERE email = ?";

      req.pool.getConnection(function(err1, connection){

        if (err1){
          console.log("error");
          res.sendStatus(500);
          return;
        }
        connection.query(query, [payload['email']], function(err2, results, fields){

        connection.release();

        if (err2){
          res.sendStatus(500);
          return;
        }
        if(results.length > 0){
          req.session.username = results[0].username;
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }

      })

    })

  } else {

    if ('username' in req.body && 'password' in req.body){

      let query = "SELECT username FROM User WHERE username = ? AND pass = ?";

      req.pool.getConnection(function(err1, connection){

        if (err1){
          console.log("error");
          res.sendStatus(500);
          return;
        }
        connection.query(query, [req.body.username, req.body.password], function(err2, results, fields){

        connection.release();

        if (err2){
          res.sendStatus(500);
          return;
        }
        if(results.length > 0){
          req.session.username = results[0].username;
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }

      })

    })
    }
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
