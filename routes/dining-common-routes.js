var express = require('express');

var model = require('../lib/dining_common');

var router = express.Router();

router.get('/', (req, res) => {
  //grab user session
  var user = req.session.user;

  if (req.query.dcid){
    model.one(req.query.dcid, function(err, dcs){
      if(err){
        req.flash('home', 'ERROR: ' + err);
        res.redirect('/home')
      } else {
        res.render('dining_common', {
          dining_commons: dcs,
          user: user
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
          user: user
        });
      }
    });
  }
});

module.exports = router;
