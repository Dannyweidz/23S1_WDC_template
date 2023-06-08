var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mysql = require('mysql');

var dbConnectionPool = mysql.createPool({ host: 'localhost', database: 'club_connect_website_database' });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next){
    req.pool = dbConnectionPool;
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'dSdQbrDrBcHeADkSnxyx86ZqNQADdZabaac6TMql',
    secure: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
