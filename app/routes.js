var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Thread = mongoose.model('Thread');
var Comment = mongoose.model('Comment');
var Category = mongoose.model('Category');
var passport = require('passport');

/* GET the home page */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


/*DB ROUTES*********************************************************/
/*CATEGORY**********************************************************/

// Preloading the Category object
router.param('category', function(req, res, next, id) {
    var query = Category.findById(id);

    query.exec(function(err, category) {
        if(err) { return next(err); }
        if(!category) {
            return next(new Error('Cannot find category'));
        }

        req.category = category;
        return next();
    })
});

// GET all the categories w/ 5 recent threads
router.get('/categories', function(req, res, next) {
    Category.find().populate('recentThreads', 'title').exec(function(err, categories) {
        if(err) { return next(err); }

        res.json(categories);
    })
});

// POST create a category
router.post('/categories', function(req, res, next) {
    var cat = new Category(req.body);

    cat.save(function(err, cat) {
        if (err) { return next(err); }

        res.json(cat);
    })
});

// DELETE remove a category and threads

/*USER**************************************************************/

// POST register a new user
router.post('/register', function(req, res, next) {
    if(!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ message: 'Please fill out all fields' });
    }

    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.email = req.body.email;
    user.permission_level = 0;

    user.save(function(err) {
        if(err) { return next(err); }

        return res.json({ token: user.generateJWT()  });
    });
});

// POST login for a registered user
router.post('/login', function(req, res, next) {

    if(!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Please fill out all fields' });
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

// GET all the users
router.get('/users', function(req, res, next) {
    User.find().exec(function(err, users) {
        if(err) { return next(err); }

        res.json(users);
    })
})

/*THREAD************************************************************/

// POST create a thread
router.post('/threads', function(req, res, next) {
    var thread = new Thread(req.body);

    thread.save(function(err, th) {
        if(err) { return next(err); }

        res.json(th);
    })
});

// GET thread
router.get('/threads', function(req, res, next) {
    Thread.find()
    .populate('category', 'name')
    .populate('author', 'username')
    .exec(function(err, threads) {
        if(err) { return next(err); }

        res.json(threads);
    })
})

/*COMMENT***********************************************************/


module.exports = router;