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
    }
});

Template.stepEdit.events({
    'submit form': function (e) {
        'use strict';
        e.preventDefault();

        var currentStepId = this._id,
            stepProperties = {
                durationInSeconds: $(e.target).find('[name=durationInSeconds]').val(),
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