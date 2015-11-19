//////////////////////////////////////////////////////////////////////
// The user library //////////////////////////////////////////////////
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

function login(username, password, cb) {
  one(username, function(err, user){
    if(err){
      cb(err);
    }
    if(user[0].password != password){
      cb('Incorrect Password');
    } else {
      cb(undefined, user[0]);
    }
  });
}

function changePass(username, newPass, cb) {
  pg.connect(constr, (err, client, done) => {
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }
    client.query('update users
                  set password = $2
                  where username = $1', [username,password], (err, result) => {
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

// This exports public functions to the outside world.
exports.all   = all;
exports.one   = one;
exports.login = login;
exports.changePass = changePass;
