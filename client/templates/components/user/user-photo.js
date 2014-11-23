Template.userPhoto.helpers({
    class: function(){
        var result = '';

        if(this.size) {
            result += ' user-photo--' + this.size;
        }

        if(this.darkborder) {
            result += ' user-photo--darkborder';
        }

        return result;
    },
    src: function(){
        var user = Meteor.users.findOne({ _id : this.userId }),
            src  = '';

        if(user)
            src = user.profile.picture;

        return src;
    }
});