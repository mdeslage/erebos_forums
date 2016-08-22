var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Thread = mongoose.model('Thread');
var Comment = mongoose.model('Comment');
var Category = mongoose.model('Category');
var passport = require('passport');
var jwt = require('express-jwt');

// Authentication middleware
var auth = jwt({
    // Change the secret so it's not hardcoded'
    secret: 'EREBOS',
    userProperty: 'payload'
});

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
    Category.find().exec(function(err, categories) {
        if(err) { return next(err); }
        // Get 5 recent threads for each category
        categories.forEach(function(cat, index) {
            Thread.find({ category: cat._id })
                .populate('author', 'username')
                .limit(5)
                .sort({ date: -1 })
                .exec(function(err, threads) {
                    if(err) { return next(err); }
                    categories[index].recentThreads = threads;
                    // Add response here because of async db 
                    if (index == categories.length - 1) {
                        res.json(categories);
                    }
            })
        });
    })
});

// GET a single category
router.get('/categories/:category', function(req, res, next) {
    res.json(req.category);
})

// POST create a category
router.post('/categories', auth, function(req, res, next) {
    
    var cat = new Category(req.body);

    cat.save(function(err, cat) {
        if(err) { return next(err); }

        res.json(cat);
    })
});

// DELETE remove a category and threads
router.delete('/categories/:category/delete', auth, function(req, res, next) {
    req.category.remove(function(err, cat) {
        if(err) { return next(err); }

        res.json(cat);
    })
});

// UPDATE a category
router.put('/categories/:category/update', auth, function(req, res, next) {
    // Update the name and permission level
    req.category.name = req.body.name;
    req.category.permission_level = req.body.permission_level;

    req.category.save(function(err, cat) {
        if(err) { return next(err); }

        res.json(cat);
    })

});


/*USER**************************************************************/

// Preloading the User object
router.param('user', function(req, res, next, id) {
    var query = User.findById(id);

    query.exec(function(err, user) {
        if(err) { return next(err); }
        if(!user) {
            return next(new Error('Cannot find user'));
        }

        req.user = user;
        return next();
    })
});

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
router.get('/users', auth, function(req, res, next) {
    User.find().exec(function(err, users) {
        if(err) { return next(err); }

        res.json(users);
    })
});

// DELETE a user
router.delete('/users/:user/delete', auth, function(req, res, next) {
    req.user.remove(function(err, user) {
        if(err) { return next(err); }

        res.json(user);
    })
});

// UPDATE a user
router.put('/users/:user/update', auth, function(req, res, next) {
    // Update the password, email, permission_level
    // Add support for changing the password soon
    //req.user.setPassword(req.body.password);
    req.user.permission_level = req.body.permission_level;
    req.user.email = req.body.email;

    req.category.save(function(err, cat) {
        if(err) { return next(err); }

        res.json(cat);
    })

});

/*THREAD************************************************************/

// Preloading the Thread object
router.param('thread', function(req, res, next, id) {
    var query = Thread.findById(id)
    .populate('author', 'username')
    .populate('category', 'name');

    query.exec(function(err, thread) {
        if(err) { return next(err); }
        if(!thread) {
            return next(new Error('Cannot find thread'));
        }

        req.thread = thread;
        return next();
    })
});


// POST create a thread
router.post('/threads', auth, function(req, res, next) {
    var thread = new Thread(req.body);
    thread.author = req.payload._id;

    thread.save(function(err, th) {
        if(err) { return next(err); }

        res.json(th);
    })
});

// GET all threads
router.get('/threads', function(req, res, next) {
    Thread.find()
    .populate('author', 'username')
    .exec(function(err, threads) {
        if(err) { return next(err); }

        res.json(threads);
    })
});

// GET all threads by category
router.get('/threads/category/:category', function(req, res, next) {
    Thread.find({ category: req.category._id })
    .populate('author', 'username')
    .exec(function(err, threads) {
        if(err) { return next(err); }

        res.json(threads);
    })
});

// GET single thread from id
router.get('/threads/:thread', function(req, res, next) {
    // Add the comments to the thread. Can't get populate to work
        Comment.find({ thread: req.thread._id })
            .populate('author', 'username')
            .exec(function(err, comments) {
            if(err) { return next(err); }
            
            req.thread.comments = comments;

            res.json(req.thread);
        });
});

// DELETE a thread
router.delete('/threads/:thread/delete', auth, function(req, res, next) {
    req.user.remove(function(err, thread) {
        if(err) { return next(err); }

        res.json(thread);
    })
});


/*COMMENT***********************************************************/

// Preloading the Comment object
router.param('Comment', function(req, res, next, id) {
    var query = Comment.findById(id)
        .populate(thread);

    query.exec(function(err, comment) {
        if(err) { return next(err); }
        if(!comment) {
            return next(new Error('Cannot find comment'));
        }

        req.comment = comment;
        return next();
    })
});


// POST create a comment
router.post('/comments', auth, function(req, res, next) {
    var comment = new Comment(req.body);
    comment.author = req.payload._id;

    comment.save(function(err, comment) {
        if(err) { return next(err); }
        // increment the number of comments for the thread
        // Update the last comment date
        Thread.findById(comment.thread).exec(function(err, thread) {
            if(err) { return next(err); }
            thread.incrementReplies();
        });

        // populate the name of the user
        Comment.findById(comment._id)
            .populate('author', 'username')
            .exec(function(err, cmt) {
                if(err) { return next(err); }

                res.json(cmt);
            });
    });
});

// GET all comments
router.get('/comments', auth, function(req, res, next) {
    Comment.find()
    .exec(function(err, comments) {
        if(err) { return next(err); }

        res.json(comments);
    })
});

// GET all comments by thread
router.get('/comments/:thread', function(req, res, next) {
    Comment.find({ thread: req.thread._id })
    .exec(function(err, comments) {
        if(err) { return next(err); }

        res.json(comments);
    })
});

// DELETE a comment
router.delete('/comments/:comment/delete', auth, function(req, res, next) {
    req.comment.remove(function(err, comment) {
        if(err) { return next(err); }

        res.json(comment);
    })
});

module.exports = router;