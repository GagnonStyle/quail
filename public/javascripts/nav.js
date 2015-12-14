$(document).ready(function(){
    var path = window.location.pathname;
    var selected;
    if (path == '/home')
        selected = 'home_link';
    else if (path == '/about')
        selected = 'about_link';
    else if (path.substring(0,8) == '/mockups')
        selected = 'mockups_link';
    else if (path.substring(0,15) == '/dining_commons')
        selected = 'dining_commons_link';
    else if (path == '/users/login' || path == '/users/signup')
        selected = 'login_link';
    else if (path == '/users/profile')
        selected = 'profile_link';
    else if (path == '/users')
        selected = 'users_link';

    $('#' + selected).addClass('selected');
});
