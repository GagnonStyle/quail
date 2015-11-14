//////////////////////////////////////////////////////////////////////
// The team library //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * The `member` function creates a new team member.
 *
 * You should use this function to create new "team members". It is a
 * utility function that can be used in other library routines to
 * create new members. It is a useful technique to abstract the
 * creation of data from the actual data representation itself. In
 * this case a *member* is an object with four important properties:
 *
 * `user`: The username of the member. This should be the username
 * of the team member used to login to UMass Spire, Moodle, etc. You
 * will need to ask your fellow team members for their username.
 * `fname`: The first name of a team member.
 * `lname`: The last name of a team member.
 * `year`: Their current year of college (freshman, sophomore, junior, senior)
 *
 * We give you the implementation of this!
 *
 * @param  {string} user  the team member's username
 * @param  {string} fname the team member's first name
 * @param  {string} lname the team member's last name
 * @param  {string} year  the team member's year of college
 * @return {object} { user, fname, lname, year }
 */
function member(user, fname, lname, year, desc) {
	return {
		user: user,
		fname: fname,
		lname: lname,
		year: year,
    desc: desc
	};
}

// This library contains an internal data structure for recording
// team members. It is an array of member objects. You should add an
// entry for each of your team members. You should use the `member`
// function to easily create a new member object.
var team = [
  member('smgagnon', 'Spencer', 'Gagnon', 'junior', 'Hey, Spencer here. ' +
    'My main focus in U-Food is going to be parsing the data from our source, ' +
    '(The umass dining site most likely) into something that we can use to ' +
    'calculate stats about each of the dining halls. The scraper I plan ' +
    'on designing will be versatile and (hopefully) have a high degree' +
    ' of success at getting correct information, because the whole of our ' +
    'app depends on it! I also love me some smooth looking web apps, so I’m ' +
    'sure I’ll have a part in designing and implementing the overall look of' +
    ' the app itself, hopefully complete with animations, an eye-popping color ' +
    'scheme, and a pleasing user interface.'),
  member('glarionov', 'George', 'Larionov', 'junior', 'Hey! I\'m George, ' +
    'and I will be working on making all the live data our app receives ' +
    'from our nice users into something useful. This involves the twofold ' +
    'task of storing the data and then parsing it into information that can '+
    'be displayed back to the users. Storing the data in an orderly and efficient '+
    'manner is important in order to then be able to access it in a logical way. '+
    'Storage will have to take into account the date, time, and area of the site '+
    'which the data was received from, since some data only has meaning within a '+
    'particular context. Similarly, parsing the data needs to take into account '+
    'all these same variables and put many different factors together to produce the necessary output. '+
    'I have some experience working in Javascript, Bootstrap and Jekyll, and especially enjoy writing '+
    'compact, tight code which is transparent and logical. I look forward to blowing '+
    'users\' socks off with our magnificent web application and cannot wait to get started.'),
  member('nrecchia', 'Neven', 'Recchia', 'junior', "The first twin! I’m Neven and I am in charge " +
    "of U-Food’s special events section. Nobody wants to miss specials events such as apple week " +
    "or greek specialties day. The special events section will be retrieving data from the " +
    "dining services website so that users will not miss out on the extra flair. In addition, the " +
    "U-Food team are hoping to include user interaction with official and informal events that may " +
    "be happening in any of the dining areas. I will also be giving some contributions with the " +
    "front end and the design. The U-Food team is working out to be a fun bunch and I look forward " +
    "to having a great time working on this project. \"All our dreams can come true, if " +
    "we have the courage to pursue them.\" \"It\'s kind of fun to do the impossible.\" - Walt Disney"),
  member('nsrecchia', 'Noel', 'Recchia', 'junior', 'The second twin! I’m Noel and some of my U-Food ' +
		'plate involves ironing out general information for the team. Working on live data' +
		'utilization with George will be the meat on my plate. The veggies and the sides' +
		'include helping other members with their share U-Food. In regards to live data,' +
		'creating and organizing a smart, flexible database is a priority. Information and ' +
		'organization will be diverse and the database will reflect that. I enjoy working with others, ' +
		'and I am not afraid to get my hands dirty for others that need assistance. ' +
		'I am excited to be part of the team and part of the project!'),
  member('dwhitaker', 'Dave', 'Whitaker', 'junior', 'Hey, My name is Dave. One feature that U-Food will '+
      'be implementing is the feature that allows users to input reviews of the dining halls and the food ' +
      'they ate. My goal for the team is to implement ways for users to contribute their ratings to the ' +
      'website, whether it be a simple 5 star rating, or a written comment. The goal here is to allow ' +
      'users to easily input their reviews, and have them be displayed properly on the website. This ' +
      'will require having databases with all the reviews, and handling them properly. We here at U-Food ' +
      'think that the users will really find it interesting to see what the community thinks of the food. ' +
      'Theres nothing that this super team cannot accomplish, the team and I are excited to put this ' +
      'all together.'),
  member('jamiraul', 'Jef', 'Amirault', 'junior', 'My name is Jef and I will be focusing on super ' +
    'intuitive forms extracting the most pertinent information from our users while minimizing the ' +
    'thought and effort required by the user. Nobody likes surveys, but that is more or less what' +
    ' we are pursuing here. The goal is to not make it feel like work when you are contributing to ' +
    'the app. Surveying this information from the user should be fun and easy-as-pie. I’ve been ' +
    'programming in the Ruby on Rails web framework here at UMass IT for 2.5 years. I love the ' +
    'feeling of a pristine web form. I\'m looking forward to making clean, efficacious web forms.' +
    ' My goal for user experience is thus: at first, the user should be entering data (like what\'s ' +
    'for food right at this moment), and say "DAMN that was some cool interface." After a few uses, ' +
    'there should be no thought whatsoever involved in posting live data.')

];

/**
 * `copy` makes a copy of a member object. This is useful as we do not
 * want to leak our internal member data structures outside of this
 * library. It must be used by the `find` function below to return
 * new/distinct copies of a member object.
 *
 * @param  {member object} member a member object
 * @return {member object}        a copy of member
 */
function copy(memb) {
	return member(memb.user, memb.fname, memb.lname, memb.year, memb.desc);
}

/**
 * `copyAll` returns a copy of all team members in a new array. It
 * relies on your implementation of `copy` to do this.
 *
 * We give you this one!
 *
 * @param  {array} members an array of member objects
 * @return {array}         a copy of the array of member objects
 */
function copyAll(members) {
	var nmembers = [];
	members.forEach(m => {
		nmembers.push(copy(m));
	});
	return nmembers;
}

/**
 * The `result` function is another utility function used to return
 * a "result" object to the caller of this library. Again, a useful
 * technique is to abstract out the creation of an object from its
 * internal representation. In this case, we create a "result" object
 * with four important properties:
 *
 * `success`: this is a boolean indicating if the result is a
 * successful response. true if it is; false otherwise.
 * `message`: this is an informational message that is helpful to
 * the caller to understand the success or failure of the result.
 * `data`: this is the actual data that is returned. In our case the
 * data will always be an array of members.
 * `count`: this is the number of members in the result - this is
 * derived from the number of entries in `data`.
 *
 * @param  {boolean} success true if success; false otherwise
 * @param  {string}  message informational message
 * @param  {array} 	 data    array of members
 * @return {object}          result object
 */
function result(success, message, data) {
	return {
		success: success,
		message: message,
		data: data,
		count: data.length
	};
}

/**
 * `find` is used to lookup a member by their username. It returns
 * a member object if it is found or `null` if it is not.
 *
 * You need to implement this function. You should iterate over the
 * team array looking for the member with the correct username. If the
 * member is found you should return the member object. If it is not
 * found it should return `null`.
 *
 * Make sure you use `copy` to produce a copy of the member object if
 * one is found for the given `user`.
 *
 * @param  {string} user the member's username
 * @return {object}      the member object or `null` if not found
 */
function find(user) {
  for(var i = 0; i < team.length; i++){
    if(team[i].user == user){
      return copy(team[i]);
    }
  }
	return null;
}

/**
 * `all` returns a result object containing all of the team members.
 * This function always returns `true` as it will always return an
 * array of all the members. Even if there are no members in the team
 * it will return `true` with an empty array. You should use the
 * `result` function to create a result object. The message to the
 * `result` function should be 'team members' (the unit tests will
 * test this).
 *
 * The array of team members returned should be a copy of the original
 * array of team members. `copyAll` is a useful function for this.
 *
 * @return {result object}  a result object
 */
function all() {
	return result(true, 'team members', copyAll(team));
}

/**
 * `one` returns a result object containing the team member that was
 * found. This function should check to make sure that the argument
 * `user` passed to it is a string - remember, this is a dynamically
 * typed language so we need to do the type checking manually.
 *
 * If `user` is not a string you must return a result object
 * indicating failure, a useful message, and an empty array. Use the
 * `result` function to do this.
 *
 * Otherwise, you must use the `find` function to find the member. If
 * the member is not found, return a new result object
 * indicating failure, the message 'team member not found', and an
 * empty array.
 *
 * If the member is found, return a result object indicating success,
 * the message 'team member found', and an array containing the single
 * member.
 *
 * @param  {string} user    the username of a team member
 * @return {result object}  a result object
 */
function one(user) {
	var found = find(user);
  if(found == null){
    return result(false, 'team member not found', []);
  } else {
    return result(true, 'team member found', [found]);
  }
}

// This exports public functions to the outside world.
exports.all = all;
exports.one = one;
