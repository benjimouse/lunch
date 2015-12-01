/*global Template */
/*global Session */
/*global Steps */
/*jslint nomen: true */

Template.stepsList.helpers({
    steps: function () {
        'use strict';
        var mealId = Session.get('currentMeal')._id,
            allSteps = Steps.find({
                mealId: mealId
            }, {
                sort: {
                    totalDuration: -1
                }
            });
        return allSteps;
    }
});

/*jslint nomen: false */