Template.readme.rendered = function() {

    var self= this;

    HTTP.get("https://api.github.com/repos/fstgerm/meteor-chat/readme", { headers: { "Accept": "application/vnd.github.VERSION.html" } }, function (error, result) {
        if (!error) {
            self.find('.readme').innerHTML = result.content;
        }
    });
};