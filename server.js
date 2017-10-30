var express = require('express')
var app = express()
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
require('dotenv').config();

//Connect to MongoDb Database
mongoose.connect(process.env.MONGO_URL, function(err){
    if(err) throw err;
    console.log('Connected to Tips database.');
});

// required for passport
require('./controllers/passport')(passport);
app.use(session({secret: process.env.SESSION_SECRET})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.set('view-engine' , 'jade');

app.get('/', function (req, res) {
    res.send('Hello World!')
});


//Routes For User Auth
app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
}));

app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
}));

app.post('/logout' , function(req,res){
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

app.listen(port, function () {
    console.log('Awesome tips listening on port 3000!')
})
