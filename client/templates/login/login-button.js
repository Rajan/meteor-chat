Template.loginButton.events({
   'click' : function (e) {

       e.preventDefault();

       var service = this.service[0].toUpperCase() + this.service.substring(1);

       Meteor['loginWith' + service](function(error) {
           if(!error) {
               Session.set('lightbox', false);
           } else {
               console.log(error)
           }
       });
   }
});