var express = require('express');
var app = express();
//var port = process.env.PORT || 3000;
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
require('dotenv').config();

var models = require('./db/models');
const TipModel = require('./db/models/index').Tip;
const UserModel = require('./db/models/index').User;

// create .env file in root direct if not present, assign a value to SESSION_SECRET=SOMESTRING
app.use(cookieParser());                // read cookies (needed for auth)
app.use(bodyParser());                  // get information from html forms
app.use(methodOverride('_method'));
app.use(session({secret: process.env.SESSION_SECRET})); // session secret
app.use(passport.initialize());
app.use(passport.session());            // persistent login sessions
app.use(flash());
app.use(express.static('./public'));    // set directory for static files

app.set('views', './views');            // set express view template directory for express
app.set('view engine' , 'jade');        // set express view engine to use jade

app.get('/', function (req, res) {
  req.flash('info', 'Welcome');

  models.Tip.findAll({
    // TODO :: USE JOIN TO GET USERNAMES FROM TIP BY ID
  }).then((tips) => {
      res.render('index', {currentUser : req.user, infoFlash : req.flash('info'), tips: tips})
  })
});


// ROUTES
require('./controllers/passport')(passport);            // required for passport
require('./controllers/auth')(app, passport);           //  Routes for authentication
require('./controllers/tips')(app);                     // Routes for Tips


// ERROR HANDLING
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

// EXPORT MODULE, USE BIN/WWW - SAME AS EXPRESS-GENERATOR
// NOT SURE IT MAKES ANY DIFFERENCE
module.exports = app;

// app.listen(3000, function () {
//     console.log('Awesome tips listening on port 3000!')
// });
