/*global Mongo */
/*global ownsDocument */
/*global Meteor */
/*global console */
/*global DateFormat */
/*global Steps */
/*global $ */
/*global validateStep */
/*global validateMeal */
/*global check */
/*global throwError */
/*global Router */
/*jslint nomen: true */

Steps = new Mongo.Collection('steps');
Steps.allow({
    update: function (userId, step) {
        'use strict';
        return ownsDocument(userId, step);
    },
    remove: function (userId, step) {
        'use strict';
        return ownsDocument(userId, step);
    }
});
Steps.deny({
    update: function (userId, step, fieldNames) {
        'use strict';
        // may only edit the following two fields:
        return (_.without(fieldNames, 'durationInSeconds', 'description').length > 0);
    }
});

Steps.deny({
    update: function (userId, step, fieldNames, modifier) {
        'use strict';
        var errors = validateStep(modifier.$set);
        return errors.description || errors.durationInSeconds;
    }
});


Meteor.methods({

    toggleDone: function (stepId) {
        'use strict';
        check(Meteor.userId(), String);
        check(stepId, String);
        var step = Steps.findOne(stepId);
        if (!step) {
            throw new Meteor.Error('invalid', 'Step not found');
        }
        Steps.update(step._id, {
            $set: {
                done: !step.done
            }
        });
    },
    mealInsert: function (mealAttributes) {
        'use strict';
        check(Meteor.userId(), String);
        check(mealAttributes, {
            title: String,
            description: String,
            serveTime: Date
        });
        var errors = validateMeal(mealAttributes);
        if (errors.description || errors.title) {
            throw new Meteor.Error('invalid-meal', "You must set a description and title for your meal");
        }
        var user = Meteor.user(),
            meal = _.extend(mealAttributes, {
                userId: user._id,
                author: user.username,
                submitted: new Date()
            }),
            mealId = Meals.insert(meal);

        return {
            _id: mealId
        };

    },
    stepInsert: function (stepAttributes) {
        'use strict';
        check(Meteor.userId(), String);
        check(stepAttributes, {
            description: String,
            durationInSeconds: Number,
            mealId: String,
            //doneBefore: [String],
            //doneBeforeDuration: Number
        });
        var errors = validateStep(stepAttributes);
        if (errors.description || errors.durationInSeconds) {
            throw new Meteor.Error('invalid-step', "You must set a description and duration for your step");
        }
        // I really can't think why I need to do this check, so should probably remove this
        // however for now let's see, I may want it if it's going to be using all of the same ones.

        var identicalStep = Steps.findOne({
                description: stepAttributes.description,
                durationInSeconds: stepAttributes.durationInSeconds
            }),
            user = Meteor.user(),
            step = _.extend(stepAttributes, {
                userId: user._id,
                author: user.username,
                submitted: new Date(),
                totalDuration: stepAttributes.durationInSeconds + stepAttributes.doneBeforeDuration
            }),
            stepId = Steps.insert(step);


        if (identicalStep) {
            return {
                stepExists: true,
                _id: identicalStep._id
            };
        }
        return {
            _id: stepId
        };
    }
});

validateStep = function (step) {
    'use strict';
    var errors = {};
    if (!step.durationInSeconds) {
        errors.durationInSeconds = "Please fill in a duration";
    }
    if (!step.description) {
        errors.description = "Please fill in a description";
    }
    console.log('errors');
    console.log(errors);
    return errors;
};

validateMeal = function (meal) {
    'use strict';
    var errors = {};
    if (!Date.parse(meal.serveTime)) {
        errors.serveTime = 'Please fill in a valid Serving at time.';
    } else if (meal.serveTime.getTime() <= new Date().getTime()) {
        errors.serveTime = "Cannot start cooking in the past";
    }
    if (!meal.description) {
        errors.description = 'Please fill in a description.';
    }
    if (!meal.title) {
        errors.title = 'Please fill in a title.';
    }
    return errors;
};
/*jslint nomen: false */