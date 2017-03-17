var jwt = require('jsonwebtoken');
var config = require('../../../config');
var User = require('../../../models/users');
var ObjectId = require('mongodb').ObjectId;
module.exports = function authenticate(req, res, next){
    const authorizationHeader = req.headers['authorization'];
    let token;
    let newUser = User.find();

    if(authorizationHeader) {
        token = authorizationHeader.split( '' )[1];
    }

    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if(err){
                res.status(401).json({error: 'Failed to authenticate'});
                console.log(decoded);
            }
            else{

                newUser.findOne({ _id:ObjectId(decoded.id)},function(err, user){
                    if(!user) {
                        res.status(404).json({error: 'No such user'});
                    }
                    req.currentUser = user;
                    next();
                })
            }
        });
    } else {
        res.status(403).json({
            error: 'No token provided'
        })
    }
}
