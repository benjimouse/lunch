/*global Template */
/*global Session */
/*global Meals */
/*global Meteor */
/*jslint nomen: true */

Template.mealsList.helpers({
    meals: function () {
        'use strict';
        var
            allMeals = Meals.find({
                userId: Meteor.userId()
            }, {
                sort: {
                    serveTime: -1
                }
            });
        return allMeals;
    }
});

/*jslint nomen: false */