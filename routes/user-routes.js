var express = require('express');

var model = require('../lib/user');

var router = express.Router();

var online = {};

router.get('/', (req, res) => {
  //grab user session
  var session_user = req.session.user;

  if (req.query.user){
    model.one(req.query.user, function(err, user){
      if(err){
        req.flash('home', 'ERROR: ' + err);
        res.redirect('/home')
      } else {
        res.render('team', {
          members: user,
          user: session_user
        });
      }
    });
  } else {
    model.all(function(err, users){
      if(err){
        req.flash('home', 'ERROR: ' + err);
        res.redirect('/home')
      } else {
        res.render('team', {
          members: users,
          user: session_user
        });
      }
    });
  }
});

router.get('/logout', (req,res) => {
  var user = req.session.user;
  if(user && !online[user.username]){
    //var message = req.flash('logout successful');
    delete req.session.user;
  }
  else if(user){
    delete online[user.username];
    delete req.session.user;
  }

  res.redirect('/home');
 
})


router.get('/login', (req, res) => {
  var user = req.session.user;

  // Redirect to main if cookie and user is online:
  if (user && online[user.username]) {
    res.redirect('/home');
  } else {
    var message = req.flash('login');
    res.render('login', { message: message });
  }
});

router.get('/profile', (req,res) => {
  //grab user session
  var user = req.session.user;

  // if online, display profile
  if (user && online[user.username])
  {
    var message = 'Welcome, ' + user.username + '!'
    res.render('user-profile', {
    message: message,
    user: user});
  }
  // else redirect to login
  else
  {
    req.flash('login','Please login to view your profile:')
    res.redirect('/users/login');
  }
});

router.get('/change-password', (req,res) => {
  //grab user session
  var user = req.session.user;
  var message = req.flash('change-pass');

  // if online, render change-pass view
  if (user && online[user.username])
  {
    res.render('change-pass', {
    user: user,
    message: message});
  }
  // else redirect to login
  else
  {
    req.flash('login','Please login to change your password:')
    res.redirect('/users/login');
  }
});

// handles account creation
router.get('/signup', (req,res) => {
  //grab user session
  var user = req.session.user;
  var message = req.flash('signup');

  // can't create account if already logged in, redirect to home
  if (user)
  {
    req.flash('home', 'Cannot create account if logged in.');
    res.redirect('/home');
  }
  // else render signup page
  else
    res.render('signup', {
      user: user,
      message: message});
});

router.post('/auth', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirect to main if cookie and user is online:
  if (user && online[user.username]) {
    res.redirect('/home');
  }
  else {
    // Pull the values from the form:
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
      req.flash('login', 'did not provide the proper credentials');
      res.redirect('/users/login');
    }
    else {
      model.login(username, password, function(error, user) {
        if (error) {
          // Pass a message to login:
          req.flash('login', error);
          res.redirect('/users/login');
        }
        else {
          // add the user to the map of online users:
          online[user.username] = user;

          // create a session variable to represent stateful connection
          req.session.user = user;

          // Pass a message to main:
          req.flash('home', 'Logged in as ' + user.username);
          res.redirect('/home');
        }
      });
    }
  }
});

router.post('/authchange', (req,res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Change password if cookie and user is online:
  if (user && online[user.username])
  {
    var currpass = req.body.password;
    var newpass = req.body.newpass;
    var newpass2 = req.body.newpass2;
    var username = user.username;

    if (!currpass || !newpass)
    {
      req.flash('change-pass', 'did not provide a valid password');
      res.redirect('/users/change-password');
    }
    else if(newpass!==newpass2)
    {
      req.flash('change-pass', 'new passwords don\'t match');
      res.redirect('/users/change-password');
    }
    else
    {
      model.changePass(username, currpass, newpass, function(err, user) {
        if(err)
        {
          req.flash('change-pass', 'Error: '+err);
          res.redirect('/users/change-password');
        }
        else
        {
          delete online[username];
          delete user;
          req.flash('login', "Password change successful, please enter credentials:");
          res.redirect('/users/login');
        }
      });
    }
  }
  else
  {
    req.flash('login', "Please log in to change your password:");
    res.redirect('/users/login');
  }
});

router.post('/new', (req,res) => {
  // can't create account if already logged in, redirect to home
  if(req.session.user)
  {
    req.flash('home', 'Error: Already logged in.');
    res.redirect('/home');
  }
  // otherwise create new user
  else
  {
    // 'data' object has properties:
    // 'fname', 'lname', 'uname', 'pass', 'pass2', 'about'
    // 'about' is optional (can be empty)
    var data = req.body;
    console.log(data.fname);
    // if any empty inputs, redirect back to signup with message
    if(!(data.fname&&data.lname&&data.uname&&data.pass&&data.pass2))
    {
      req.flash('signup', 'One or more required fields omitted');
      res.redirect('/users/signup');
    }
    // check if passwords match
    else if(data.pass!==data.pass2)
    {
      req.flash('signup', 'Passwords must match');
      res.redirect('/users/signup');
    }
    else
    {
      model.addUser(data, function(err, user) {
        if(err)
        {
          req.flash('signup', 'Error: '+err);
          res.redirect('/users/signup');
        }
        else
        {
          req.flash('login', 'Account created successfully! Please log in.');
          res.redirect('/users/login');
        }
      });
    }
  }   
});

module.exports = router;
