/*global Mongo */
/*global ownsDocument */
/*global Meals */
/*jslint nomen: true */

Meals = new Mongo.Collection('meals');
Meals.allow({
    update: function (userId, meal) {
        'use strict';
        return ownsDocument(userId, meal);
    },
    remove: function (userId, meal) {
        'use strict';
        return ownsDocument(userId, meal);
    }
});

/*jslint nomen: false */