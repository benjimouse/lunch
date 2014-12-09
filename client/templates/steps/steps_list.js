Template.stepsList.helpers({
    steps: function () {
        'use strict';
        return Steps.find({}, {
            sort: {
                submitted: -1
            }
        });
    }
});
