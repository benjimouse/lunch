Meteor.publish('steps', function () {
    'use strict';
    return Steps.find();
});
Meteor.publish('meals', function () {
    'use strict';
    return Meals.find();
});