Messages = new Meteor.Collection('messages');

Meteor.methods({
    'messages:create' : function(attributes) {

        var user = Meteor.user(),
            room = Rooms.findOne({ _id : attributes.roomId });

        if (!user)
            throw new Meteor.Error(401, "You need to login to send a message");

        if (!room)
            throw new Meteor.Error(404, "Room not found");

        var message = {
            roomId    : attributes.roomId,
            value     : attributes.value.substring(0, 1024),
            createdBy : Meteor.userId(),
            createdAt : new Date().valueOf()
        };

        if(Meteor.isSimulation) {
            message.unsent = true;
        }

        Rooms.update({ _id : room._id }, { $addToSet : { participants : Meteor.userId() } });

        return Messages.insert(message);
    }
});