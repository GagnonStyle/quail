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

function exists(DCName, cb) {
  pg.connect(constr, (err, client, done) => {
    if (err)
    {
      cb('could not connect to the database: ' + err);
      return;
    }
    // does user exist?
    client.query('select * from dining_commons where name = $1', [DCName], (err, result) => {
      done();

      if (err)
      {
        cb('could not connect to the database: ' + err);
        return;
      }
      // does not exist
      else if(result.rows.length==0)
        cb(undefined,false);
      // exists
      else
        cb(undefined,true);
    });
  });
}

function addDC(data, cb){
  exists(data.name, function(err, exists){
    if(err)
      cb(err);
    else if(exists)
      cb('DC name already taken');
    else if(!data.name || !data.location)
      cb('Make sure to fill out every field!');
    else {
      pg.connect(constr, (err, client, done) => {
        if (err) {
          cb('could not connect to the database: ' + err);
          return;
        } else {
          // add DC to database
          client.query('insert into dining_commons values (default,$1,$2,$3,$4)', [data.name, data.location, 0, 0], (err, result) => {
              done();
              if (err) {
                cb('could not connect to the database: ' + err);
                return;
              }

              cb(undefined, data.name);
            });
        }
      });
    }
  });
}

exports.all   = all;
exports.one   = one;
exports.addDC = addDC;