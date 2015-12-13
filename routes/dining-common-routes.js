var express = require('express');

var model = require('../lib/dining_common');
var reviews = require('../lib/review');

var router = express.Router();

router.get('/', (req, res) => {
  //grab user session
  var user = req.session.user;
  var list_dcs = req.session.commons;

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
          user: user
        });
      }
    });
  }
});

router.get('/new', (req, res) =>{
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

module.exports = router;
