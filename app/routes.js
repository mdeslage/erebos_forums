var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

/* GET the home page */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// POST register a new user
router.post('/register', function(req, res, next) {
    if(!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ message: 'Please fill out all fields' });
    }

    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.email(req.body.email);

    user.save(function(err) {
        if(err) { return next(err); }

        return res.json({ token: user.generateJWT()  });
    });
});

// POST login for a registered user
router.post('/login', function(req, res, next) {
    if(!req.body.username || !req.body.password) {
        return res.status(400).jjson({ message: 'Please fill out all fields' });
    }

    passport.authenticate('local', function(err, user, info) {
        if(err) { return next(err); }

        if(user) {
            return res.json({ token: user.generateJWT() });
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

module.exports = router;