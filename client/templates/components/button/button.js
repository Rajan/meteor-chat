Template.button.helpers({
   class: function() {
       var result = '';

       if(this.color) {
           result += ' button--' + this.color;
       }

       return result;
   }
});