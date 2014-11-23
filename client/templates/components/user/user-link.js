Template.userLink.helpers({
    url: function() {
        var user, url;

        user = Meteor.users.findOne({ _id : this.userId });

        if (user)
            url = user.profile.url;

        return url;
    }
});