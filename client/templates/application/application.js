Template.application.events({
    "click [rel='lightbox']": function(e) {

        e.preventDefault();

        var template = $(e.target).attr('data-lightbox');

        Session.set('lightbox', template);
    },

    "click [data-action='logout']": function(e) {

        e.preventDefault();

        Meteor.logout();

        Router.go('readme');
    },

    "click [data-action='rooms:create']": function(e) {

        e.preventDefault();

        if(!Meteor.user()) {
            Session.set('lightbox', 'login');
            return
        }

        Meteor.call('rooms:create', { }, function(error, id){
            Router.go('chat', { _id: id });
        });
    }
});

Template.application.created = function(){
    Deps.autorun(function(){
        $('html').toggleClass('no-scroll', Session.get('lightbox') ? true : false);
    });
}