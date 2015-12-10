var express       = require('express');
var handlebars    = require('express-handlebars');
var fs            = require('fs');
var session       = require('express-session');
var flash         = require('connect-flash');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');


var app = express();

app.use(session({
  secret: 'octocat',
  saveUninitialized: false, // does not save uninitialized session.
  resave: false             // does not save session if not modified.
}));
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var DC = require('./lib/dining_common');
function getDCs(req,res,next){
  DC.all(function(err, dcs){
    req.session.commons = dcs;
    next();
  });
}
app.use(getDCs);

app.set('port', process.env.PORT || 3000);

var view = handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', view.engine);
app.set('view engine', 'handlebars');

// This does the setup for static file serving. It uses express'
// static middleware to look for files in /public if no other route
// matches. We use the __dirname special variable which indicates the
// directory this server is running in and append it to '/public'.
app.use(express.static(__dirname + '/public'));

// The `testmw` function represents out testing middleware. We use
// this in our views to conditionally include the Mocha and Chai
// testing framework as well as our own tests. Because this is a
// middleware function it expects to receive the request object
// (`req`), response object (`res`), and `next` function as arguments.
// The `next` function is used to continue processing the request
// with subsequent routes.
function testmw(req, res, next) {
  // This checks the 'env' application variable to determine if we are
  // in "production" mode. An application is in "production" mode if
  // it is actually deployed. This can be set by the NODE_ENV
  // environment variable. It also checks to see if the request has
  // given a `test` querystring parameter, such as
  // http://localhost:3000/about?test=1. If the route has that set
  // then showTests will be set to a "truthy" value. We can then
  // use that in our handlebars views to conditionally include tests.
  res.locals.showTests = app.get('env') !== 'production' &&
                         req.query.test;
  // Passes the request to the next route handler.
  next();
}

// This adds our testing middleware to the express app.
app.use(testmw);

//////////////////////////////////////////////////////////////////////
///// User Defined Routes ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

app.get('/home', (req, res) => {
  var user = req.session.user;
  var list_dcs = req.session.commons;
  var message = req.flash('home');
  res.render('home', {
    message: message,
    user: user,
    list_dcs: list_dcs,
    dining_commons: list_dcs,
    foods: {
      'pizza': 'Pizza',
      'sushi': 'Sushi',
      'chicken fingers': 'Chicken Fingers'
    },
    reviews: {
      '1': {
        'dc': 'Berkshire',
        'title': 'OMG',
        'text': 'Those were the best chicken fingers I\'ve probably ever had in my entire life. I am going to come back for this chicken fingers every day until I die or graduate.',
        'user': 'omg123',
        'time': 'a few seconds ago'
      },
      '2': {
        'dc': 'Hampshire',
        'title': 'So sushi. Such happy.',
        'text': 'I just got six plates of sushi without having to wait for anyone.',
        'user': 'sushi32king',
        'time': 'about 6 minutes ago'
      },
      '3': {
        'dc': 'Worcester',
        'title': 'Nice morning tunes',
        'text': 'Worcester has such chill music this morning. That trumpet guy is a BAMF.',
        'user': 'foobar64',
        'time': 'about 11 minutes ago'
      }
    }
  });
});

app.use('/users', require('./routes/user-routes'));
app.use('/dining_commons', require('./routes/dining-common-routes'));

app.get('/about', (req, res) => {
  var user = req.session.user;
  var list_dcs = req.session.commons;

  res.render('about', {
    user: user,
    list_dcs: list_dcs
  });
});

app.get(['/','/mockups'], (req, res) => {
  var user = req.session.user;
  var list_dcs = req.session.commons;

  if(req.query.mockup){
    var mockup = req.query.mockup + '_mockup.png';
  } else {
    var mockup = 'home_mockup.png';
  }
  fs.stat('public/img/mockups/' + mockup, function(err, stat) {
    if (err) {
      notFound404(req, res);
    } else {
      var text = mockup.substring(0, mockup.indexOf('_mockup.png')).replace(/_/g, ' ');
      res.render('mockups', {
        mockup: mockup,
        text: text,
        user: user,
        list_dcs: list_dcs
      });
    }
  });
});

//////////////////////////////////////////////////////////////////////
//// Application Startup /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Starts the express application up on the port specified by the
// application variable 'port' (which was set above). The second
// parameter is a function that gets invoked after the application is
// up and running.
app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' +
              app.get('port') + '; press Ctrl-C to terminate');
});
