Meteor.publish('room', function(id) {
    Meteor.publishWithRelations({
        handle: this,
        collection: Rooms,
        filter: id,
        mappings: [{
            reverse: true,
            key: 'roomId',
            collection: Messages,
            mappings: [{
                key: 'createdBy',
                collection: Meteor.users,
                options: {
                    fields: {
                        profile: 1
                    }
                }
            }]
        }]
    });
});