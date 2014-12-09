Template.stepSubmit.events({
    'submit form': function (e) {
        'use strict';
        e.preventDefault();

        var step = {
            durationInSeconds: parseInt($(e.target).find('[name=durationInSeconds]').val()),
            description: $(e.target).find('[name=description]').val()
        };
        Meteor.call('stepInsert', step, function (error, result) {
            // display the error to the user and abort
            if (error) {
                return alert(error.reason);
            }
            // show this result but route anyway
            if (result.stepExists) {
                alert('This step has already been added');
            }
            Router.go('stepPage', {
                _id: result._id
            });
        });
    }
});
