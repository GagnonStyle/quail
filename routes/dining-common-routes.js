var express = require('express');

var model = require('../lib/dining_common');
var reviews = require('../lib/review');

var router = express.Router();

router.get('/', (req, res) => {
  //grab user session
  var user = req.session.user;
  var list_dcs = req.session.commons;
  var message = req.flash('dining_commons');

  if (req.query.dcid){
    model.one(req.query.dcid, function(err, dcs){
      if(err){
        req.flash('home', 'ERROR: ' + err);
        res.redirect('/home')
      } else {
        reviews.allForDc(req.query.dcid, function(err, revs){
          res.render('dining_common', {
            dining_commons: dcs,
            list_dcs: list_dcs,
            user: user,
            reviews: revs
          });
        });
      }
    });
  } else {
    model.all(function(err, dcs){
      if(err){
        req.flash('home', 'ERROR: ' + err);
        res.redirect('/home')
      } else {
        res.render('dining_common', {
          dining_commons: dcs,
          list_dcs: list_dcs,
          user: user,
          message: message
        });
      }
    });
  }
});

router.get('/new', (req, res) => {
  var user = req.session.user;
  var list_dcs = req.session.commons;
  var message = req.flash('new-dc');

  if (!user) {
    req.flash('home', 'You must be logged in to create a DC');
    res.redirect('/home');
  } else {
    res.render('new-dc', {
      user: user,
      message: message,
      list_dcs: list_dcs
    });
  }
});

router.post('/create', (req, res) => {
  var user = req.session.user;
  if (!user) {
    //  redirect if user is not logged in
    req.flash('home', 'Error: Not logged in.');
    res.redirect('/home');
  } else if (!user.admin) {
    //  redirect if user is not admin
    req.flash('home', 'Error: Only an admin can do that.');
    res.redirect('/home');
  } else {
    //  create dining commons
    var data = req.body;
    model.addDC(data, function(err, dc) {
      if(err) {
        req.flash('new-dc', 'Error: '+err);
        res.redirect('/dining_commons/new');
      } else {
        req.flash('dining_commons', 'Dining commons ' + dc + ' registered');
        res.redirect('/dining_commons');
      }
    });
  }
});


// THIS WILL BE USED TO UPDATE THE NOISE + TRAFFIC LEVEL
router.post('/levelchange', (req,res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Change levels if user is online:
  if (!user) {
    req.flash('login', "Please log in to change your password:");
    res.redirect('/users/login');
  }
  else {
    var data = req.body;
    model.changeLevels(data, function(err, user) {
      if(err)
      {
        req.flash('dining-common', 'Error: '+err);
        res.redirect('/dining_commons');
      }
      // if successfull
      else
      {
        req.flash('dining-common', "Traffic level changed successfully");
        res.redirect('/dining_commons');
      }
    });
  }
});

module.exports = router;
