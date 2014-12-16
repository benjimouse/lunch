Template.stepSubmit.events({
    'submit form': function (e) {
        'use strict';
        e.preventDefault();

        var step = {
                durationInSeconds: parseInt($(e.target).find('[name=durationInSeconds]').val()),
                description: $(e.target).find('[name=description]').val()
            },
            errors = validateStep(step);
        if (errors.description || errors.durationInSeconds) {
            return Session.set('stepSubmitErrors', errors);
        }
        Meteor.call('stepInsert', step, function (error, result) {
            // display the error to the user and abort
            if (error) {
                return throwError(error.reason);
            }
            // show this result but route anyway
            if (result.stepExists) {
                throwError('This step has already been added');
            }
            Router.go('stepPage', {
                _id: result._id
            });
        });
    }
});

Template.stepSubmit.created = function () {
    'use strict';
    Session.set('stepSubmitErrors', {});
}

Template.stepSubmit.helpers({
    errorMessage: function (field) {
        'use strict';
        return Session.get('stepSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('stepSubmitErrors')[field] ? 'has-error' : '';
    }
});