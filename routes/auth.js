var express = require('express');
var router = express.Router();
var commonValidations = require('../src/containers/validations/signup');
var commonLogin = require('../src/containers/validations/login');
var commonForgot = require('../src/containers/validations/forgot');
var commonReset = require('../src/containers/validations/reset');
const passport = require('passport');
var User = require('../models/users');
var Promise = require('bluebird');
var isEmpty = require('lodash/isEmpty');
var Validator = require( 'validator');

var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');


function validateSignUpInput(data, otherValidations) {
    let { errors } = otherValidations(data);

    return Promise.all([
        User.findOne({ email: data.email }).exec(function(err, user){
            if(user) {errors.email = 'There is user with such email';}

        }),

        User.findOne({ username: data.username }).exec(function(err, user){

            if(user) {errors.username = 'There is user with such username';}

        }),
    ]).then(() => {
        return {
            errors,
            isValid: isEmpty(errors)
        }
    })
}

router.post('/register', function(req, res, next) {
    // const {errors, isValid } = commonValidations(req.body);
    validateSignUpInput(req.body, commonValidations).then(({errors, isValid}) => {
        if(isValid) {
            User.register(new User({
                email: req.body.email,
                username: req.body.username
            }), req.body.password, function (err, user) {
                if (!err) {
                    return res.send({
                        success: true,
                        user: user
                    });
                }
                else {
                    // console.log(err.message);
                }
            });

        }
        else if(!isValid){
            console.log(errors);
            return res.status(400).json({
                success: false,
                errors: errors

            });
        }
    })


});

router.post('/forgot', function(req,res, next) {
    const { errors, isValid} = commonForgot(req.body);
    if (!isValid) {
        return res.status(400).json({
            success: false,
            errors: errors

        });

    }
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    return res.send({
                        success: false
                    });
                }
                else {

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function(err) {
                        done(err, token, user);
                    });
                }


            });
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'Gmail',
                auth: {
                    user: 'todolistcpe@gmail.com',
                    pass: 'p@$$w0rd'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'todolistcpe@gmail.com',
                subject: 'Todo List Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset' + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                return res.send({
                    success: true,
                    token: token,
                    userToken: user
                });

            });
        }
    ], function(err) {
        if (err) return next(err);
        res.send({
            success: false
        });
    });



});



router.get('/forgot/:identifier', (req, res) => {
    var userForgot = User.find();
    userForgot.findOne({ $or:[{ 'email': req.params.identifier} ]},function(err, user) {
        if(user) {res.json({ user, success:true})}
        if(!user) {res.json({success: false})}
    });

});
// router.get('/reset/:token', function(req, res) {
//     console.log(req.params.token);
//     console.log(JSON.parse(JSON.stringify(req.params.token)));
//     var userReset = User.find();
//     userReset.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
//         if (!user) {
//             // req.flash('error_msg', 'Password reset token is invalid or has expired.');
//             return res.send({success: false});
//         }
//         res.send( {
//             user: req.user
//         });
//     });
// });

router.post('/reset/:token', function(req, res) {
    let token = req.params.token;

    const { errors, isValid} = commonReset(req.body);
    if (!isValid) {
        return res.status(400).json({
            success: false,
            errors: errors

        });

    }

    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    // req.flash('error_msg', 'Password reset token is invalid or has expired.');
                    return res.send({success:false})
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                    req.logIn(user, function(err) {
                        done(err, user);
                    });
                });
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'Gmail',
                auth: {
                    user: 'todolistcpe@gmail.com',
                    pass: 'p@$$w0rd'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'todolistcpe@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello, '+ user.username+'!\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                return res.send({
                    success: true
                });
            });

        }
    ], function(err) {
        req.logout();
        // res.redirect('/auth/login');
    });
});


router.post('/login', function(req, res, next) {
    const { errors, isValid} = commonLogin(req.body);
    if (!isValid) {
        return res.status(400).json({
            success: false,
            errors: errors

        });

    }
    User.authenticate()(req.body.username, req.body.password, function(err, user) {
        if(!err){
            if(!user){

                errors.password = "Wrong password";

                return res.status(400).json({
                    success: false,
                    errors: errors
                });
            }
            else{
                req.logIn(user, function(err) {
                    if(!err){
                        console.log("Success");
                        // const token = jwt.sign({
                        //     id: user.id,
                        //     username: user.username
                        // }, config.jwtSecret);
                        // res.json({token, success: true});
                        // console.log(user.id);
                        res.status(200).json({
                            success: true,
                            user: user
                        });

                        // // console.log(user.id);
                        // return res.send({
                        //     success: true,
                        //     user: user
                        // });
                    }

                })
            }
        }

    });


});



router.get('/register/:identifier', (req, res) => {
    var usersReg = User.find();
    usersReg.findOne({ $or:[{ 'email': req.params.identifier}, {'username':req.params.identifier} ]},function(err, user) {
        if(user) {res.json({ user, success:false})}
        if(!user) {res.json({success: true})}
    });

});


router.get('/login/:identifier', (req, res) => {
    var usersLog = User.find();
    usersLog.findOne( {'username': req.params.identifier}, function(err, user) {
        if(user) {res.json({ user, success:true})}
        if(!user) {res.json({success: false})}
    });

});



router.get('/logout', function(req, res){
    req.logout();
    res.status(201).json({ success: true });
});


module.exports = router;