// app/models/User.js
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var uuid = require('node-uuid');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true
    },
    hash: String,
    salt: String,
    email: String,
    permission_level: { type: Number, default: 0 }
});

UserSchema.methods.setPassword = function(pwd){
    this.salt = crypto.randomBytes(16).toString('hex');
    // pwd, salt, iterations, key length
    this.hash = crypto.pbkdf2Sync(pwd, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(pwd) {
    var hash = crypto.pbkdf2Sync(pwd, this.salt, 1000, 64).toString('hex');

    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    // Set the token to expire in 60 days
    var today = new Date();
    var expire = new Date(today);
    expire.setDate(today.getDate() + 60);

    // Create the secret using node-uuid
    var secret = uuid.v4();

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expire.getTime() / 1000),
        permission_level: this.permission_level
    }, secret);
};



var model = mongoose.model('User', UserSchema);

module.exports = model;