//database connection stuff
var pg = require('pg');
var constr = 'postgres://bhjkrphy:KobtP19YHn1XcmNEwlj5Xg7-GM2Koswk@pellefant.db.elephantsql.com:5432/bhjkrphy';

function allForDc(dcid, cb){
	pg.connect(constr, (err, client, done) => {
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }
    client.query('select * from reviews left join users on reviews.uid=users.uid where reviews.dcid = $1 ', [dcid], (err, result) => {
      done();

      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }

      var reviews = result.rows;

      cb(undefined, reviews);
    });
  });
}

exports.allForDc = allForDc;