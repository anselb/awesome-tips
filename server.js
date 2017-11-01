var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var maps = require('@google/maps').createClient({
    key: process.env.MAP_API_KEY
});  // use library for Location & Places https://github.com/googlemaps/google-maps-services-js

require('dotenv').config();

// Connect to MongoDb Database
// create .env file if not present, assign a mongodb connection string to MONGO_URL to connect to local DB
mongoose.connect(process.env.MONGO_URL, function(err){
    if(err) throw err;
    console.log('Connected to Tips database.');
});

// create .env file if not present, assign a value to SESSION_SECRET
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(session({secret: process.env.SESSION_SECRET})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.use(express.static('./public')); // set directory for static files

app.set('views', './views'); // set express view template directory for express
app.set('view engine' , 'jade'); // set express view engine to use jade

app.get('/', function (req, res) {
    req.flash('info', 'Welcome');
    res.render('index', {currentUser : req.user, infoFlash : req.flash('info')})
});

// required for passport
require('./controllers/passport')(passport);
//Routes for authentication
require('./controllers/auth')(app, passport);
// Routes for Tips
require('./controllers/tips')(app);


// Error handling
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if(err.status == 404) {
  //do logging and user-friendly error message display
    res.redirect('/404.html');
  } else if (err.status == 500) {
    res.redirect('/500.html');
  }
});

app.listen(port, function () {
    console.log('Awesome tips listening on port 3000!')
});
