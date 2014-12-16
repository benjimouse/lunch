Template.errors.helpers({
    errors: function () {
        'use strict';
        return Errors.find();
    }
});

Template.error.rendered = function () {
    'use strict';
    var error = this.data;
    Meteor.setTimeout(function () {
        Errors.remove(error._id);
    }, 3000);
};