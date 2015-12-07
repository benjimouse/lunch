/*global Template */
/*global Meteor */
/*global Time */
/*global Session */
/*global console */
/*global DateFormat */
/*global Steps */
/*global $ */
/*global validateStep */
/*global throwError */
/*global Router */
/*jslint nomen: true */

Template.mealSubmit.events({
    'submit form': function (e) {
        'use strict';
        e.preventDefault();
        var
            meal = {
                title: $(e.target).find('[name=title]').val(),
                description: $(e.target).find('[name=description]').val(),
                serveTime: new Date($(e.target).find('[name=serveTime]').val())
            },
            errors = validateMeal(meal);
        if (errors.description || errors.title || errors.serveTime) {
            return Session.set('mealSubmitErrors', errors);
        }
        Meteor.call('mealInsert', meal, function (error, result) {
            // display the error to the user and abort
            if (error) {
                return throwError(error.reason);
            }
            // show this result but route anyway
            // if (result.mealExists) {
            //   throwError('This meal has already been added');
            //}
            Router.go('mealPage', {
                _id: result._id
            });
        });
    }
});

Template.mealSubmit.created = function () {
    'use strict';
    Session.set('mealSubmitErrors', {});
};

Template.mealSubmit.helpers({
    errorMessage: function (field) {
        'use strict';
        return Session.get('mealSubmitErrors')[field];
    },
    errorClass: function (field) {
        'use strict';
        return !!Session.get('mealSubmitErrors')[field] ? 'has-error' : '';
    }

});

/*jslint nomen: false */