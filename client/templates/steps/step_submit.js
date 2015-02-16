Template.stepSubmit.events({
    'submit form': function (e) {
        'use strict';
        e.preventDefault();
        console.log($(e.target).find('[name=dependsOn]').val());
        var
            seconds = parseInt($(e.target).find('[name=seconds]').val(), 10),
            minutes = parseInt($(e.target).find('[name=minutes]').val(), 10),
            hours = parseInt($(e.target).find('[name=hours]').val(), 10),
            time = new Time().createTimeFromHoursMinutesSeconds(hours, minutes, seconds),
            durationInSeconds = time.durationInSeconds,
            step = {
                durationInSeconds: durationInSeconds,
                description: $(e.target).find('[name=description]').val(),
                mealId: Session.get('currentMeal')._id,
                dependsOn: $(e.target).find('[name=dependsOn]').val()
            },
            errors = validateStep(step);
        if (errors.description || errors.durationInSeconds) {
            return Session.set('stepSubmitErrors', errors);
        }
        console.log(step);
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
        'use strict';
        return !!Session.get('stepSubmitErrors')[field] ? 'has-error' : '';
    },
    steps: function () {
        'use strict';
        var mealId = Session.get('currentMeal')._id;
        return Steps.find({
            mealId: mealId
        }, {
            sort: {
                submitted: -1
            }
        });
    },
    stepDescription: function () {
        'use strict';
        return this.description;
    },
    stepId: function () {
        'use strict';
        return this._id;
    }

});