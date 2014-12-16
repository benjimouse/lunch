Template.stepEdit.created = function () {
    'use strict';
    Session.set('stepEditErrors', {});
};


Template.stepEdit.helpers({

    errorMessage: function (field) {
        'use strict';
        return Session.get('stepEditErrors')[field];
    },
    errorClass: function (field) {
        'use strict';
        return !!Session.get('stepEditErrors')[field] ? 'has-error' : '';
    },
    seconds: function () {
        'use strict';
        var time = new Time().createTimeFromSeconds(this.durationInSeconds);
        return time.seconds;
    },
    minutes: function () {
        'use strict';
        var time = new Time().createTimeFromSeconds(this.durationInSeconds);
        return time.minutes;
    },
    hours: function () {
        'use strict';
        var time = new Time().createTimeFromSeconds(this.durationInSeconds);
        return time.hours;
    }
});

Template.stepEdit.events({
    'submit form': function (e) {
        'use strict';
        e.preventDefault();
        var
            seconds = parseInt($(e.target).find('[name=seconds]').val(), 10),
            minutes = parseInt($(e.target).find('[name=minutes]').val(), 10),
            hours = parseInt($(e.target).find('[name=hours]').val(), 10),
            time = new Time().createTimeFromHoursMinutesSeconds(hours, minutes, seconds),
            durationInSeconds = time.durationInSeconds,
            currentStepId = this._id,
            stepProperties = {
                durationInSeconds: durationInSeconds,
                description: $(e.target).find('[name=description]').val()
            },
            errors = validateStep(stepProperties);
        if (errors.description || errors.durationInSeconds) {
            return Session.set('stepEditErrors', errors);
        }

        Steps.update(currentStepId, {
            $set: stepProperties
        }, function (error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            } else {
                Router.go('stepPage', {
                    _id: currentStepId
                });
            }
        });
    },

    'click .delete': function (e) {
        'use strict';
        e.preventDefault();
        if (confirm("Delete this step?")) {
            var currentStepId = this._id;
            Steps.remove(currentStepId);
            Router.go('stepsList');
        }
    }
});