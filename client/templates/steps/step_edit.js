Template.stepEdit.events({
    'submit form': function (e) {
        'use strict';
        e.preventDefault();

        var currentStepId = this._id,
            stepProperties = {
                durationInSeconds: $(e.target).find('[name=durationInSeconds]').val(),
                description: $(e.target).find('[name=description]').val()
            };

        Steps.update(currentStepId, {
            $set: stepProperties
        }, function (error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
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