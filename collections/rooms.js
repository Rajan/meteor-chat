Rooms = new Meteor.Collection('rooms');

Meteor.methods({
    'rooms:create' : function() {

        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, "You need to login to create new room");

        var room = {
            _id             : Random.id(7),
            participants    : [user._id],
            createdBy       : user._id,
            createdAt       : Date.now()
        };

        return Rooms.insert(room);
    }
});