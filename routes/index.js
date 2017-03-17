var express = require('express');
var router = express.Router();
var commonValidations = require('../src/containers/validations/signup');
var commonLogin = require('../src/containers/validations/login');
const passport = require('passport');
var User = require('../models/users');
var Promise = require('bluebird');
var isEmpty = require('lodash/isEmpty');
var bcrypt = require('bcrypt');

var config = require('../config');

router.get('/', function(req, res, next) {
    // if(!req.isAuthenticated()){
    //     res.redirect('/login')
    // }
    res.render('index');
    // console.log(req.user);

});


module.exports = router;


