// Not var'd as it's a global variable.
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
    stepInsert: function (stepAttributes) {
        'use strict';
        check(Meteor.userId(), String);
        check(stepAttributes, {
            description: String,
            durationInSeconds: Number
        });
        console.log('inserting');
        var errors = validateStep(stepAttributes);
        console.log(errors);
        if (errors.description || errors.durationInSeconds) {
            throw new Meteor.Error('invalid-step', "You must set a description and duration for your post");
        }
        // I really can't think why I need to do this check, so should probably remove this
        // however for now let's see, I may want it if it's going to be using all of the same ones.
        var identicalStep = Steps.findOne({
            description: stepAttributes.description,
            durationInSeconds: stepAttributes.durationInSeconds
        });
        if (identicalStep) {
            return {
                stepExists: true,
                _id: identicalStep._id
            };
        }
        var user = Meteor.user(),
            step = _.extend(stepAttributes, {
                userId: user._id,
                author: user.username,
                submitted: new Date()
            }),
            stepId = Steps.insert(step);
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
    return errors;
};
