//////////////////////////////////////////////////////////////////////
// The team library //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//Database Connection Stuff
var pg = require('pg');
var constr = 'postgres://bhjkrphy:KobtP19YHn1XcmNEwlj5Xg7-GM2Koswk@pellefant.db.elephantsql.com:5432/bhjkrphy';

function result(success, message, data) {
	return {
		success: success,
		message: message,
		data: data,
		count: data.length
	};
}

function one(username, cb) {
  pg.connect(constr, (err, client, done) => {
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }
    client.query('select * from users where username = $1', [username], (err, result) => {
      done();

      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }

      if (result.rows.length == 0) {
        cb('user ' + username + ' does not exist');
        return;
      }

      var u = result.rows[0];

      cb(undefined, [u]);
    });

  });
}

function all(cb) {
  pg.connect(constr, (err, client, done) => {
    if (err) {
      cb('could not connect to the database: ' + err);
    }
    client.query('select * from users', (err, result) => {
      done();

      if (err) {
        cb('could not connect to the database: ' + err);
      }

      var users = result.rows;

      cb(undefined, users);
    });

  });
}

// This exports public functions to the outside world.
exports.all = all;
exports.one = one;
