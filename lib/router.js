Router.configure({
    layoutTemplate   : 'application',
    loadingTemplate  : 'loading',
    notFoundTemplate : 'notFound'
});

Router.map(function() {

    this.route('readme', {
        path: '/'
    });

    this.route('chat', {
        path: '/:_id',
        waitOn: function(){
            return Meteor.subscribe('room', this.params._id);
        },
        data: function(){
            return Rooms.findOne({ _id : this.params._id });
        }
    });
});

Router.plugin('dataNotFound');