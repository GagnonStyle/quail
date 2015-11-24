//database connection stuff
var pg = require('pg');
var constr = 'postgres://bhjkrphy:KobtP19YHn1XcmNEwlj5Xg7-GM2Koswk@pellefant.db.elephantsql.com:5432/bhjkrphy';

function one(dcid, cb) {
  pg.connect(constr, (err, client, done) => {
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }
    client.query('select * from dining_commons where dcid = $1', [dcid], (err, result) => {
      done();

      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }

      if (result.rows.length == 0) {
        cb('Dining Common with id ' + dcid + ' does not exist');
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
    client.query('select * from dining_commons', (err, result) => {
      done();

      if (err) {
        cb('could not connect to the database: ' + err);
      }

      var dining_commons = result.rows;

      cb(undefined, dining_commons);
    });

  });
}

exports.all   = all;
exports.one   = one;