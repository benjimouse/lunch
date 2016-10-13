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

Template.stepSubmit.events({
    'submit form': function (e) {
        'use strict';
        e.preventDefault();
        console.log('huh');
        var
            doneBeforeDuration = 0,
            seconds = parseInt($(e.target).find('[name=seconds]').val(), 10),
            minutes = parseInt($(e.target).find('[name=minutes]').val(), 10),
            hours = parseInt($(e.target).find('[name=hours]').val(), 10),
            time = new Time().createTimeFromHoursMinutesSeconds(hours, minutes, seconds),
            durationInSeconds = time.durationInSeconds,
            step = {
                durationInSeconds: durationInSeconds,
                description: $(e.target).find('[name=description]').val(),
                mealId: Session.get('currentMeal')._id,
                doneBefore: $(e.target).find('[name=doneBefore]').val(),
                doneBeforeDuration: 0
            },
            errors = validateStep(step);
        console.log('after validation');
        if (!!$(e.target).find('[name=doneBefore]').val()) {
            $(e.target).find('[name=doneBefore]').find(':selected').each(function (pos, option) {
                console.log('is this it?');
                return (doneBeforeDuration += Number(option.attributes.getNamedItem('data-duration').value));
            });
        }
        step.doneBeforeDuration = doneBeforeDuration;
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
};

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
    },
    stepDurationInSeconds: function () {
        'use strict';
        return this.durationInSeconds;
    }

});

/*jslint nomen: false */