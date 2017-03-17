var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var fs = require('fs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/users');
var Todo = require('./models/todos');
var session = require('express-session');

var auth = require('./routes/auth');
var index = require('./routes/index');
var todo = require('./routes/todos');

const methodOverride = require('method-override');
const restify = require('express-restify-mongoose');
const router = express.Router();

var app = express();

mongoose.Promise = global.Promise;
// var mdbUrl = "mongodb://root:root@ds121190.mlab.com:21190/coen3463-todoappt5";
//
var mdbUrl = "mongodb://127.0.0.1:27017/react";
    db = require('./db'); //mongoose is in db.js

db.connect(mdbUrl, function(err) {
  if (err) {
    console.log('Unable to connect to mongoose');
    process.exit(1);
  }
  else {
    console.log("Connected to DB!");
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(session({
  secret: 'secret',
  cookie: {
      maxAge: 1000 * 60 * 60
  },
  resave: true,
  saveUninitialized: false
}));


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport configuration
app.use(passport.initialize());
app.use(passport.session());

restify.serve(router, Todo);
app.use(router);



app.use('/auth', auth);
app.use('/', index);
app.use('/todos',todo);
app.get('/*', (req,res) =>{
    res.render('index');
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error` in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
