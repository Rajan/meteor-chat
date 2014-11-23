Template.lightbox.helpers({
    visible: function(){
        return Session.get('lightbox');
    },
    template: function(){
        return Session.get('lightbox');
    }
});

Template.lightbox.events({
    'click [data-action=close]' : function(e) {
        e.preventDefault();
        Session.set('lightbox', false);
    },

    'click .lightbox' : function (e) {
        if(e.currentTarget === e.target) {
            Session.set('lightbox', false);
        }
    }
});