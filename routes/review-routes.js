var express = require('express');

var model = require('../lib/review');

var router = express.Router();

router.get('/new', (req, res) =>{
  var user = req.session.user;
  var list_dcs = req.session.commons;
  var message = req.flash('new-review');

  if (!user) {
    req.flash('home', 'You must be logged in to write a Review');
    res.redirect('/home');
  } else {
    res.render('new-review', {
      user: user,
      message: message,
      list_dcs: list_dcs
    });
  }
});

router.post('/create', (req, res) =>{
  var user = req.session.user;
  if (!user) {
    req.flash('home', 'Error: Not logged in.');
    res.redirect('/home');
  } else {
    var data = req.body;
    model.add(data, user, function(err, dc) {
      if(err) {
        req.flash('new-dc', 'Error: '+ err);
        res.redirect('/dining_commons/new');
      } else {
        req.flash('dining_commons', 'Review Created');
        res.redirect('/dining_commons');
      }
    });
  }
});

module.exports = router;
