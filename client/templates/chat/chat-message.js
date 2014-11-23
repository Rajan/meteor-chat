Template.chatMessage.helpers({
    class: function() {
        var result = '';

        if(this.unsent)
            result += ' chat-message--unsent';

        if(this.createdBy === Meteor.userId())
            result += ' chat-message--out';

        return result;
    },
    title: function() {
        var user   = Meteor.users.findOne({ _id : this.createdBy }),
            result = '';

        if(Meteor.userId() !== this.createdBy) {
            result += user.profile.username + ' on ';
        }

        result += moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a');

        return result;
    },
    createdAt: function() {
        return Math.floor(this.createdAt / 1000);
    },
    isAuthor: function () {
        return this.createdBy === Meteor.userId();
    }
});