Template.chat.helpers({
    class: function () {
        return Messages.find({ roomId: this._id }).count() < 1 ? 'chat--empty' : '';
    },
    messages: function() {
        var messages     = Messages.find({ roomId: this._id }, { sort: { createdAt: 1 } }).fetch(),
            lastTime     = 0,
            lastIndex    = 0;

        _.each(messages, function(message, index, list) {

            if(!lastTime || (message.createdAt - lastTime) > 300000 || (index - lastIndex > 10)) {
                message.showDate = true;
                lastIndex = index;
            }

            lastTime  = message.createdAt;
        });

        return messages;
    },
    scrollBottom: function(){
        Meteor.defer(function(){
            scrollBottom();
        })
    }
});

Template.chat.events({
   "submit [data-action='messages:create']": function(e) {

       e.preventDefault();

       if(!Meteor.user()) {
           Session.set('lightbox', 'login');
           return;
       }

       var textbox = $(e.target).find('[name=message]'),
           value   = textbox.val().trim();

       if(!value)
           return;

       Meteor.call('messages:create', { roomId: this._id, value: value }, function(error, id) {

           if(id) {
               textbox.val('').focus();
               scrollBottom();
           }

           if(error) {
               alert(error)
           }
       });
   }
});

Template.chat.rendered = function() {

    this.find('[name=message]').focus();

    this.find('.chat-messages')._uihooks = {
        insertElement: function (node, next) {
            $(node).insertBefore(next);

            if($(document).height() - $(document).scrollTop() - window.innerHeight < 100) {
                scrollBottom();
            }
        }
    };
};

var scrollBottom = function(){
    $('html, body').scrollTop( $(document).height() );
}