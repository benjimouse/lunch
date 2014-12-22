Template.stepsList.helpers({
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
    }
});