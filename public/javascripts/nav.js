$(document).ready(function(){
    var path = window.location.pathname;
    var selected;
    if (path == '/home')
        selected = 'home_link';
    else if (path == '/about')
        selected = 'about_link';
    else if (path.substring(0,15) == '/dining_commons' || path == '/reviews/new')
        selected = 'dining_commons_link';
    else if (path == '/users/login' || path == '/users/signup')
        selected = 'login_link';
    else if (path == '/users/profile' || path == '/users/change-password')
        selected = 'profile_link';
    else if (path == '/users')
        selected = 'users_link';

    $('#' + selected).addClass('selected');
});
