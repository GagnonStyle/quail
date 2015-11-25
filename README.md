# Team Quail Presents U-Food
CS326: Web Development (Starring Tim Richards)

![U-Food](https://github.com/GagnonStyle/quail/blob/master/public/img/ufood_header_logo_black.png "U-Food Logo")

### Creators
* Jeffrey Amirault
* Spencer Gagnon
* George Larionov
* Neven Recchia
* Noel Recchia
* David Whitaker

## Overview

Out of the many different ideas that our team came up with, we are excited to create one on a subject that we all like, eating food on campus. U-Food encompasses the idea of a dining commons tracker, with information that is presented to be a UMass food guide. Included are options for showing lines and wait times for getting into the dining common, or for specific foods such as stir fry or sushi. A section of U-Food will include the day’s menu for all dining commons. There will be options to “check-in” at the dining commons, and also provide location services, such as where each dining common is located.

U-Food will not only allow the user to interact with the information, but with other users as well. If applicable, users can submit their own food reviews and other users can comment on their reviews. Users can also ask questions and similarly, other users can answer those questions. Users can also report when a specific dining common runs out of food, such as the popular pizza, or corn beef hash. Custom events at the dining commons can be added and edited with times and locations. U-Food will also include the twitter for umass dining services, similar to the ones shown on the televisions at their respective dining commons. Overall, U-Food aims to simplify and enhance the UMass dining experience.


## How To Run

1. Clone or download the repository.
2. Install nodejs for your operating system.
3. Type `npm install` in project folder.
4. Run the application by typing `node app.js`.
5. Open your browser of choice and type `localhost:3000` in the address bar.

## Libraries

* **[Node.js:](https://github.com/nodejs/node)** The framework to build our application.
* **[Express:](https://github.com/expressjs/expressjs.github.io)** Node.js web application framework (middleware) suitable for our needs. It is used for creating sessions, parsing bodies, populate cookies, and implementing flash messages.
* **[Handlebars.js:](https://github.com/wycats/handlebars.js)** Handlebars.js is an extension of Mustache templating language which keeps the views and code separated for rendering.
* **[PostgreSQL:](https://github.com/postgres/postgres)** This advanced object-relational database management system will be useful for our databases.

## Views

* **Home:** The "home" page is where the main sections of U-Food will be displayed. Most of the information that users and guests will need will be displayed here. The sections are displayed in columns on the page.
* **About:**  The "about" view exists for guests or users who wish to know more about U-Food. This presents users what U-Food is all about. It displays a detailed and short summary of our web application.
* **Login:** The "login" page presents a blank username field and a black password field. Once guest types in the user data, the "Login" button will redirect the user to the "Home" page. If a guest does not have credentials, a "signup" link is available.
* **Signup:** The "signup" page shows the guest a number of fillable fields to enter credentials. Names, usernames, passwords, and descriptions are available fields the guest can type in. These credentials then get saved into the user database.
* **Team:** The "team" page displays all of the team member information which is grabbed from the user database.
* **Mockups:** The "mockups" view presents guests and users the initial mockups that were created by the U-Food team. This view may be removed in the future when the web application reaches closer to a usable, working state.
* **User Profile:** The "user profile" view appears when a user clicks on their username on the header after they log in. This page showcases a few statistics on the user and their activity on U-Food. A few account options such as changing passwords are avaiable in this view.
* **Change Password:** This view appears when a user clicks on the change password link on the "user profile" view. A field requiring the current password as well as fields for the new passwords appear here.
* **Error 404 & 500:** Oh dear. You broke U-Food. Please contact the team members. (This view is pretty self-explanitory.)

## Statefulness

When we first start the application, To log in you have to go to the [login page](/views/login.handlebars), or the [signup page](/views/signup.handlebars) to create an account. In our [routing handler for users](/routes/user-routes.js), the user session is grabbed. If the user logs out, the session is deleted, and redirected to the [home page](/views/home.handlebars). User functionality is included within the [lib/user](/lib/user.js). One function is the changing of passwords. The user would be taken to the [change-password page](/views/change-pass.handlebars). Changes will be made within the database. More information about users and the corresponding database will be included in the next section.

## Persistence
