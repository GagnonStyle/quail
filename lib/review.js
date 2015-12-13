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

function all( cb){
  pg.connect(constr, (err, client, done) => {
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }
    client.query('select * from reviews ' +
                 'left join users on reviews.uid=users.uid ' +
                 'left join dining_commons on reviews.dcid=dining_commons.dcid ' +
                 'order by reviews.time desc limit 5', (err, result) => {
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

function add(data, current_user, cb){
  if(!data.body || !data.dcid)
    cb('Make sure to fill out every field!');
  else {
    data.uid = current_user.uid;
    pg.connect(constr, (err, client, done) => {
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      } else {
        client.query('insert into reviews values (default, $1, $2, $3, $4)', [data.dcid, data.uid, 'NOW()', data.body], (err, result) => {
          done();
          if (err) {
            cb('could not connect to the database: ' + err);
            return;
          }

          cb(undefined, data);
        });
      }
    });
  }
}

exports.allForDc = allForDc;
exports.all = all;
exports.add = add;