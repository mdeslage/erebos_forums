// Modules ===============================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');

// Configuration =========================================

var db = require('./config/db');

// Set the port
var port = process.env.PORT || 3000;

// Connection to mongodb
//mongoose.connect(db.url);

// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
var routes = require('./app/routes');
app.use('/', routes);

// start app ===============================================
// startup our app at http://localhost:3000
app.listen(port);               

// startup text                 
console.log('Server running on port ' + port);

// expose app           
exports = module.exports = app;