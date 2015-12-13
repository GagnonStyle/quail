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
      return;
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
    if(err)
      cb(err);
    if(user && user[0].password != password)
      cb('Incorrect Password');
  });
}

function changePass(username, currPass, newPass, cb) {
  login(username, currPass, function(err, user) {
    if(err)
      cb(err);
    else
    {
      pg.connect(constr, (err, client, done) => {
        if (err)
        {
          cb('could not connect to the database: ' + err);
          return;
        }

        client.query('update users set password = $2 where username = $1', [username,newPass], (err, result) => {
        done();

        if (err)
        {
          cb('could not connect to the database: ' + err);
          return;
        }

        cb(undefined, username);
        });
      });
    }
  });
}

// helper function, used in addUser, not exported
// returns callback with signature: cb(string,boolean)
// string is any error that was thrown during function
// boolean is true if username is taken, false if not
function exists(username, cb) {
  pg.connect(constr, (err, client, done) => {
    if (err)
    {
      cb('could not connect to the database: ' + err);
      return;
    }
    // does user exist?
    client.query('select * from users where username = $1', [username], (err, result) => {
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

// adds new user using info in 'data' object
// 'data' object has properties:
// 'fname', 'lname', 'uname', 'pass', 'pass2', 'about'
// all but 'about' are not empty, and pass==pass2
// if about is empty, it is converted to null
function addUser(data, cb) {
  // check if username is taken
  exists(data.uname, (err,exists) => {
    if(err)
      cb(err);

    else if(exists)
      cb('Username taken');

    else
    {
      // if about field is empty, convert to null
      if(!data.about)
        data.about = null;

      pg.connect(constr, (err, client, done) => {
        if (err)
        {
          cb('could not connect to the database: ' + err);
          return;
        }
        else
        {
          // add user to database
          client.query('insert into users values (default,$1,$2,$3,$4,$5)',
                [data.uname,data.pass,data.fname,data.lname,data.about], (err, result) => {
            done();

            if (err)
            {
              cb('could not connect to the database: ' + err);
              return;
            }

            cb(undefined,data.uname);
          });
        }
      });
    }
  });
}


// This exports public functions to the outside world.
exports.all   = all;
exports.one   = one;
exports.login = login;
exports.changePass = changePass;
exports.addUser = addUser;
