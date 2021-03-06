drop table if exists users;
drop table if exists dining_commons;
drop table if exists reviews;

create table users (
  uid serial,
  username varchar(255),
  password varchar(255),
  firstname varchar(255),
  lastname varchar(255),
  description text,
  admin boolean,
  primary key (uid)
);

insert into users values (default, 'smgagnon', 'password', 'Spencer', 'Gagnon', 'Hey, Spencer here. My main focus in U-Food is going to be parsing the data from our source, (The umass dining site most likely) into something that we can use to calculate stats about each of the dining halls. The scraper I plan on designing will be versatile and (hopefully) have a high degree of success at getting correct information, because the whole of our app depends on it! I also love me some smooth looking web apps, so I’m sure I’ll have a part in designing and implementing the overall look of the app itself, hopefully complete with animations, an eye-popping color scheme, and a pleasing user interface.', TRUE);
insert into users values (default, 'glarionov', 'password', 'George', 'Larionov', 'Hey! I''m George, and I will be working on making all the live data our app receives from our nice users into something useful. This involves the twofold task of storing the data and then parsing it into information that can be displayed back to the users. Storing the data in an orderly and efficient manner is important in order to then be able to access it in a logical way. Storage will have to take into account the date, time, and area of the site which the data was received from, since some data only has meaning within a particular context. Similarly, parsing the data needs to take into account all these same variables and put many different factors together to produce the necessary output. I have some experience working in Javascript, Bootstrap and Jekyll, and especially enjoy writing compact, tight code which is transparent and logical. I look forward to blowing users'' socks off with our magnificent web application and cannot wait to get started.', TRUE);
insert into users values (default, 'nrecchia', 'password', 'Neven', 'Recchia', 'The first twin! I’m Neven and I am in charge of U-Food’s special events section. Nobody wants to miss specials events such as apple week or greek specialties day. The special events section will be retrieving data from the dining services website so that users will not miss out on the extra flair. In addition, the U-Food team are hoping to include user interaction with official and informal events that may be happening in any of the dining areas. I will also be giving some contributions with the front end and the design. The U-Food team is working out to be a fun bunch and I look forward to having a great time working on this project. "All our dreams can come TRUE, if we have the courage to pursue them." "It''s kind of fun to do the impossible." - Walt Disney', TRUE);
insert into users values (default, 'nsrecchia', 'password', 'Noel', 'Recchia', 'The second twin! I’m Noel and some of U-Foodplate involves ironing out general information for the team. Working on live datautilization with George will be the meat on my plate. The veggies and the sidesinclude helping other members with their share U-Food. In regards to live data,creating and organizing a smart, flexible database is a priority. Information and organization will be diverse and the database will reflect that. I enjoy working with others, and I am not afraid to get my hands dirty for others that need assistance. I am excited to be part of the team and part of the project!', TRUE);
insert into users values (default, 'dwhitaker', 'password', 'Dave', 'Whitaker', 'Hey, My name is Dave. One feature that U-Food will be implementing is the feature that allows users to input reviews of the dining halls and the food they ate. My goal for the team is to implement ways for users to contribute their ratings to the website, whether it be a simple 5 star rating, or a written comment. The goal here is to allow users to easily input their reviews, and have them be displayed properly on the website. This will require having databases with all the reviews, and handling them properly. We here at U-Food think that the users will really find it interesting to see what the community thinks of the food. Theres nothing that this super team cannot accomplish, the team and I are excited to put this all together.', TRUE);
insert into users values (default, 'jamiraul', 'password', 'Jef', 'Amirault', 'My name is Jef and I will be focusing on super intuitive forms extracting the most pertinent information from our users while minimizing the thought and effort required by the user. Nobody likes surveys, but that is more or less what we are pursuing here. The goal is to not make it feel like work when you are contributing to the app. Surveying this information from the user should be fun and easy-as-pie. I’ve been programming in the Ruby on Rails web framework here at UMass IT for 2.5 years. I love the feeling of a pristine web form. I''m looking forward to making clean, efficacious web forms. My goal for user experience is thus: at first, the user should be entering data (like what''s for food right at this moment), and say "DAMN that was some cool interface." After a few uses, there should be no thought whatsoever involved in posting live data.', TRUE);


create table dining_commons (
 dcid serial,
 name varchar(255),
 location varchar(255),
 noise_level integer,
 crowdedness integer,
 primary key (dcid)
);

insert into dining_commons values (default, 'Worcester', 'Northeast', 1, 1);
insert into dining_commons values (default, 'Franklin', 'Central', 1, 1);
insert into dining_commons values (default, 'Hampshire', 'Southwest', 1, 1);
insert into dining_commons values (default, 'Berkshire', 'Southwest', 1, 1);
insert into dining_commons values (default, 'Blue Wall', 'Campus Center', 1, 1);

create table reviews (
	rid serial,
	dcid integer,
	uid integer,
	time timestamp,
	body text,
	primary key (rid)
);

insert into reviews values (default, 1, 1, '2015-12-09 00:00:01', 'The food here was great!');
insert into reviews values (default, 2, 2, '2015-12-09 00:00:02', 'The food here was amazing!');
insert into reviews values (default, 3, 3, '2015-12-09 00:00:03', 'The food here was tasty!');
insert into reviews values (default, 4, 4, '2015-12-09 00:00:04', 'The food here was spicy!');
insert into reviews values (default, 5, 5, '2015-12-09 00:00:05', 'The food here was delicious!');
