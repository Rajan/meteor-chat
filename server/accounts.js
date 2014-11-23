Accounts.onCreateUser(function(options, user) {

    var profile = {};

    /* twitter */
    if (user.services.twitter) {
        profile.picture  = user.services.twitter.profile_image_url;
        profile.username = user.services.twitter.screenName;
        profile.name     = options.profile.name;
        profile.url      = 'http://twitter.com/' + profile.username;

        delete user.services.twitter.email;
    }

    /* github */
    if(user.services.github) {
        var accessToken = user.services.github.accessToken,
            result,
            profile;

        result = Meteor.http.get("https://api.github.com/user", {
            headers: {"User-Agent": "Meteor/1.0"},

            params: {
                access_token: accessToken
            }
        });

        if (result.error)
            throw result.error;

        profile.picture  = result.data.avatar_url;
        profile.username = result.data.login;
        profile.name     = result.data.name;
        profile.url      = result.data.html_url;

        delete user.services.github.email;
    }

    /* google */
    if (user.services.google) {
        profile.picture  = user.services.google.picture;
        profile.username = user.services.google.given_name;
        profile.name     = options.profile.name;
        profile.url      = 'https://plus.google.com/' + user.services.google.id;

        delete user.services.google.email;
    }

    user.profile = profile;

    return user;
});